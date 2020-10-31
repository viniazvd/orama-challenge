<template>
  <arrow :class="classes" :size="20" @click="isOpened = !isOpened" />
</template>

<script>
import Arrow from 'vue-material-design-icons/MenuUp'

export default {
  name: 'arrow-icon',

  components: { Arrow },

  props: {
    initialPosition: {
      type: String,
      default: 'up',
      validator: value => {
        const validOptions = ['up', 'down']

        return validOptions.includes(value)
      }
    }
  },

  data () {
    return {
      isOpened: this.initialPosition === 'down'
    }
  },

  watch: {
    isOpened (value) {
      this.$emit('arrow:toggle', value)
    }
  },

  computed: {
    classes () {
      return ['arrow-icon',
        {
          '--up': this.isOpened,
          '--down': !this.isOpened
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.arrow-icon {
  margin-top: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(1.7);
    transition: transform .1s;
  }
}

.--down > svg > path {
  transform: rotate(180deg) translateY(-25px) translateX(-25px);
  transition: transform 500ms;
}

.--up > svg > path {
  transform: initial;
  transition: transform 500ms;
}
</style>
