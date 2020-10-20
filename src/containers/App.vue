<template>
  <div id="app" class="app">
    <img class="logo" alt="Vue logo" src="../assets/logo.png">

    <div class="container grid-x grid-padding-x grid-margin-x align-center margin-top-1">
      <div class="container-left grid-y grid-margin-y large-6">
        <left-filters />

        <funds />

        <legends />
      </div>

      <right-filters />
    </div>
  </div>
</template>

<script>
import LeftFilters from '../components/LeftFilters.vue'
import RightFilters from '../components/RightFilters.vue'
import Funds from '../components/Funds.vue'
import Legends from '../components/Legends.vue'

export default {
  name: 'App',

  components: { LeftFilters, Funds, Legends, RightFilters }
}
</script>

<style lang="scss">
@import "~foundation-sites/scss/foundation.scss";

// If you use the foundation-everything() mixin in your main Sass file, just pass in $prototype: true to enable the prototype mode.
// https://get.foundation/sites/docs/prototyping-utilities.html#sass-reference
@include foundation-everything($prototype: true);

// base.css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body,
html,
#app {
  min-width: 100%;
  min-height: 100%;

  width: 100%;
  height: 100%;
}

// https://www.figma.com/resources/learn-design/typography/
// weights generally coordinate to a number on a scale of 100 to 900, with intervals of 100: Regular 400, Medium 500, Semi-Bold 600, Bold 700, etc.

.app {
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden; // to prevent horizontal scrolling because of the grid-margin-x

  & > .logo { width: 100%; }

  & > .container {
    height: unset;

     & > .container-left {
      max-width: 873px;
    }
  }
}
</style>
