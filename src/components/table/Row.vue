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
          <span>
            <star-circle v-if="row.specification.is_qualified" />
            <md-tooltip md-direction="bottom">Fundo para investidor qualificado</md-tooltip>
          </span>

          <span>
            <check-circle />
            <md-tooltip md-direction="bottom">Você já investe neste fundo</md-tooltip>
          </span>
        </div>
      </div>
      <div>{{ row.quota_date }}</div>
      <div>{{ row.profitabilities.month }}</div>
      <div>{{ row.profitabilities.year }}</div>
      <div>{{ row.profitabilities.m12 }}</div>
      <div>{{ row.operability.minimum_initial_application_amount }}</div>
      <div>{{ getRetrievalQuotation(row) }}</div>
      <div><reply /></div>
    </c-card>

    <c-transition v-show="showDetails && !isMobile">
      <detail />
    </c-transition>
  </div>
</template>

<script>
import Reply from '../common/icons/Reply'
import StarCircle from '../common/icons/StarCircle'
import CheckCircle from '../common/icons/CheckCircle'

import responsive from '../../mixins/responsive'

export default {
  name: 'table-row',

  mixins: [responsive],

  components: {
    Reply,
    StarCircle,
    CheckCircle,
    Detail: () => import('./Detail'),
    CCard: () => import('../common/CCard'),
    CTransition: () => import('../common/CTransition')
  },

  props: {
    row: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showDetails: false
    }
  },

  methods: {
    getRetrievalQuotation (row) {
      return ['úteis', 'corridos'].includes(row.operability.retrieval_quotation_days_type) && row.operability.retrieval_special_type === ''
        ? row.operability.retrieval_quotation_days_str
        : ''
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
  }
}
</style>
