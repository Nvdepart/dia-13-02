<template>
  <v-row class="card">
    <v-col cols="6">
      <v-text-field
        clearable
        label="Usuari"
        placeholder="Enter your id de usuari"
        prepend-inner-icon="mdi-account"
        persistent-clear
        outlined
      ></v-text-field>
      <v-btn class="btn" type="submit">Iniciar</v-btn>
    </v-col>
    {{ pda }}
  </v-row>
</template>

<script>
export default {
  async created() {
    await this.$axios
      .get("localStorage")
      // Quan acabi
      .then((resposta) => {
        console.log("M'he descarregat les dades bé", resposta.pda);
        this.pda = resposta.pda;
        console.log("Opp", this.pda);
      });
  },
  data() {
    return {
      pda: [],
    };
  },
};
</script>

<style scoped>
.card {
  width: 480px;
  height: 800px;
  position: relative;
  top: 60%;
  left: 60%;
  transform: translate(-40%, -40%);
}

.btn {
  cursor: "pointer";
  background-color: primary;
  size: "large";
  border-radius: 10px;
  border: 2px solid rgb(0, 0, 0);
}
.btn:hover {
  background-color: greenyellow;
  color: rgb(27, 23, 223);
}
.v-text-field--outlined >>> fieldset {
  background: white;
  border-color: black;
  text-align: center;
  border-radius: 40px;
  display: block;
}
</style>
