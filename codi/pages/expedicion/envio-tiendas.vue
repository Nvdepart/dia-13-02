<template>
  <div @keyup.esc="goBack" style="text-align: center; font-size: 35px">
    <div style="padding-bottom: 50px">
      <h1>INDICAR PICKING</h1>
    </div>
    <v-row align-content-sm>
      <v-col cols="4" style="text-align: end">
        <h3>Num. :</h3>
        <br />
        <h3>Ubic. :</h3>
      </v-col>
      <v-col style="margin-right: 20px">
        <v-text-field
          id="pickingId"
          name="pickingId"
          v-model="pickingId"
          prepend-inner-icon="mdi-numeric"
          value=""
          type="number"
          outlined
          rounded
          :style="{ 'font-size': '40px' }"
          height="80"
        ></v-text-field>
        <v-text-field
          id="ubicId"
          name="ubicid"
          v-model="ubicId"
          prepend-inner-icon="mdi-numeric"
          type="number"
          outlined
          rounded
          class="text-center custom-field"
          :style="{ 'font-size': '40px' }"
          height="80"
        ></v-text-field>
        <v-btn
          @click="checkPickingExistence"
          :close-on-content-click="false"
          class="button"
          id="btPick"
          >Submit</v-btn
        >
        <v-divider></v-divider>
        <div v-if="pickingId">
          <h2>Informacion de Picking {{ picking.ID }}</h2>
          <p>Picking id: {{ pickingId }}</p>
          <p>Pda: {{ pda }}</p>
          <p>Msg: {{ user.Msg }}</p>
          <p>Ubic:{{}}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picking: null,
    };
  },
  mounted() {
    this.checkPda();
    console.log("je suis charge avec succes");
  },
  methods: {
    checkPda(state) {
      let pda = localStorage.getItem("ID");
      console.log("pda " + this.pda);
      if (pda == null) {
        window.location.href = "/initPistola";
        return false;
      } else {
        pda;
        console.log("je veux voir", pda);
        return true;
      }
    },
    checkPickingExistence() {
      this.$axios
        //        .get(`http://192.168.0.181:8080/apipda/findpicking?pickingid=${this.pickingId}`)
        .get(
          `http://127.0.0.1:8888/apipda/findpicking?pickingid=${this.pickingId}`
        )
        // http://127.0.0.1:8080/apipda/findpicking?pickingid=${this.pickingId}
        .then((response) => {
          console.log(response);
          if (response.data.Result) {
            // L'utilisateur existe, récupérez les informations de l'utilisateur
            this.pickingExists = true;
            console.log(this.pickingExists);
            this.picking = response.data;
            console.log(this.picking);

            // Ouvrez la page de menu et passez les informations de l'utilisateur en tant que paramètres d'URL
            this.$router.push({
              name: "_idPicking",
              params: { user: this.picking },
            });

            // fermer la page de recherche
            window.close();
          } else {
            // L'utilisateur n'existe pas, ouvrez la page d'authentification initiale

            this.pickingExists = false;
            this.$router.push({ name: "menu" });
            alert("el usuario no existe");
            window.close();
          }
        })

        .catch((error) => {
          console.log(error);
        });
    },
    goBack() {
      this.$router.go(-1); // Revenir à la page précédente
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/variables.scss";
.custom-field .v-input__control {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-field .v-input__control input {
  text-align: center;
  width: 100%;
  border-color: black;
}
</style>
