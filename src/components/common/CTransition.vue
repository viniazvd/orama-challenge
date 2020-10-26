<template>
  <transition @enter="enter" @before-leave="beforeLeave" @leave="leave">
    <div ref="content" class="c-transition" :style="{ height }">
      <slot/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'c-transition',

  data () {
    return { height: 0 }
  },

  methods: {
    enter () {
      this.setHeight(this.getContentHeight())
    },

    beforeLeave () {
      this.setHeight(this.getContentHeight())
    },

    leave () {
      this.setHeight(0)
    },

    setHeight (height) {
      this.height = height
    },

    getContentHeight () {
      return this.$refs.content.scrollHeight + 'px'
    }
  }
}
</script>

<style>
.c-transition {
  height: auto;
  overflow: hidden;
  transition: height 0.3s ease;
}
</style>
