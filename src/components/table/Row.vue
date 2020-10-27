<template>
  <div class="row-wrapper">
    <c-card
      class="row"
      :level="row.specification.fund_risk_profile.score_range_order"
      @click.native="showDetails = !showDetails"
    >
      <div>{{ row.simple_name }}</div>
      <div>{{ row.quota_date }}</div>
      <div>{{ row.profitabilities.month }}</div>
      <div>{{ row.profitabilities.year }}</div>
      <div>{{ row.profitabilities.m12 }}</div>
      <div>{{ row.operability.minimum_initial_application_amount }}</div>
      <div>{{ row.operability.retrieval_quotation_days_str }}</div>
      <div><reply /></div>
    </c-card>

    <c-transition v-show="showDetails && !isMobile">
      <detail />
    </c-transition>
  </div>
</template>

<script>
import Reply from '../common/icons/Reply'
import responsive from '../../mixins/responsive'

export default {
  name: 'table-row',

  mixins: [responsive],

  components: {
    Reply,
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
  }
}
</script>

<style lang="scss">
.row-wrapper {
  & > .row {
    display: grid;
    gap: 5px;
    align-items: center;
    grid-template-columns: minmax(20%, 1fr) 10% 10% 10% 10% 10% 10% 10%;

    padding: 15px;
    cursor: pointer;
    min-height: 76px;

    & > div {
      @include text;
      font-size: 11px;
      font-weight: 400;
      text-align: left;

      &:not(:first-child) { text-align: right; }
      &:last-child { text-align: center; }
    }
  }
}
</style>
