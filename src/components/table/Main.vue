<template>
  <div :class="classes">
    <table-fixed-header v-if="!isSmallScreen && !isMediumScreen" />

    <div v-if="!list.length" class="empty-table">O fundo buscado não está disponível nesta lista.</div>

    <div v-else v-for="macroStrategy in filteredMacroStrategies" :key="macroStrategy" class="table">
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

import TableTitle from '@components/table/Title'
import TableFixedHeader from '@components/table/FixedHeader'

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
    filters: { type: Object, required: true },
    macroStrategies: { type: Array, required: true }
  },

  computed: {
    classes () {
      return ['table-main', { '--is-fixed': this.scrollPosition >= 630 }]
    },

    tableRow () {
      if (this.isSmallScreen || this.isMediumScreen) return 'table-row-mobile'

      return 'table-row-desktop'
    },

    filteredMacroStrategies () {
      return this.filters.strategies
        .filter(strategy => strategy.items.some(({ isChecked }) => isChecked))
        .map(({ macro }) => macro)
    }
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
  }
}
</script>

<style lang="scss">
.table-main {
  order: 2;
  max-width: 873px;
  height: unset !important;
  box-shadow: $box-shadow;

  & > .empty-table {
    display: flex;
    align-items: center;
    justify-content: center;

    @include text;
    height: 240px;
    font-size: 14px;
    background-color: white;
  }

  &.--is-fixed {
    & > .table:nth-child(2) { margin-top: 100px; }

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
