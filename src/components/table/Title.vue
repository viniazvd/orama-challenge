<template>
  <div :class="classes">
    <span class="value">{{ title || subTitle }}</span>

    <c-popover-icon v-if="description" component="help-circle">
      {{ description }}
    </c-popover-icon>
  </div>
</template>

<script>
import CPopoverIcon from '@components:common/CPopoverIcon'

export default {
  name: 'table-title',

  components: { CPopoverIcon },

  props: {
    title: { String },
    subTitle: { String },
    description: { String }
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
  align-items: center;

  height: 50px;
  padding: 20px;

  &.--is-title {
    background: #EDEDED;
    text-transform: uppercase;
  }

  &.--is-sub-title { background: #FAFAFA; }

  & > .value {
    @include text;

    margin-right: 5px;
  }
}
</style>
