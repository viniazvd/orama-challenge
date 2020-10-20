<template>
  <reply class="reply-icon" :size="20" />
</template>

<script>
import Reply from 'vue-material-design-icons/Reply.vue'

export default {
  name: 'reply-icon',

  components: { Reply }
}
</script>

<style lang="scss">
.reply-icon > svg {
  border-radius: 50%;
  background: #119c9f;
  border: solid 2px transparent;

  & > path {
    fill: white;
    transform: rotate(90deg) translateY(-25px);
  }
}
</style>
