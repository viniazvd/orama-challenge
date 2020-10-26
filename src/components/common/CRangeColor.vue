<template>
  <div class="c-range-color">
    <div class="title">
      Perfil de risco de fundo
      <help-circle />
      <md-tooltip md-direction="bottom">
        Cada fundo é classificado considerando a política de investimento e os riscos inerentes aos ativos e mercados em que pode investir.
      </md-tooltip>
    </div>

    <div class="content">
      <span class="before">menor</span>

      <div class="levels-wrapper">
        <span
          v-for="level in levels"
          class="level"
          :key="level.value"
          :style="{ background: level.color, height: 15 + (level.value * 2) + 'px' }"
          @mouseover="activeLevel = level.value"
          @click="$emit('select-level', level.value)"
        />
      </div>

      <span class="after">maior</span>
    </div>

    <span class="arrow" :style="{ left: size || '-7px' }" />
    <hr class="control" :style="{ width: size, borderColor: borderColor }">
  </div>
</template>

<script>
import HelpCircle from './icons/HelpCircle'

export default {
  name: 'c-range-color',

  components: { HelpCircle },

  data () {
    return {
      activeLevel: 0,
      levels: [
        { value: 1, color: '#a6ecfc' },
        { value: 2, color: '#68f1dd' },
        { value: 3, color: '#91ed6e' },
        { value: 4, color: '#b0f42a' },
        { value: 5, color: '#ddf40c' },
        { value: 6, color: '#faf00e' },
        { value: 7, color: '#ffdc00' },
        { value: 8, color: '#fb0' },
        { value: 9, color: '#f80' },
        { value: 10, color: '#ff5e00' },
        { value: 11, color: '#ff0600' },
        { value: 12, color: '#b51414' }
      ]
    }
  },

  computed: {
    size () {
      if (!this.activeLevel) return 0

      return (this.activeLevel * 12) - 18 + 'px'
    },

    borderColor () {
      if (!this.activeLevel || this.activeLevel === 1) return 'transparent'

      return '#DADADA'
    }
  }
}
</script>

<style lang="scss">
.c-range-color {
  position: relative;

  & > .title {
    text-align: center;
    margin-bottom: 10px;
  }

  & > .content {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    & > .before { @include text; }

    & > .levels-wrapper {
      gap: 1px;
      display: grid;
      align-items: flex-end;
      grid-template-columns: repeat(12, 1fr);

      height: 40px;
      width: 144px;

      & > .level {
        width: 7px;
        cursor: pointer;
      }
    }

    & > .after { @include text; }
  }

  & > .arrow {
    width: 12px;
    height: 12px;
    cursor: pointer;
    margin: 3px 0 0 45px;
    border: solid 10px transparent;
    border-bottom: solid 10px #505152;

    left: -7px;
    bottom: -7px;
    position: absolute;
  }

  & > .control {
    margin: 7px 0 0 45px;
    border-bottom: 2px solid #DADADA;
  }
}
</style>
