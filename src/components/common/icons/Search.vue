<template>
  <magnify class="magnify-icon" :size="20" />
</template>

<script>
import Magnify from 'vue-material-design-icons/Magnify.vue'

export default {
  name: 'magnify-icon',

  components: { Magnify }
}
</script>

<style lang="scss">
.magnify-icon > svg {
  & > path {
    transform: rotate(90deg) translateY(-25px);
  }
}
</style>
