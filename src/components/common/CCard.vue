<template>
  <div class="c-card" :style="levelStyle">
    <slot />
  </div>
</template>

<script>
import levels from '../../utils/levels'

export default {
  name: 'c-card',

  props: {
    level: Number
  },

  computed: {
    levelStyle () {
      return { '--level': levels[this.level] }
    }
  }
}
</script>

<style lang="scss">
.c-card {
  position: relative;
  transition: all .3s ease;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;

    width: 7px;
    height: 100%;
    min-width: 4px;
    background: var(--level);
  }
}
</style>
