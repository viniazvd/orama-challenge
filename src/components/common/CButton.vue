<template>
  <div class="c-button" :style="buttonStyles">
    <span class="text" :style="textStyles">{{ text }}</span>

    <component v-if="icon" :is="icon" class="icon" />
  </div>
</template>

<script>
export default {
  name: 'c-button',

  props: {
    fullWidth: Boolean,

    icon: String,
    bgColor: String,

    text: String,
    textColor: String,

    borderColor: String
  },

  computed: {
    buttonStyles () {
      return {
        'background-color': this.bgColor,
        'border-color': this.borderColor,
        width: this.fullWidth ? '100%' : 'auto'
      }
    },

    textStyles () {
      return { color: this.textColor }
    }
  }
}
</script>

<style lang="scss">
.c-button {
  background-color: white;
  border: 1px solid transparent;

  height: 40px;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: center;

  & > .text {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
  }

  & > .icon {
    display: flex;
    margin-left: 5px;
    justify-content: center;
  }
}
</style>
