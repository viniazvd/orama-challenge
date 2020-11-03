<template>
  <div class="c-loader">
    <div class="circle-1" :style="spinnerStyle">
      <div class="circle-2" :style="[spinnerCircleStyle, animationCircle2]"></div>
      <div class="circle-3" :style="[spinnerStyle, animationCircle3]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-loader',

  props: {
    size: { type: Number, default: 65 },
    margin: { type: String, default: '2px' },
    color: { type: String, default: '#444444' }
  },

  data () {
    return {
      spinnerStyle: {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    }
  },

  computed: {
    circleSize () {
      return ~~(this.size / 7)
    },

    spinnerCircleStyle () {
      return {
        width: this.circleSize + 'px',
        height: this.circleSize + 'px'
      }
    },

    animationCircle2 () {
      return {
        backgroundColor: this.color,
        top: this.size / 2 - this.circleSize / 2 + 'px'
      }
    },

    animationCircle3 () {
      return { border: this.circleSize + 'px solid ' + this.color }
    }
  }
}
</script>

<style lang="scss">
%animation {
  -webkit-animation: animation 0.6s 0s infinite linear;
          animation: animation 0.6s 0s infinite linear;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
}

.c-loader {
  display: flex;
  justify-content: center;

  & > .circle-1 {
    @extend %animation;

    position: relative;

    & > .circle-2 {
      @extend %animation;

      opacity: 0.8;
      position: absolute;
      border-radius: 100%;
    }

    & > .circle-3 { opacity: 0.1; border-radius: 100%; }
  }
}

@-webkit-keyframes animation {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes animation {
  100% {
   -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
  }
}
</style>
