<template>
  <div class="right-filters">
    <div class="title">Filtrar por estratégias:</div>

    <c-checkbox-group
      v-for="strategy in strategies"
      :key="strategy"
      :description="strategy"
      :items="getItems(strategy)"
    />

    <div class="title manager">Filtrar por gestores:</div>

    <c-checkbox-group description="Gestores" :items="filteredManagers">
      <md-field class="search">
        <md-input placeholder="Buscar" v-model="search" />
      </md-field>
    </c-checkbox-group>
  </div>
</template>

<script>
import findBy from '../utils/findBy'

import CCheckboxGroup from './common/CCheckboxGroup'

export default {
  name: 'right-filters',

  components: { CCheckboxGroup },

  props: {
    list: { type: Array, required: true },
    strategies: { type: Array, required: true }
  },

  data () {
    return {
      search: ''
    }
  },

  computed: {
    managers () {
      return [...new Set([...this.list.map(item => item.fund_manager.name)])]
    },

    filteredManagers () {
      if (!this.search) return this.managers

      const managers = this.managers.map(manager => ({ name: manager }))

      return findBy(managers, this.search, ['name'], true)
        .map(({ name }) => name)
    }
  },

  methods: {
    getItems (strategy) {
      const mainStrategies = this.list
        .filter(item => item.specification.fund_macro_strategy.name === strategy)
        .map(item => item.specification.fund_main_strategy.name)

      return [...new Set([...mainStrategies])]
    }
  }
}
</script>

<style lang="scss">
%border-position {
  bottom: 15px;
  margin: 0 25px;
}

.right-filters {
  width: 270px;
  margin-right: 30px;

  & > .title {
    @include text;
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 15px;
  }

  & > .manager { margin-top: 20px; }

  & > .c-checkbox-group > .items-wrapper > .search {
    margin: 0;
    padding: 0 25px;
    font-size: 11px !important;
    background: white;

    &:before { @extend %border-position; }
    &::after { @extend %border-position; }
  }
}
</style>
