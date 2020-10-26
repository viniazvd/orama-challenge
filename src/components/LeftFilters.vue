<template>
  <div class="left-filters radius padding-1">
    <md-field class="search">
      <md-input placeholder="Buscar fundo por nome" v-model="search" />
      <search-icon class="icon" />
    </md-field>

    <div v-if="!isMobile" class="controls padding-2 grid-x align-spaced background-primary">
      <c-range
        class="minimal-application"

        title="Aplicação mínima"
        :footer="`Até ${toMoney(minimalApplication)}`"

        :min="0"
        :max="500000"
        :value="minimalApplication"
        @input="value => minimalApplication = value"
      />

      <c-range-color class="risk-profile" />

      <c-range
        class="rescue-deadline"

        title="Prazo de resgate"
        :footer="`Até ${rescueDeadline} dias úteis`"

        :min="0"
        :max="270"
        :value="rescueDeadline"
        @input="value => rescueDeadline = value"
      />

    </div>

    <div class="time-limit">Horário limite da aplicação: 12:00</div>
  </div>
</template>

<script>
import { toMoney } from '../utils/toMoney'
import responsive from '../mixins/responsive'

import CRange from './common/CRange'
import CRangeColor from './common/CRangeColor'
import SearchIcon from './common/icons/Search'

export default {
  name: 'left-filters',

  mixins: [responsive],

  components: { CRange, CRangeColor, SearchIcon },

  data () {
    return {
      search: '',
      rescueDeadline: 0,
      minimalApplication: 0
    }
  },

  watch: {
    search (v) {
      this.$emit('sync:search', v)
    }
  },

  methods: { toMoney }
}
</script>

<style lang="scss">
.left-filters {
  order: 1;
  box-shadow: $box-shadow;
  height: unset !important;
  background-color: white;

  &.cell { margin-top: 20px !important; }

  & > .search {
    padding-top: 0 !important;
    margin: 0 0 20px !important;
    min-height: auto !important;
    @include responsive (tablet, desktop) { max-width: 453px; }
  }

  & > .controls {
    background: #FAFAFA;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: #{map-get($responsive_breakpoints, desktop) - 1px}) {
      flex-direction: column !important;

      & > div:not(:last-child) { margin-bottom: 25px; }
    }

    & > .minimal-application, .rescue-deadline { max-width: 190px; }

    & > .risk-profile { width: 230px; }
  }

  & > .time-limit {
    color: #8D8D8D;
    font-size: 11px;
    margin-top: 10px;
    font-family: $font-family;
  }
}
</style>
