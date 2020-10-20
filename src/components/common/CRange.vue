/* eslint-disable space-unary-ops */
<template>
  <div class="c-range">
    <span v-if="title" class="title">{{ title }}</span>

    <range-slider
      class="range"
      v-bind="$attrs"
      v-on="$listeners"
    />

    <span v-if="footer" class="footer">{{ footer }}</span>
  </div>
</template>

<script>
// https://github.com/ktsn/vue-range-slider
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  name: 'c-range',

  components: { RangeSlider },

  props: {
    title: { type: String },
    footer: { type: String }
  }
}
</script>

<style lang="scss">
// @import "~foundation-sites/scss/foundation.scss";
// @include foundation-range-input;

%text {
  color: #444444;
  font-size: 13.0384px;
  font-family: 'Roboto', sans-serif;
}

.c-range {
  display: flex;
  flex-direction: column;

  & > .title {
    @extend %text;
    font-weight: bold;
    margin-bottom: 20px;
  }

  & > .range {
    /* overwrite range styles */
    width: 190px;
    height: 18px !important;
    margin: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;

    & > .range-slider-inner {
      & > .range-slider-hidden { display: none; }

      & > .range-slider-rail { background-color: #DFDFDF; }

      & > .range-slider-fill { background-color: #60AABF; }

      & > .range-slider-knob {
        width: 16px;
        height: 16px;
        box-shadow: none;
        box-sizing: border-box;
        border: 4px solid #000000;
      }
    }
  }

  & > .footer {
    @extend %text;
    margin-top: 10px;
  }
}

</style>
