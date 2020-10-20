<template>
  <div class="legends cell padding-1">
    <span class="title">Legenda</span>

    <star-circle-icon size="20" fill-color="#639d31" />
    <!-- <div v-for="({ icon, legend }) in legends" :key="icon" class="legend">
      <i :class="['icon', `fi-${icon}`]" />

      <span class="legend">{{ legend }}</span>
    </div> -->
  </div>
</template>

<script>
import StarCircleIcon from 'vue-material-design-icons/StarCircle.vue'

export default {
  name: 'legends',

  components: { StarCircleIcon },

  data () {
    return {
      legends: [
        { icon: 'star', legend: 'Fundo para investidor qualificado' },
        { icon: 'check', legend: 'Você já investe neste fundo' },
        { icon: 'info', legend: 'Entenda o resgate deste fundo' },
        { icon: 'prohibited', legend: 'Fundo fechado para aplicação' }, // icon is not the same, but it is the most similar of their package
        { icon: 'play', legend: 'Aplicar neste fundo' } // there is no similar icon
      ]
    }
  }
}
</script>

<style lang="scss">
%text {
  color: #444444;
  font-weight: bold;
  font-size: 13.0384px;
  font-family: 'Roboto', sans-serif;
}

.legends {
  width: 268px !important;
  height: 204px !important;
  border: 1px solid;
  background: #FAFAFA;

  & > .title {
    @extend %text;
    text-transform: uppercase;
  }

  & > .legend {
    display: flex;

    & > .icon {
      margin-right: 8px;
    }

    & > .legend { @extend %text; }
  }
}
</style>
