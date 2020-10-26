<template>
  <div :class="classes">
    <span class="value">{{ title || subTitle }}</span>

    <span>
      <help-circle />
      <md-tooltip v-if="tooltip" md-direction="bottom">{{ tooltip }}</md-tooltip>
    </span>
  </div>
</template>

<script>
import HelpCircle from '../common/icons/HelpCircle'

export default {
  name: 'table-title',

  components: { HelpCircle },

  props: {
    title: { String },
    subTitle: { String },
    tooltip: { String }
  },

  computed: {
    classes () {
      return ['table-title',
        {
          '--is-title': this.title,
          '--is-sub-title': this.subTitle
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.table-title {
  display: flex;

  height: 50px;
  padding: 15px;

  &.--is-title {
    background: #EDEDED;
    text-transform: uppercase;
  }

  &.--is-sub-title {
    background: #FAFAFA;
  }

  & > .value {
    @include text;

    margin-right: 5px;
  }
}
</style>
