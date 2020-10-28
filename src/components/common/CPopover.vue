<script>
const getParents = ({ parentElement: parent }) =>
  parent ? [parent, ...getParents(parent)] : []

const checkPlacement = (types, p) =>
  typeof p === 'string' && types.indexOf(p) > -1

export default {
  name: 'c-popover',

  props: {
    /**
     * The target of the popover, the popover will be positioned relative
     * to the target when open.
     * When the popover has no explicit target, it will be
     * positioned at the bottom of the screen.
     */
    target: {
      type: [Object, Element]
    },

    /**
     * Fine tuning of the popover's arrow horizontal position.
     */
    arrowSpacing: {
      type: [Number, String],
      default: 15
    },

    /**
     * Determines the distance between the target element and the popover arrow.
     */
    elementSpacing: {
      type: [Number, String],
      default: 0
    },

    /**
     * Whether to show the popover below or above the target element.
     */
    position: {
      type: String,
      default: 'bottom',
      validator: p => checkPlacement(['bottom', 'top'], p)
    },

    /**
     * The horizontal alignment of the popover element relative to the target.
     */
    align: {
      type: String,
      default: 'center',
      validator: v => checkPlacement(['right', 'center', 'left'], v)
    },

    /**
     * Sets the popover to automatically hide when the page content is scrolled
     */
    hideOnScroll: Boolean,

    /**
     * Not fresh click case
     */
    noFreshCheck: Boolean
  },

  data () {
    return {
      fresh: true,
      observer: {},
      coordinates: {}
    }
  },

  computed: {
    arrowAlignment () {
      if (this.align === 'left') return { '--right': `${this.arrowSpacing}px` }
      if (this.align === 'right') return { '--left': `${this.arrowSpacing}px` }

      return { '--left': `calc(50% - ${this.arrowSpacing / 2}px)` }
    },

    style () {
      return {
        ...this.coordinates,
        ...this.arrowPosition,
        ...this.arrowAlignment
      }
    }
  },

  watch: {
    target: {
      handler: 'setPosition',
      immediate: true
    }
  },

  methods: {
    setPosition () {
      if (!this.target) return

      this.$nextTick(() => {
        const popover = this.$el.getBoundingClientRect()
        const target = Object.prototype.hasOwnProperty.call(this.target, '$el')
          ? this.target.$el.getBoundingClientRect()
          : this.target.getBoundingClientRect()

        // set top position
        const top = this.position === 'top'
          ? target.top - (8 + popover.height) - parseInt(this.elementSpacing)
          : target.top + (8 + target.height) + parseInt(this.elementSpacing)

        // set left position
        let left = target.left + (target.width / 2)
        if (this.align === 'left') left = left - popover.width + 20
        if (this.align === 'right') left = left - 20
        if (this.align === 'center') left = left - popover.width / 2

        // set coordinates
        this.coordinates = { top: top + 'px', left: left + 'px' }

        // set arrow position
        const arrowPosition = this.position === 'bottom' ? '-5' : popover.height - 6
        this.arrowPosition = { '--top': arrowPosition + 'px' }
      })
    },

    emissionHandler (e) {
      if (!this.target) return

      // Checks if the popover has just been opened.
      // This is needed when the popopver activation element
      // is not the same as the 'target' prop.
      if (!this.noFreshCheck && this.fresh) { this.fresh = false; return }

      const targets = e.target ? [e.target, ...getParents(e.target)] : []
      const isTarget = targets.includes(this.target.$el || this.target)
      const isOutside = !targets.includes(this.$el)

      /**
       * Event is emitted when the user clicks outside the popover, or
       * presses the ESC key (closes it, basically). This event really should
       * be called `close`, sorry :(
       * @event handler
       * @type {undefined}
       */
      if (!isTarget && isOutside) this.$emit('handler', e)
    },

    clickEscape (e) {
      if (e.key === 'Escape' || e.keyCode === 27) this.$emit('handler')
    },

    onScroll (e) {
      const { parent } = this.$refs
      if (parent.contains(e.target) || parent.isSameNode(e.target)) return
      if (this.hideOnScroll) this.$emit('handler', e)
      else this.setPosition()
    }
  },

  mounted () {
    const config = {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style']
    }

    this.observer = new MutationObserver(this.setPosition)
    this.observer.observe(this.$el, config)

    window.addEventListener('click', this.emissionHandler)
    window.addEventListener('resize', this.setPosition)
    document.addEventListener('keydown', this.clickEscape, true)
    window.addEventListener('wheel', this.onScroll, true)
  },

  beforeDestroy () {
    window.removeEventListener('click', this.emissionHandler)
    window.removeEventListener('resize', this.setPosition)
    document.removeEventListener('keydown', this.clickEscape, true)
    window.removeEventListener('wheel', this.onScroll, true)

    this.observer.disconnect()
  },

  render (h) {
    return h('div', {
      ref: 'parent',
      attrs: { 'ref-cy': 'popover' },
      staticClass: 'c-popover',
      class: { '-bottom': !this.target, '-top': this.position === 'top' },
      style: this.style
    }, this.$slots.default)
  }
}
</script>

<style lang="scss">
$c-popover-arrow-size: 10px;
$c-popover-background: #fff;
$c-popover-border: 1px solid black;

%arrow-effect {
  position: absolute;
  content: '';
  width: $c-popover-arrow-size;
  height: $c-popover-arrow-size;
  background-color: $c-popover-background;
  border-radius: 4px 0 4px 0;
}

%arrow {
  &::before {
    @extend %arrow-effect;
    z-index: inherit;
    box-shadow: 1px 1px 3px -1px rgba(0,0,0,0.2);
    transform: rotate(225deg);
  }
}

%base {
  z-index: 10;
  display: block;
  position: fixed;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
}

.c-popover:not(.-bottom) {
  @extend %base;
  @extend %arrow;

  &::before {
    top: var(--top);
    left: var(--left);
    right: var(--right);
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
  }
}

.c-popover.-bottom {
  bottom: 0;
  width: 100%;
  margin: 10px;
  @extend %base;
  max-width: 300px;
  border-color: transparent;

  left: calc(50% - 10px);
  transform: translateX(-50%);
}

.c-popover.-top {
  &::before {
    transform: rotate(45deg);
    box-shadow: 3px 3px 5px -1px rgba(0,0,0,0.2);
    background-color: transparent;
    border-top-color: transparent;
    border-left-color: transparent;
  }

  &:not(.-dark)::before { opacity: 0.9; }
}
</style>
