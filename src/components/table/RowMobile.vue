<template>
  <div :class="classes" @click="redirect">
    <div class="row">
      <span class="title">{{ row.simple_name }}</span>
      <span class="risk-color" :style="color" />
    </div>

    <div class="row sub-title">{{ row.specification.fund_macro_strategy.name }} | {{ row.specification.fund_main_strategy.name }}</div>

    <div class="row">
      <span class="label">Data da cota:</span>
      <span class="value">{{ formatDate(row.quota_date) }}</span>
    </div>

    <div class="row">
      <span class="label">Rentabilidade 12 meses:</span>
      <span class="value">{{ toPercentage(row.profitabilities.m12) + '%'}}</span>
    </div>

    <div class="row">
      <span class="label">Aplicação mínima:</span>
      <span class="value">{{ toMoney(row.operability.minimum_initial_application_amount) }}</span>
    </div>

    <div class="row">
      <span class="label">Cotização do resgate:</span>
      <span class="value">{{ row.operability.retrieval_quotation_days_str }}</span>
    </div>

    <div class="row">
      <c-button
        full-width
        class="more-details"
        text="Mais detalhes"
        text-color="#25B7BA"
        border-color="#25B7BA"
      />

      <c-button
        full-width
        icon="reply"
        class="reply"
        text="Aplicar"
        text-color="white"
        bg-color="#25B7BA"
        @click.native.stop="apply"
      />
    </div>
  </div>
</template>

<script>
import toMoney from '@utils/toMoney'
import formatDate from '@utils/formatDate'
import toPercentage from '@utils/toPercentage'

import levels from '@utils/levels'

import CButton from '@components:common/CButton'

export default {
  name: 'table-row-mobile',

  components: { CButton },

  props: {
    row: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
    }
  },

  methods: {
    toMoney,
    formatDate,
    toPercentage,

    redirect () {
      if (!this.row.id) return

      const url = `https://www.orama.com.br/investimentos/fundos-de-investimento/${this.row.id}`
      window.open(url, '_blank')
    },

    apply () {
      console.log('apply')
    }
  },

  computed: {
    classes () {
      return ['row-wrapper-mobile', { '--is-closed': !this.row.is_closed }]
    },

    color () {
      const level = this.row.specification.fund_risk_profile.score_range_order

      return {
        'background-color': levels[level]
      }
    }
  }
}
</script>

<style lang="scss">
.row-wrapper-mobile {
  width: 100%;
  cursor: pointer;
  padding: 25px 15px 20px;
  background-color: white;
  border-bottom: solid 1px #eff0f2;

  &.--is-closed {
    &:hover { opacity: 0.6; }

    & > .row:not(:last-child) { opacity: 0.4; }

    & > .row:last-child > .reply { opacity: 0.2; cursor: not-allowed; }
  }

  &:hover { background: #e6fcfc; }

  & > .row {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) { margin-bottom: 15px; }

    & > .label, .title {
      flex: 50%;

      @include text;
      font-weight: 700;
      color: #505152 !important;
    }

    & > .value {
      flex: 50%;

      @include text;
      font-size: 12px;
      text-align: right;
      font-weight: normal;
    }

    & > .risk-color {
      height: 14px;
      width: 14px;
      border-radius: 3px;
    }

    & > .more-details {
      font-weight: 600;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2);
    }

    & > .reply {
      margin-left: 10px;

      & > .icon > svg {
        background: white;

        & > path { fill: #25B7BA; }
      }
    }
  }

  & > .sub-title {
    @include text;
    font-size: 12px;
    font-weight: normal;
  }
}
</style>
