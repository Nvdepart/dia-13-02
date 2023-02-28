<template>
  <div id="div0">
    <p id="estado" class="p">Indica el usuario</p>
    <div style="text-align: center">
      <v-text-field
        id="usuario"
        name="id"
        v-model="userId"
        prepend-inner-icon="mdi-account"
        value=""
        rounded
        class="text-center custom-field"
        :style="{ 'font-size': '40px', border: '2px solid blue' }"
        height="50"
        ref="textField2"
        @keyup.enter="sendDataToServer"
      ></v-text-field>
    </div>
    <br />

    <div id="divcenter">
      <v-btn
        @click="checkUserExistence"
        :close-on-content-click="false"
        class="button"
        id="btUsu"
        >Iniciar
      </v-btn>
    </div>
    <br />
    <div v-if="user">
      <h2>Informacion de usuario {{ user.ID }}</h2>
      <p>Nombre: {{ user.Name }}</p>
      <p>Resulta: {{ user.Result }}</p>
      <p>Msg: {{ user.Msg }}</p>
    </div>
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
export default {
  data() {
    return {
      userId: "",
      userExists: false,
      user: null,
      idPda: "",
      numpda: "",
    };
  },
  mounted() {
    this.checkPda();
    console.log("je suis charge");
  },
  methods: {
    checkPda(state) {
      let idPistola = localStorage.getItem("ID");
      console.log("pistola " + this.idPistola);
      if (idPistola == null) {
        window.location.href = "/initPistola";
        return false;
      } else {
        idPistola;
        console.log("je veux voir", idPistola);
        return true;
      }
    },
    checkUserExistence() {
      this.$axios
        //        .get(`http://192.168.0.181:8080/apipda/user?user=${this.userId}`)
        .get(`http://127.0.0.1:8888/apipda/user?user=${this.userId}`)
        // http://127.0.0.1:8080/apipda/user?user=1
        .then((response) => {
          console.log(response);
          if (response.data.Result) {
            // L'utilisateur existe, récupérez les informations de l'utilisateur
            this.userExists = true;
            console.log("el usuario esta disponible", this.userExists);
            this.user = response.data;
            console.log("el usuario esta disponible en este", this.user);

            // Ouvrez la page de menu et passez les informations de l'utilisateur en tant que paramètres d'URL
            this.$router.push({
              name: "menu",
              params: { user: this.user },
            });

            // fermer la page de recherche
            // window.close();
          } else {
            // L'utilisateur n'existe pas, ouvrez la page d'authentification initiale

            this.userExists = false;
            this.$router.push({ name: "initPistola" });
            alert("el usuario no existe");
            window.close();
          }
        })

        .catch((error) => {
          console.log(error);
        });
    },
    sendDataToServer() {
      if (this.userId) {
        // envoyer les données au serveur
        this.checkUserExistence();
        console.log("Envoi de données au serveur:", this.userId);

        // Réinitialiser les valeurs des champs de texte
        this.userId = "";
      }
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
