<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-img src="./assets/logo.png" contain height="40" />
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/usuari">Usuari</v-btn>
    <v-btn text to="/a-propos">About</v-btn>
    <v-btn text to="/contact">Contact</v-btn>
    <v-spacer></v-spacer>
    <v-btn text v-if="!isAuthenticated" to="/login">Login</v-btn>
    <v-btn text v-if="!isAuthenticated" to="/register">Sing in</v-btn>
    <v-menu v-if="isAuthenticated" bottom left>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">{{ username }}</v-btn>
      </template>
      <v-list>
        <v-list-item to="/compte">
          <v-list-item-title>My Profil</v-list-item-title>
        </v-list-item>
        <v-list-item to="/commandes">
          <v-list-item-title>My YYY</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "EurekakidsHeader",
  data() {
    return {
      isAuthenticated: false, // remplacer par la valeur de l'authentification de l'utilisateur
      username: "Atlas Expo", // remplacer par le nom de l'utilisateur connecté
    };
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    logout() {
      // Appeler votre API pour effectuer la déconnexion
      axios
        .post("/api/logout")
        .then((response) => {
          // Supprimer les données de l'utilisateur de votre store Vuex ou de votre local storage
          this.$store.commit("clearUserData");
          // Rediriger l'utilisateur vers la page de connexion
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
