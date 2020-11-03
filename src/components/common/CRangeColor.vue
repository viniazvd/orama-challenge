<template>
  <div class="c-range-color">
    <div class="title">
      Perfil de risco de fundo
      <c-popover-icon component="help-circle">
        Cada fundo é classificado considerando a política de investimento e os riscos inerentes aos ativos e mercados em que pode investir.
      </c-popover-icon>
    </div>

    <div class="content">
      <span class="before">menor</span>

      <div class="levels-wrapper">
        <span
          v-for="(color, level) in levels"
          class="level"
          :key="level"
          :style="{ background: color, height: 15 + (level * 2) + 'px' }"
          @mouseover="activeLevel = level"
          @click="$emit('select-level', level)"
        />
      </div>

      <span class="after">maior</span>
    </div>

    <span class="arrow" :style="{ left: size || '-7px' }" />
    <hr class="control" :style="{ width: size, borderColor: borderColor }">
  </div>
</template>

<script>
import levels from '@utils/levels'

import CPopoverIcon from '@components:common/CPopoverIcon'

export default {
  name: 'c-range-color',

  components: { CPopoverIcon },

  data () {
    return {
      levels,
      activeLevel: 0
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
    display: flex;
    align-items: center;
    margin: { left: 45px; bottom: 10px; }

    & > .c-popover-icon {
      margin-left: 5px;

      & > .help-circle-icon { display: flex; }
    }
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
