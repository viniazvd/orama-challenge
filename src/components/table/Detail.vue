<template>
  <div class="table-fund-detail">
    <div class="chart"></div>

    <div class="details">
      <div>
        <span class="label">Cotização da aplicação:</span>
        <span class="value">
          {{ row.operability.application_quotation_days_str }}

          <c-popover-icon component="help-circle">
            Total de dias para que o valor aplicado seja convertido em cotas do fundo.
          </c-popover-icon>
        </span>
      </div>
      <div>
        <span class="label">Cotização do resgate:</span>
        <span class="value">
          {{ row.operability.retrieval_quotation_days_str }}

          <c-popover-icon component="help-circle">
            Total de dias para que as cotas do fundo sejam transformadas em valor monetário.
          </c-popover-icon>
        </span>
      </div>
      <div>
        <span class="label">Liquidação do resgate:</span>
        <span class="value">
          {{ row.operability.retrieval_liquidation_days_str }}

          <c-popover-icon component="help-circle">
            Total de dias após a conversão para que o valor do resgate esteja disponível em sua Subconta Órama.
          </c-popover-icon>
        </span>
      </div>
      <div>
        <span class="label">Taxa de administração:</span>
        <span class="value">
          {{ row.fees.administration_fee }}

          <c-popover-icon component="help-circle">
            Taxa anual cobrada pelo Administrador do Fundo como remuneração pelos serviços prestados.
          </c-popover-icon>
        </span>
      </div>
      <div>
        <span class="label">Horário limite de aplicação:</span>
        <span class="value">
          {{ row.operability.application_time_limit }}

          <c-popover-icon component="help-circle">
            Horário limite para que a aplicação seja efetivada no mesmo dia. Cancelamentos só poderão ser realizados até esse horário.
          </c-popover-icon>
        </span>
      </div>
      <div>
        <span class="label">Volatilidade 12 meses:</span>
        <span class="value">
          {{ toPercentage(row.volatility_12m) }}

          <c-popover-icon component="help-circle">
            Medida de dispersão de retornos em relação à sua média. Quanto maior a volatilidade, mais a rentabilidade de um ativo pode variar.
          </c-popover-icon>
        </span>
      </div>

      <div class="link" @click="redirect">Conheça mais informações sobre este fundo</div>

      <div>
        <span class="label">CNPJ do fundo:</span>
        <span class="value">{{ row.cnpj }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import toPercentage from '@utils/toPercentage'

export default {
  name: 'table-fund-detail',

  components: {
    CPopoverIcon: () => import('@components:common/CPopoverIcon')
  },

  props: {
    row: {
      type: Object,
      required: true
    }
  },

  methods: {
    toPercentage,

    redirect () {
      if (!this.row.id) return

      window.location.href = `https://www.orama.com.br/investimentos/fundos-de-investimento/${this.row.id}`
    }
  }
}
</script>

<style lang="scss">
.table-fund-detail {
  display: flex;

  background-color: white;
  padding: { top: 110px; right: 15px; bottom: 45px; left: 15px; }

  & > .chart {
    flex-basis: 50%;
  }

  & > .details {
    @include text;
    flex-basis: 50%;

    & > div {
      display: flex;
      align-items: baseline;

      &:not(:last-child) { margin-bottom: 10px; }

      & > .label { padding-right: 5px !important; }

      & > .value {
        display: flex;
        font-weight: normal;
        line-break: anywhere;

        & > .c-popover-icon { margin-left: 5px; }
      }
    }

    & > .link {
      cursor: pointer;
      font-weight: normal;
      text-decoration: underline;
      margin: { top: 40px; bottom: 110px !important; }
    }
  }
}
</style>
