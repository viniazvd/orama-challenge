<template>
  <div class="table-main cell rounded">
    <table-fixed-header v-if="!isSmallScreen && !isMediumScreen" />

    <div v-for="macroStrategy in macroStrategies" :key="macroStrategy" class="table">
      <table-title :title="macroStrategy" :description="getDescription(macroStrategy)" />

      <div v-for="({ name: mainStrategy, description }) in getMainStragery(macroStrategy)" :key="mainStrategy">
        <table-title :sub-title="mainStrategy" :description="description" />

        <component :is="tableRow" v-for="fund in getFunds(mainStrategy)" :key="fund.id" :row="fund" />
      </div>
    </div>
  </div>
</template>

<script>
import responsive from '@mixins/responsive'

import removeDuplicates from '@utils/removeDuplicates'

import TableTitle from './Title'
import TableFixedHeader from './FixedHeader'

export default {
  name: 'table-main',

  components: {
    TableTitle,
    TableFixedHeader,
    TableRowMobile: () => import('./RowMobile'),
    TableRowDesktop: () => import('./RowDesktop')
  },

  mixins: [responsive],

  props: {
    list: { type: Array, required: true },
    macroStrategies: { type: Array, required: true }
  },

  methods: {
    getDescription (macroStrategy) {
      const fund = this.list.find(item => item.specification.fund_macro_strategy.name === macroStrategy)

      if (!fund) return ''

      return fund.specification.fund_macro_strategy.explanation
    },

    getMainStragery (macroStrategy) {
      const data = this.list
        .filter(item => item.specification.fund_macro_strategy.name === macroStrategy)
        .map(item => {
          return {
            name: item.specification.fund_main_strategy.name,
            description: item.specification.fund_main_strategy.explanation
          }
        })

      return removeDuplicates(data, 'name')
    },

    getFunds (mainStrategy) {
      return this.list.filter(item => item.specification.fund_main_strategy.name === mainStrategy)
    }
  },

  computed: {
    tableRow () {
      if (this.isSmallScreen || this.isMediumScreen) return 'table-row-mobile'

      return 'table-row-desktop'
    }
  }
}
</script>

<style lang="scss">
.table-main {
  order: 2;
  max-width: 873px;
  height: unset !important;
  // box-shadow: $box-shadow;
}
</style>
