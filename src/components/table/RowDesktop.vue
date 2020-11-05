<template>
  <div class="row-wrapper-desktop" :style="{ opacity: row.is_close ? '0.4' : '1' }">
    <c-card
      class="row"
      :level="row.specification.fund_risk_profile.score_range_order"
      @click.native="!row.is_close && (showDetails = !showDetails)"
    >
      <div>
        <div class="name-icons">
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

        <span class="strategies">
          {{ row.specification.fund_macro_strategy.name }} | {{ row.specification.fund_main_strategy.name }}
        </span>
      </div>

      <c-tooltip
        position="top"
        arrow-spacing="5"
        :show="showQuotaDate"
        :target="$refs.quotaDate"
        :value="formatDate(row.quota_date)"
      />

      <div
        ref="quotaDate"
        @mouseout="showQuotaDate = false"
        @mouseenter="showQuotaDate = true"
      >
        {{ formatDate(row.quota_date) }}
      </div>
      <div>{{ toPercentage(row.profitabilities.month) }}</div>
      <div>{{ toPercentage(row.profitabilities.year) }}</div>
      <div>{{ toPercentage(row.profitabilities.m12) }}</div>
      <div>{{ toMoney(row.operability.minimum_initial_application_amount) }}</div>

      <c-tooltip
        position="top"
        arrow-spacing="5"
        :show="showRetrievalQuotationDays"
        :target="$refs.retrievalQuotationDays"
        :value="row.operability.retrieval_quotation_days_str"
      />

      <div
        v-if="showRetrievalQuotation(row)"
        ref="retrievalQuotationDays"
        @mouseout="showRetrievalQuotationDays = false"
        @mouseenter="showRetrievalQuotationDays = true"
      >
        {{ row.operability.retrieval_quotation_days_str }}
      </div>
      <c-popover-icon v-else component="information-outline">
        <p class="title">Dias para conversão do resgate:</p>
        <div class="info">3º dia útil anterior ao último dia útil do 2º mês calendário subsequente à solicitação de resgate</div>
      </c-popover-icon>

      <div>
        <reply v-if="row.is_active" />
        <check-circle v-if="row.is_close" />
      </div>
    </c-card>

    <c-transition v-show="showDetails && (isLargeScreen || isVeryLargeScreen)">
      <detail :row="row" />
    </c-transition>
  </div>
</template>

<script>
import toMoney from '@utils/toMoney'
import formatDate from '@utils/formatDate'
import toPercentage from '@utils/toPercentage'

import CCard from '@components:common/CCard'

import responsive from '@mixins/responsive'

export default {
  name: 'table-row-desktop',

  mixins: [responsive],

  components: {
    CCard,
    Detail: () => import('@components/table/Detail'),
    CTooltip: () => import('@components:common/CTooltip'),
    CTransition: () => import('@components:common/CTransition'),
    CPopoverIcon: () => import('@components:common/CPopoverIcon')
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
      showDetails: false,
      showQuotaDate: false,
      showRetrievalQuotationDays: false
    }
  },

  methods: {
    toMoney,
    formatDate,
    toPercentage,

    showRetrievalQuotation (row) {
      return ['úteis', 'corridos'].includes(row.operability.retrieval_quotation_days_type) &&
        row.operability.retrieval_special_type === ''
    }
  }
}
</script>

<style lang="scss">
.row-wrapper-desktop {
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
        flex-direction: column;
        justify-content: space-between;

        overflow: unset;
        white-space: unset;

        & > .name-icons {
          display: flex;
          justify-content: space-between;

          & > .name {
            font-size: 13px;
            padding-right: 5px;

            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          & > .icons { display: flex; }
        }

        & > .strategies {
          opacity: 0.4;
          font-size: 11px;
        }
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
