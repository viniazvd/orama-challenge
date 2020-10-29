<template>
  <div class="row-wrapper">
    <c-card
      class="row"
      :level="row.specification.fund_risk_profile.score_range_order"
      @click.native="showDetails = !showDetails"
    >
      <div>
        <div class="name">{{ row.simple_name }} </div>
        <div class="icons">
          <c-popover-icon v-if="row.specification.is_qualified" component="star-circle">
            Fundo para investidor qualificado
          </c-popover-icon>

          <c-popover-icon component="check-circle">
            Você já investe neste fundo
          </c-popover-icon>
        </div>
      </div>

      <div>{{ row.quota_date }}</div>
      <div>{{ row.profitabilities.month }}</div>
      <div>{{ row.profitabilities.year }}</div>
      <div>{{ row.profitabilities.m12 }}</div>
      <div>{{ row.operability.minimum_initial_application_amount }}</div>

      <div v-if="showRetrievalQuotation(row)">{{ row.operability.retrieval_quotation_days_str }}</div>
      <c-popover-icon v-else component="information-outline">
        <p class="title">Dias para conversão do resgate:</p>
        <div class="info">3º dia útil anterior ao último dia útil do 2º mês calendário subsequente à solicitação de resgate</div>
      </c-popover-icon>

      <div><reply /></div>
    </c-card>

    <c-transition v-show="showDetails && !isMobile">
      <detail :row="row" />
    </c-transition>
  </div>
</template>

<script>
import CCard from '../common/CCard'

import responsive from '../../mixins/responsive'

export default {
  name: 'table-row',

  mixins: [responsive],

  components: {
    CCard,
    Detail: () => import('./Detail'),
    CTransition: () => import('../common/CTransition'),
    CPopoverIcon: () => import('../common/CPopoverIcon')
  },

  props: {
    row: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showPopover: false,
      showDetails: false
    }
  },

  methods: {
    showRetrievalQuotation (row) {
      return ['úteis', 'corridos'].includes(row.operability.retrieval_quotation_days_type) &&
        row.operability.retrieval_special_type === ''
    }
  }
}
</script>

<style lang="scss">
.row-wrapper {
  & > .row {
    display: grid;
    gap: 5px;
    align-items: center;
    grid-template-columns: minmax(20%, 1fr) repeat(7, 10%);

    padding: 15px;
    cursor: pointer;
    min-height: 76px;

    & > div {
      @include text;
      @include truncate();

      padding: 10px;
      font-size: 11px;
      font-weight: 400;
      text-align: left;

      &:last-child { text-align: center; }
      &:not(:first-child) { text-align: right; }
      &:first-child {
        display: flex;
        justify-content: space-between;

        overflow: unset;
        white-space: unset;

        & > .name {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          padding-right: 5px;
        }
        & > .icons { display: flex; }
      }
    }

    & > .c-popover-icon {
      text-align: right;

      & > .c-popover > .popover-card {
        & > .title { font-weight: bold; }
        & > .info { font-weight: initial; white-space: initial; }
      }
    }
  }
}
</style>
