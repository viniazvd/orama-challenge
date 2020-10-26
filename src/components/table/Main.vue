<template>
  <div class="table-main cell rounded">
    <table-fixed-header />

    <div v-for="item in list.slice(0, 5)" :key="item.id" class="table">
      <table-title :title="item.specification.fund_macro_strategy.name" />
      <table-title :sub-title="item.specification.fund_main_strategy.name" />

      <table-row :item="item" />
    </div>
  </div>
</template>

<script>
import TableRow from './Row'
import TableTitle from './Title'
import TableFixedHeader from './FixedHeader'

export default {
  name: 'table-main',

  components: {
    TableRow,
    TableTitle,
    TableFixedHeader
  },

  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.table-main {
  order: 2;
  width: 873px;
  height: unset !important;
  // box-shadow: $box-shadow;
}
</style>
