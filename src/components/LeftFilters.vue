<template>
  <div class="left-filters cell radius padding-1">
    <input type="text" class="search">

    <div class="controls padding-2 grid-x align-spaced background-primary">
      <c-range
        class="minimal-application"

        title="Aplicação mínima"
        footer="Até R$ 20.000,00"

        :min="0"
        :max="100"
        :value="step"
        @input="value => step = value"
      />

      <span class="risk-profile">filter2</span>

      <c-range
        class="rescue-deadline"

        title="Prazo de resgate"
        footer="Até 30 dias úteis"

        :min="0"
        :max="100"
        :value="step"
        @input="value => step = value"
      />

    </div>

    <div class="time-limit margin-top-1">Horário limite da aplicação: 12:00</div>
  </div>
</template>

<script>
import CRange from './common/CRange'

export default {
  name: 'left-filters',

  components: { CRange },

  data () {
    return {
      step: 10
    }
  }
}
</script>

<style lang="scss">
.left-filters {
  height: unset !important;
  background-color: white;

  & > .controls {
    background: #FAFAFA;

    & > .minimal-application, .rescue-deadline { max-width: 190px; }

    & > .risk-profile { width: 230px; }
  }

  & > .time-limit {
    color: #8D8D8D;
    font-size: 11px;
    font-weight: 400; // regular
    font-family: 'Roboto', sans-serif;
  }
}
</style>
