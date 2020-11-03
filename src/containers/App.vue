<template>
  <div id="app" class="app" @scroll.capture="setHeaderPosition">
    <img class="logo" alt="Vue logo" src="../assets/logo.png">

    <div class="container grid-x align-center">
      <div class="container-left">
        <left-filters @sync:search="v => search = v" />

        <c-loader v-if="isLoading" />
        <funds-table
          v-else
          :list="filteredList"
          :scroll-position="scrollPosition"
          :macro-strategies="macroStrategies"
        />

        <legends />
      </div>

      <c-loader v-if="isLoading" />
      <right-filters
        v-else-if="isVeryLargeScreen"
        :list="list"
        :strategies="macroStrategies"
      />
    </div>
  </div>
</template>

<script>
import findBy from '../utils/findBy'

import setupResponsive from '@mixins/setupResponsive'

import CLoader from '@components:common/CLoader'

import LeftFilters from '@components/LeftFilters'
import RightFilters from '@components/RightFilters'
import FundsTable from '@components/table/Main'
import Legends from '@components/Legends'

export default {
  name: 'App',

  components: { CLoader, LeftFilters, FundsTable, Legends, RightFilters },

  mixins: [setupResponsive],

  data () {
    return {
      isLoading: false,
      hasError: false,
      list: [],
      search: '',
      scrollPosition: 0
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

  computed: {
    filteredList () {
      if (!this.search) return this.list

      return findBy(
        this.list,
        this.search,
        ['simple_name', 'specification.fund_macro_strategy.name', 'specification.fund_main_strategy.name'],
        true
      )
    },

    macroStrategies () {
      if (!this.list.length) return []

      return [
        ...new Set([...this.list.map(item => item.specification.fund_macro_strategy.name)])
      ]
    }
  },

  methods: {
    setHeaderPosition (event) {
      if (this.isSmallScreen || this.isMediumScreen) return

      this.scrollPosition = event.target.scrollTop
    }
  }
}
</script>

<style lang="scss">
.app {
  overflow-x: hidden;
  background-color: #f4f5f7;

  & > .logo { width: 100%; margin-bottom: 20px; }

  & > .container {
    height: auto;
    margin-bottom: 60px;
    flex-flow: row nowrap;

     & > .container-left {
      margin: 0 30px;
      max-width: 875px;

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
