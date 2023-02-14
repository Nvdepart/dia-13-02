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
    <v-btn @click="checkUserExistence" class="button" id="btUsu">Iniciar</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      userExists: false,
    };
  },
  methods: {
    checkUserExistence() {
      axios
        .get(`/users/${this.userId}`)
        .then((response) => {
          if (response.data.exists) {
            // L'utilisateur existe, récupérez les informations de l'utilisateur
            this.userExists = true;
            const user = response.data.user;

            // Ouvrez la page de menu et passez les informations de l'utilisateur en tant que paramètres d'URL
            this.$router.push({ name: "menu", params: { user } });
          } else {
            // L'utilisateur n'existe pas, ouvrez la page d'authentification initiale

            this.userExists = false;
            this.$router.push({ name: "initPistola" });
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
