<template>
  <div class="table-fixed-header">
    <div>Fundo</div>
    <div>Data da cota</div>
    <div>Mês(%)</div>
    <div>2016(%)</div>
    <div>12M(%)</div>
    <div>Aplicação mínima(R$)</div>
    <div>Prazo de resgate</div>
    <div>Aplicar</div>
  </div>
</template>

<script>
export default { name: 'table-fixed-header' }
</script>

<style lang="scss">
.table-fixed-header {
  display: grid;
  gap: 5px;
  grid-template-columns: minmax(20%, 1fr) 10% 10% 10% 10% 10% 10% 10%;

  height: 80px;
  padding: 15px;
  background: white;
  align-items: end;

  & > div {
    @include text;

    &:not(:first-child) { text-align: right; }
  }
}
</style>
