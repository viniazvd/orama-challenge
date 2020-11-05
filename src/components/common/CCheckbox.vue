<template>
  <div class="c-checkbox">
    <md-checkbox
      :model="isChecked"
      @change="value => $emit('toggle', value)"
    >
      {{ description }}
    </md-checkbox>

    <arrow v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import Arrow from '@icons/Arrow'

export default {
  name: 'c-checkbox',

  components: { Arrow },

  props: {
    isChecked: { type: Boolean },
    description: { type: String }
  }
}
</script>

<style lang="scss">
.c-checkbox {
  margin: 0;
  width: 100%;
  height: 40px;
  max-width: 270px;
  background: white;
  box-shadow: $box-shadow;
  padding: 5px 25px 5px 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
