<template>
  <v-row>
    <v-col align="center">
      <h3>Usuari</h3>
      <v-card>
        <v-img
          height="150px"
          src="https://images.unsplash.com/photo-1593640495253-23196b27a87f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        ></v-img>
        <v-card-title>IdUsuari :</v-card-title>
        <v-card-text>Nom Usuari :</v-card-text>
      </v-card>
      <br />
      <v-btn color="primary" :to="'/'">Home</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  /* async created() {
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
  },*/
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
