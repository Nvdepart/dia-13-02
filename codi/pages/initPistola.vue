<template>
  <div id="div0">
    <p id="estado" class="p">
      Indique el código de la PDA <br />
      para iniciar la pistola
    </p>
    <div style="text-align: center">
      <v-text-field
        id="numPda"
        v-model="numpda"
        name="NumPDA"
        value="1"
        prepend-inner-icon="mdi-remote"
        outlined
        rounded
        height="50"
      ></v-text-field>
    </div>
    <p>
      <v-btn :disabled="!numpda" @click="onSubmit" class="button" id="btPDA"
        >Iniciar</v-btn
      >
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      localStorage.setItem("ID", this.numpda);
      this.$router.push({
        name: "usuari",
        params: {
          id: "ID",
          value: this.numpda,
        },
      });
    },
  },

  data() {
    return {
      numpda: "",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/variables.scss";
</style>
