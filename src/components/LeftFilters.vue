<template>
  <div class="left-filters">
    <md-field class="search">
      <md-input placeholder="Buscar fundo por nome" v-model="search" />
      <search-icon class="icon" />
    </md-field>

    <div v-if="isLargeScreen || isVeryLargeScreen" class="controls grid-x">
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
import toMoney from '@utils/toMoney'
import responsive from '@mixins/responsive'

import CRange from '@components:common/CRange'
import CRangeColor from '@components:common/CRangeColor'
import SearchIcon from '@components:common/icons/Search'

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
  padding: 20px;
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
    flex-flow: nowrap;
    align-items: center;
    justify-content: space-between;

    background: #FAFAFA;
    padding: 35px 25px 30px;

    @media only screen and (min-width: 1460px) and (max-width: 1416px) {
      justify-content: center !important;

      & > div:not(:last-child) { margin-bottom: 25px; }
    }

    @media only screen and (max-width: #{map-get($responsive_breakpoints, mobile)}) {
      justify-content: center !important;

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
