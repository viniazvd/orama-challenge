<template>
  <transition name="c-tooltip-show">
    <c-popover
      v-if="hide ? false : show"
      ref="popover"
      class="c-tooltip"
      :align="align"
      :target="target"
      :position="position"
      :arrow-spacing="arrowSpacing"
    >
      <div class="card" :style="cardSytles">
        <template v-if="value">{{ value }}</template>
        <slot v-else />
      </div>
    </c-popover>
  </transition>
</template>

<script>
import CPopover from '@components:common/CPopover'

const checkPlacement = (types, p) =>
  typeof p === 'string' && types.indexOf(p) > -1

export default {
  name: 'CTooltip',
  components: { CPopover },

  props: {
    show: Boolean,

    /**
     * The tooltip's max-width
     */
    maxWidth: {
      type: Number,
      default: 200
    },

    /**
     * The target of the tooltip, the tooltip will be positioned relative
     * to the target when open.
     * When the tooltip has no explicit target, it will be
     * positioned at the bottom of the screen.
     */
    target: {
      type: [Object, Element]
    },

    /**
     * Fine tuning of the tooltip's arrow horizontal position.
     */
    arrowSpacing: {
      type: [Number, String],
      default: 15
    },

    /**
     * Determines the distance between the target element and the tooltip arrow.
     */
    elementSpacing: {
      type: [Number, String],
      default: 0
    },

    /**
     * Whether to show the tooltip below or above the target element.
     */
    position: {
      type: String,
      default: 'bottom',
      validator: p => checkPlacement(['bottom', 'top'], p)
    },

    /**
     * The horizontal alignment of the tooltip element relative to the target.
     */
    align: {
      type: String,
      default: 'center',
      validator: v => checkPlacement(['right', 'center', 'left'], v)
    },

    /**
     * If provided, the content of the value will be displayed inside
     * the tooltip instead of the default slot.
     */
    value: String,

    /**
     * I know... this kinda sucks since we already have a 'show' prop,
     * but this prop is useful to force the tooltip to hide when needed.
     * The 'hide' prop takes precedence over 'show' in the v-if dynamics.
     */
    hide: Boolean
  },

  computed: {
    cardSytles () {
      return { '--tooltip-max-width': `${this.maxWidth}px` }
    }
  }
}
</script>

<style lang="scss">
.c-tooltip {
  white-space: normal;
  pointer-events: none;
  background-color: white;

  &.c-tooltip::before { z-index: inherit; }

  & > .card {
    @include text;
    position: relative;

    overflow: hidden;
    border-radius: 5px;
    background-color: white;
    max-width: var(--tooltip-max-width);
  }
}

.c-tooltip-show {
  &-enter-active,
  &-leave-active { transition: opacity .3s; }

  &-enter,
  &-leave-to { opacity: 0; }
}
</style>
