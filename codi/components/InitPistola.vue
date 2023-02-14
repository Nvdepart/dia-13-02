<template>
  <div id="div0">
    <p id="estado" class="p">
      Indique el código de la PDA <br />
      para iniciar la pistola
    </p>
    <div style="text-align: center">
      <v-text-field
        id="numpda"
        name="id"
        value="123456"
        prepend-inner-icon="mdi-remote"
        outlined
        rounded
        height="50"
      ></v-text-field>
    </div>
    <p><v-btn class="button" id="btPDA">Iniciar</v-btn></p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "/assets/variables.scss";
</style>
