<template>
  <div id="app" class="app">
    <vue-coe-image class="logo" :src="require('../assets/logo.png')" />

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
        :list="filteredList"
        :strategies="macroStrategies"
      />
    </div>
  </div>
</template>

<script>
import VueCoeImage from 'vue-coe-image'
import 'vue-coe-image/dist/vue-coe-image.css'

import findBy from '@utils/findBy'

import setupResponsive from '@mixins/setupResponsive'

import CLoader from '@components:common/CLoader'

import LeftFilters from '@components/LeftFilters'
import RightFilters from '@components/RightFilters'
import FundsTable from '@components/table/Main'
import Legends from '@components/Legends'

export default {
  name: 'App',

  components: { VueCoeImage, CLoader, LeftFilters, FundsTable, Legends, RightFilters },

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

    window.addEventListener('scroll', this.setHeaderPosition)

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
        ['simple_name'],
        true
      )
    },

    macroStrategies () {
      if (!this.filteredList.length) return []

      return [
        ...new Set([...this.filteredList.map(item => item.specification.fund_macro_strategy.name)])
      ]
    }
  },

  methods: {
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
