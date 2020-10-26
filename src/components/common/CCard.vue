<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'c-card',

  props: {
    red: Boolean,
    green: Boolean,
    yellow: Boolean,
    blue: Boolean
  },

  computed: {
    cardClasses () {
      return ['c-card',
        {
          '-red': this.red,
          '-green': this.green,
          '-yellow': this.yellow,
          '-blue': this.blue
        }
      ]
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
    background: set-radial-gradient($primary-color-map);
  }

  &.-red::before { background: set-radial-gradient($negative-color-map); }
  &.-green::before { background: set-radial-gradient($positive-color-map); }
  &.-yellow::before { background: set-radial-gradient($alert-color-map); }
  &.-blue::before { background: set-radial-gradient($info-color-map); }
}
</style>
