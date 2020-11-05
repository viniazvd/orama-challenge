<template>
  <div class="c-checkbox-group">
    <c-checkbox
      class="checkbox-main"
      :description="description"
      :is-checked="isChecked"
      @toggle="onToggleMain"
      @arrow:toggle="showItems = $event"
    />

    <c-transition v-show="showItems" class="items-wrapper">
      <slot />

      <md-checkbox
        v-for="item in internalItems"
        class="item"
        :key="item.id"
        v-model="item.isChecked"
        @change="onToggleItem(item)"
      >
        {{ item.main }}
      </md-checkbox>
    </c-transition>
  </div>
</template>

<script>
import CCheckbox from '@components:common/CCheckbox'

export default {
  name: 'c-checkbox-group',

  components: {
    CCheckbox,
    CTransition: () => import('./CTransition')
  },

  props: {
    description: { type: String },
    mainEventName: { type: String },
    itemEventName: { type: String },
    items: { type: Array, required: true }
  },

  data () {
    return {
      changes: 0,
      isChecked: true,
      showItems: false,
      internalItems: []
    }
  },

  watch: {
    items: {
      deep: true,
      immediate: true,
      handler () {
        this.internalItems = [...this.items]
      }
    },

    changes () {
      const hasUnchecked = this.internalItems.some(({ isChecked }) => !isChecked)

      this.isChecked = !hasUnchecked
    }
  },

  methods: {
    onToggleMain (v) {
      this.isChecked = v

      this.internalItems = this.internalItems.map(item => ({ ...item, isChecked: v }))

      this.$emit(this.mainEventName, {
        macro: this.description,
        isChecked: this.isChecked
      })
    },

    onToggleItem ({ isChecked, main }) {
      this.changes++

      this.$emit(this.itemEventName, {
        main,
        isChecked,
        macro: this.description
      })
    }
  }
}
</script>

<style lang="scss">
.c-checkbox-group {
  width: 100%;

  &:not(:last-child) { margin-bottom: 10px; }

  & > .items-wrapper {
    max-width: 270px;

    & > .md-checkbox { margin: 0; }

    & > .item {
      display: flex;
      align-items: center;

      height: 26px;
      background: white;
      padding: 3px 15px 3px 35px;

      & > .md-checkbox-container {
        width: 16px;
        min-width: 16px;
        height: 16px;

        &::after {
          width: 6px !important;
          height: 9px !important;
          top: 1px !important;
          left: 4px !important;
        }
      }

      & > label {
        @include truncate();
      }

      &:not(:last-child) { border-bottom: solid 1px #eff0f2; }
    }
  }
}
</style>
