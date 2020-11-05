<template>
  <div id="app" class="app">
    <vue-coe-image class="logo" :src="require('../assets/logo.png')" />

    <div v-if="hasError">Erro ao carregar dados..</div>

    <div v-else class="container grid-x align-center">
      <div class="container-left">
        <left-filters
          :rescue-deadline="filters.rescueDeadline"
          :minimal-application="filters.minimalApplication"
          @sync:search="query => search = query"
          @select-level="lvl => filters.level = +lvl"
          @rescue-deadline="value => filters.rescueDeadline = value"
          @minimal-application="value => filters.minimalApplication = value"
        />

        <c-loader v-if="isLoading" />
        <funds-table
          v-else
          :list="filteredList"
          :filters="filters"
          :scroll-position="scrollPosition"
          :macro-strategies="macroStrategies"
        />

        <legends />
      </div>

      <c-loader v-if="isLoading" />
      <right-filters
        v-else-if="isVeryLargeScreen"
        :list="filteredList"
        :strategies="strategies"
        :managers="filters.managers"
        :macro-strategies="macroStrategies"

        @filter:manager="filterMainManager"
        @filter:managers="filterMacroManager"

        @filter:main-strategy="filterMainStrategy"
        @filter:macro-strategy="filterMacroStrategy"
      />
    </div>
  </div>
</template>

<script>
import VueCoeImage from 'vue-coe-image'
import 'vue-coe-image/dist/vue-coe-image.css'

import findBy from '@utils/findBy'
import toNumber from '@utils/toNumber'
import removeDuplicates from '@utils/removeDuplicates'

import setupResponsive from '@mixins/setupResponsive'

import CLoader from '@components:common/CLoader'

import LeftFilters from '@components/LeftFilters'
import RightFilters from '@components/RightFilters'
import FundsTable from '@components/table/Main'
import Legends from '@components/Legends'

export default {
  name: 'App',

  components: { VueCoeImage, CLoader, LeftFilters, RightFilters, FundsTable, Legends },

  mixins: [setupResponsive],

  data () {
    return {
      list: [],
      search: '',
      hasError: false,
      isLoading: false,
      scrollPosition: 0,
      filters: {
        level: null,
        managers: [],
        strategies: [],
        rescueDeadline: 270,
        minimalApplication: 500000
      }
    }
  },

  watch: {
    isLoading (status) {
      if (status) return

      this.filters.strategies = Object
        .entries(this.strategies)
        .map(([macro, main]) => ({ macro, items: main }))

      const managers = this.filteredList.map(item => ({
        isChecked: true,
        main: item.fund_manager.name
      }))

      this.filters.managers = removeDuplicates(managers, 'main')
    }
  },

  async created () {
    this.isLoading = true

    const url = 'https://s3.amazonaws.com/orama-media/json/fund_detail_full.json?limit=1000&offset=0&serializer=fund_detail_full'

    try {
      const response = await fetch(url, { method: 'GET' })
      this.list = await response.json()
    } catch (error) {
      this.hasError = true
    }

    this.isLoading = false
  },

  mounted () {
    window.addEventListener('scroll', this.setHeaderPosition)
  },

  computed: {
    filteredList () {
      return this.list.filter(item => {
        return findBy(item, this.search, ['simple_name']) &&
          this.levelFilter(item) &&
          this.managersFilter(item) &&
          this.rescueDeadlineFilter(item) &&
          this.strategiesFilter(item) &&
          this.minimalApplicationFilter(item)
      })
    },

    macroStrategies () {
      if (!this.list.length) return []

      return [
        ...new Set([...this.list.map(item => item.specification.fund_macro_strategy.name)])
      ]
    },

    strategies () {
      return this.macroStrategies.reduce((acc, macroStrategy) => {
        acc[macroStrategy] = this.getStragegies(macroStrategy)

        return acc
      }, {})
    },

    filteredStrategies () {
      return this.filters.strategies.reduce((acc, item) => {
        const items = item.items
          .filter(({ isChecked }) => !isChecked)
          .map(({ main }) => main)

        acc = [...acc, ...items]

        return acc
      }, [])
    },

    filteredManagers () {
      return this.filters.managers
        .filter(({ isChecked }) => !isChecked)
        .map(({ main }) => main)
    }
  },

  methods: {
    getStragegies (strategy) {
      const mainStrategies = this.list
        .filter(item => item.specification.fund_macro_strategy.name === strategy)
        .map(item => ({
          isChecked: true,
          main: item.specification.fund_main_strategy.name
        }))

      return removeDuplicates(mainStrategies, 'main')
    },

    rescueDeadlineFilter (item) {
      return toNumber(item.operability.retrieval_quotation_days_str) <= this.filters.rescueDeadline
    },

    levelFilter (item) {
      return this.filters.level === null ||
        item.specification.fund_risk_profile.score_range_order === this.filters.level
    },

    minimalApplicationFilter (item) {
      return +item.operability.minimum_initial_application_amount <= this.filters.minimalApplication
    },

    strategiesFilter (item) {
      return !this.filteredStrategies.length ||
        !this.filteredStrategies.includes(item.specification.fund_main_strategy.name)
    },

    managersFilter (item) {
      return !this.filteredManagers.length ||
        !this.filteredManagers.includes(item.fund_manager.name)
    },

    setHeaderPosition () {
      if (this.isSmallScreen || this.isMediumScreen) return

      const supportPageOffset = window.pageXOffset !== undefined
      const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

      const y = supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
          ? document.documentElement.scrollTop
          : document.body.scrollTop

      this.scrollPosition = y
    },

    filterMacroStrategy ({ macro, isChecked }) {
      this.filters.strategies = this.filters.strategies.map(filter => {
        if (filter.macro !== macro) return filter

        return {
          ...filter,
          items: filter.items.map(item => ({ ...item, isChecked }))
        }
      })
    },

    filterMainStrategy ({ macro, main, isChecked }) {
      this.filters.strategies = this.filters.strategies.map(filter => {
        if (filter.macro !== macro) return filter

        return {
          ...filter,
          items: filter.items.map(item => {
            if (item.main !== main) return item

            return { ...item, isChecked }
          })
        }
      })
    },

    filterMacroManager ({ isChecked }) {
      this.filters.managers = this.filters.managers.map(manager => ({ ...manager, isChecked }))
    },

    filterMainManager ({ main, isChecked }) {
      this.filters.managers = this.filters.managers.map(manager => {
        if (manager.main !== main) return manager

        return { ...manager, isChecked }
      })
    }
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.setHeaderPosition)
  }
}
</script>

<style lang="scss">
.app {
  background-color: #f4f5f7;

  & > .logo {
    width: 100%;
    height: 327px;
    margin-bottom: 20px;

    & > .lazy-load-image { height: 327px; }
  }

  & > .container {
    height: auto;
    margin-bottom: 60px;
    flex-flow: row nowrap;

     & > .container-left {
      width: 100%;
      max-width: 875px;

      margin: 0 30px;

      @include responsive (xs-mobile, mobile) {
        display: flex;
        flex-basis: 100%;
        flex-direction: column;

        & > .left-filters { order: 2; }
        & > .funds-table { order: 3; }
        & > .legends {
          order: 1;
          margin-bottom: 30px;
          max-width: 100% !important;
        }
      }

      & > div:not(:last-child) { margin-bottom: 15px; }
    }
  }
}
</style>
