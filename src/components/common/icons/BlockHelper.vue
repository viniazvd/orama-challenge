<template>
  <block-helper class="block-helper-icon" :size="20" />
</template>

<script>
import BlockHelper from 'vue-material-design-icons/BlockHelper'

export default {
  name: 'block-helper-icon',

  components: { BlockHelper }
}
</script>

<style lang="scss">
.block-helper-icon > svg > path { fill: #9c9d9e; }
</style>
