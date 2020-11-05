<template>
  <div class="right-filters">
    <div class="title">Filtrar por estratégias:</div>

    <c-checkbox-group
      v-for="(items, strategy) in strategies"
      item-event-name="filter:main-strategy"
      main-event-name="filter:macro-strategy"
      :key="items.main"
      :items="items"
      :description="strategy"
      v-on="$listeners"
    />

    <div class="title manager">Filtrar por gestores:</div>

    <c-checkbox-group
      description="Gestores"
      item-event-name="filter:manager"
      main-event-name="filter:managers"
      :items="filteredManagers"
      v-on="$listeners"
    >
      <md-field class="search">
        <md-input
          placeholder="Buscar"
          :value="search"
          @input="handleInput"
        />
      </md-field>
    </c-checkbox-group>
  </div>
</template>

<script>
import findBy from '@utils/findBy'
import debounce from '@utils/debounce'

import CCheckboxGroup from '@components:common/CCheckboxGroup'

export default {
  name: 'right-filters',

  components: { CCheckboxGroup },

  props: {
    list: { type: Array, required: true },
    managers: { type: Array, required: true },
    strategies: { type: Object, required: true },
    macroStrategies: { type: Array, required: true }
  },

  data () {
    return {
      search: ''
    }
  },

  computed: {
    filteredManagers () {
      if (!this.search) return this.managers

      return this.managers
        .map(manager => ({ name: manager }))
        .filter(manager => findBy(manager.name, this.search, ['main']))
        .map(({ name }) => name)
    }
  },

  methods: {
    handleInput: debounce(function (value) {
      this.search = value
    })
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
