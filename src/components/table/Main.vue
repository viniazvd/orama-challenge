<template>
  <div :class="classes">
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
    scrollPosition: Number,
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
    classes () {
      return ['table-main', { '--is-fixed': this.scrollPosition >= 600 }]
    },

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

  &.--is-fixed {
    & > .table:nth-child(2) { margin-top: 111px; }

    & > .table-fixed-header {
      top: 0;
      position: fixed;

      z-index: 1;
      width: 100%;
      max-width: 873px;
    }
  }
}
</style>
