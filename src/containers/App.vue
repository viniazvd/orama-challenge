<template>
  <div v-if="!isLoading" id="app" class="app">
    <img class="logo" alt="Vue logo" src="../assets/logo.png">

    <div class="container grid-x grid-padding-x align-center margin-bottom-2">
      <div class="container-left cell large-8 medium-8">
        <left-filters @sync:search="v => search = v" />

        <funds-table :list="filteredList" :macro-strategies="macroStrategies" />

        <legends />
      </div>

      <right-filters
        v-if="!isMobile"
        class="cell large-2 medium-2"
        :list="list"
        :strategies="macroStrategies"
      />
    </div>
  </div>
</template>

<script>
import findBy from '../utils/findBy'

import setupResponsive from '../mixins/setupResponsive'

import LeftFilters from '../components/LeftFilters.vue'
import RightFilters from '../components/RightFilters.vue'
import FundsTable from '../components/table/Main.vue'
import Legends from '../components/Legends.vue'

export default {
  name: 'App',

  components: { LeftFilters, FundsTable, Legends, RightFilters },

  mixins: [setupResponsive],

  data () {
    return {
      isLoading: false,
      hasError: false,
      list: [],
      search: ''
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
  }
}
</script>

<style lang="scss">
.app {
  background-color: #f4f5f7;
  overflow-x: hidden; // to prevent horizontal scrolling because of the grid-margin-x

  & > .logo { width: 100%; margin-bottom: 20px; }

  & > .container {
    height: auto;

     & > .container-left {
      @include desktop { max-width: 873px; }

      @include responsive (xs-mobile, mobile) {
        width: 100%;

        & > .left-filters { order: 2; }
        & > .funds-table { order: 3; }
        & > .legends { order: 1; max-width: 100% !important; }
      }

      & > div:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
