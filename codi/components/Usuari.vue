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
        outlined
        rounded
        height="50"
      ></v-text-field>
    </div>
    <v-btn
      @click="checkUserExistence"
      :close-on-content-click="false"
      class="button"
      id="btUsu"
      >Iniciar</v-btn
    >
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
    };
  },
  methods: {
    checkUserExistence() {
      this.$axios
        //        .get(`http://192.168.0.181:8080/apipda/user?user=${this.userId}`)
        .get(`http://127.0.0.1:8080/apipda/user?user=${this.userId}`)
        // http://127.0.0.1:8080/apipda/user?user=1
        .then((response) => {
          console.log(response);
          if (response.data) {
            // L'utilisateur existe, récupérez les informations de l'utilisateur
            this.userExists = true;
            console.log(this.userExists);
            this.user = response.data;
            console.log(this.user);

            // Ouvrez la page de menu et passez les informations de l'utilisateur en tant que paramètres d'URL
            this.$router.push({
              name: "menu",
              params: { userId: this.user.ID },
            });
            // fermer la page de recherche
            window.close();
          } else {
            // L'utilisateur n'existe pas, ouvrez la page d'authentification initiale

            this.userExists = false;
            this.$router.push({ name: "initPistola" });
            console.log("el usuario no existe");
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
