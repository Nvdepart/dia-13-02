<template>
  <div style="text-align: center; font-size: 35px; padding-bottom: 50px">
    <div>
      <h1>INDICAR PICKING</h1>
    </div>
    <v-row>
      <v-col cols="4" class="pa-4 ma-4">
        <h3>Num. :</h3>
        <h3>Ubic. :</h3>
      </v-col>
      <v-col style="margin: auto 20px 20px 20px; padding: auto 20px">
        <v-text-field
          id="pickingId"
          name="pickingId"
          v-model="pickingId"
          prepend-inner-icon="mdi-numeric"
          value=""
          type="number"
          rounded
          :style="{ 'font-size': '40px', border: '1px solid blue' }"
          height="40"
        ></v-text-field>
        <v-text-field
          id="ubicId"
          name="ubicid"
          v-model="ubicId"
          prepend-inner-icon="mdi-numeric"
          type="number"
          rounded
          :style="{ 'font-size': '40px', border: '1px solid blue' }"
          height="40"
        ></v-text-field>
        <v-btn
          @click="checkPickingExistence()"
          :close-on-content-click="false"
          class="button"
          id="btPick"
          >Submit</v-btn
        >
        <v-divider></v-divider>
        <div v-if="picking">
          <p>Picking id: {{ pickingId }}</p>
          <p>Pda: {{ pda }}</p>
          <p>Msg: {{ picking.Msg }}</p>
          <p>Ubic: {{ picking.Ubic }}</p>
          <p>Id: {{ picking.ID }}</p>
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
      pickingId: "",
      ubicId: null,
      pda: "",
    };
  },
  mounted() {
    this.checkPda();
    console.log("je suis charge avec succes");
    console.log("la PDA trouvee est :", this.pda);
  },
  methods: {
    checkPda(state) {
      let pda = localStorage.getItem("ID");
      console.log("pda " + this.pda);
      if (pda == null) {
        window.location.href = "/initPistola";
        return false;
      } else {
        this.pda = pda;
        console.log("je veux voir la pda", this.pda);
        return true;
      }
    },
    checkPickingExistence() {
      this.$axios
        //        .get(`http://192.168.0.181:8080/apipda/findpicking?pickingid=9876543&pda=1&user=1&ubicacio=00`)
        .get(
          `http://127.0.0.1:8080/apipda/findpicking?pickingid=${this.pickingId}&pda=1&user=1&ubicacio=00`
        )
        // http://127.0.0.1:8080/apipda/findpicking?pickingid=${this.pickingId}
        .then((response) => {
          console.log(response);
          if (response.data.Result) {
            // L'utilisateur existe, récupérez les informations de l'utilisateur
            this.pickingExists = true;
            console.log(this.pickingExists);
            this.picking = response.data;
            console.log("le numero de reference est ", this.picking);
            console.log("le Idpicking est", this.pickingId);
            let pickingIdVue = parseInt("this.pickingId");
            console.log("le IdVue est", this.pickingIdVue);

            // Ouvrez la page de menu et passez les informations de l'utilisateur en tant que paramètres d'URL
            this.$router.push({
              path: `/expedicion/_pickingIdVue`,
              params: { picking: this.pickingIdVue },
            });

            // fermer la page de recherche
            window.close();
          } else {
            // L'utilisateur n'existe pas, ouvrez la page d'authentification initiale

            this.pickingExists = false;
            this.$router.push({ name: "picking" });
            alert("el usuario no existe");
            window.close();
          }
        })

        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/variables.scss";
</style>
