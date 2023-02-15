<template>
  <v-form @submit.prevent="login">
    <v-text-field v-model="email" label="Adresse e-mail"></v-text-field>
    <v-text-field
      v-model="password"
      label="Mot de passe"
      type="password"
    ></v-text-field>
    <v-btn type="submit" color="primary">Se connecter</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Appeler votre API pour effectuer l'authentification de l'utilisateur
      axios
        .post("/api/login", { email: this.email, password: this.password })
        .then((response) => {
          // Enregistrer les données de l'utilisateur dans votre store Vuex ou votre local storage
          this.$store.commit("setUserData", response.data);
          // Rediriger l'utilisateur vers la page d'accueil
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
