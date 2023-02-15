<template>
  <v-form @submit.prevent="login" align="center">
    <v-text-field
      v-model="email"
      label="Adresse e-mail"
      prepend-inner-icon="mdi-email"
      value=""
      outlined
      rounded
      height="50"
      class="login-field"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      prepend-inner-icon="mdi-passport-biometric"
      value=""
      outlined
      rounded
      height="50"
      class="login-field"
    ></v-text-field>
    <v-btn type="submit" color="primary">Login</v-btn>
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
<style lang="scss" scoped>
.login-field {
  background-color: rgb(0, 238, 255);
  border-color: blue;
  padding: -50px;
  margin: 30px 20px 20px 30px;
}
</style>
