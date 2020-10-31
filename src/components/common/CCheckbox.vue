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
import Arrow from './icons/Arrow'

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
  max-width: 270px;
  min-height: 40px;
  background: white;
  padding: 5px 25px 5px 15px;
  box-shadow: 6px 6px 25px 0 rgba(97,120,146,0.12);

  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
