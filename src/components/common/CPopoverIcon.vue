<template>
  <div class="c-popover-icon">
    <component
      ref="icon"
      :is="component"
      @mouseenter.native="showPopover = true"
      @mouseleave.native="showPopover = false"
    />

    <c-popover
      v-if="showPopover"
      align="left"
      position="bottom"
      hide-on-scroll
      listen-all-scrolls
      :element-spacing="5"
      :target="$refs['icon']"
    >
      <c-card class="popover-card" no-border>
        <slot />
      </c-card>
    </c-popover>
  </div>
</template>

<script>
import CCard from '../common/CCard.vue'
import CPopover from '../common/CPopover.vue'

export default {
  name: 'c-popover-icon',

  components: { CCard, CPopover },

  props: {
    component: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      showPopover: false
    }
  }
}
</script>

<style lang="scss">
.c-popover-icon > .c-popover > .popover-card {
  @include text;

  padding: 15px;
  font-size: 12px;
  max-width: 230px;
  text-align: left;
  border-radius: 5px;
  background: white;
  font-weight: initial;
  text-transform: initial;
}
</style>
