<template>
  <div id="div0">
    <p id="estado" class="p">Indica el usuario</p>
    <div style="text-align: center">
      <v-text-field
        id="usuario"
        name="id"
        prepend-inner-icon="mdi-account"
        value=""
        outlined
        rounded
        height="50"
      ></v-text-field>
    </div>
    <v-btn class="button" id="btUsu">Iniciar</v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "/assets/variables.scss";
</style>
