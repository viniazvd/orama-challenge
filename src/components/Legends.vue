<template>
  <div class="legends cell padding-1">
    <span class="title">Legenda</span>

    <div v-for="({ name, legend }) in legends" :key="name" class="legend">
      <component class="icon" :is="name" />

      <span class="legend">{{ legend }}</span>
    </div>
  </div>
</template>

<script>
import StarCircle from './common/icons/StarCircle.vue'
import CheckCircle from './common/icons/CheckCircle.vue'
import InformationOutline from './common/icons/InformationOutline.vue'
import BlockHelper from './common/icons/BlockHelper.vue'
import Reply from './common/icons/Reply.vue'

export default {
  name: 'legends',

  components: { StarCircle, CheckCircle, InformationOutline, BlockHelper, Reply },

  data () {
    return {
      legends: [
        { name: 'StarCircle', legend: 'Fundo para investidor qualificado' },
        { name: 'CheckCircle', legend: 'Você já investe neste fundo' },
        { name: 'InformationOutline', legend: 'Entenda o resgate deste fundo' },
        { name: 'BlockHelper', legend: 'Fundo fechado para aplicação' },
        { name: 'Reply', legend: 'Aplicar neste fundo' }
      ]
    }
  }
}
</script>

<style lang="scss">
.legends {
  order: 3;
  background: white;
  box-shadow: $box-shadow;
  height: auto !important;
  max-width: 268px !important;
  min-height: 204px !important;
  @include desktop { margin-bottom: 0 !important; }

  & > .title {
    @include text;
    display: block;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  & > .legend {
    display: flex;

    &:not(:last-child) { margin-bottom: 5px; }

    & > .icon { margin-right: 8px; }

    & > .legend { @include text; }
  }
}
</style>
