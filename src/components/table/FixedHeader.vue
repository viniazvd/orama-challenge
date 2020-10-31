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
  gap: 5px;
  display: grid;
  align-items: end;
  grid-template-columns: minmax(20%, 1fr) repeat(7, 10%);

  height: 80px;
  padding: 0 20px 15px;
  background: white;

  & > div {
    @include text;

    &:not(:first-child) { text-align: right; }
  }
}
</style>
