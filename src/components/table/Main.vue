<template>
  <div class="table-main cell rounded">
    <table-fixed-header />

    <div v-for="macroStrategy in macroStrategies" :key="macroStrategy" class="table">
      <table-title :title="macroStrategy" />

      <div v-for="mainStrategy in getMainStragery(macroStrategy)" :key="mainStrategy">
        <table-title :sub-title="mainStrategy" />

        <table-row v-for="(fund, index) in getFunds(mainStrategy)" :key="index" :row="fund" />
      </div>
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
    list: { type: Array, required: true },
    macroStrategies: { type: Array, required: true }
  },

  methods: {
    getMainStragery (macroStrategy) {
      return [
        ...new Set(this.list
          .filter(item => item.specification.fund_macro_strategy.name === macroStrategy)
          .map(item => item.specification.fund_main_strategy.name))
      ]
    },

    getFunds (mainStrategy) {
      return this.list.filter(item => item.specification.fund_main_strategy.name === mainStrategy)
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
