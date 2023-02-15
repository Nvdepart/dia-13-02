<template>
  <v-container fluid>
    <NavBar></NavBar>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-img src="/logo.png" height="100"></v-img>
          <v-card-title>
            <h1>EUREKAKIDS</h1>
          </v-card-title>
          <v-img
            src="https://www.eurekakids.es/cdnassets/Headers/2023/Carnaval/HEADER_carnaval-tablet-es.jpg"
            height="350"
          ></v-img>
          <v-card-text>
            <p>
              Bienvenue chez EUREKAKIDS ! Nous sommes une société spécialisée
              dans les jouets pour enfants.
            </p>
            <p>
              Notre mission est d'offrir des jouets éducatifs et amusants qui
              stimulent l'imagination et la créativité des enfants.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" href="https://www.eurekakids.es/"
              >Visitez notre site</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Footer></Footer>
  </v-container>
</template>

<script>
export default {
  name: "EurekakidsLanding",
};
</script>

<style scoped>
h1 {
  color: #0074d9;
  font-size: 4rem;
  text-align: center;
  margin-top: 3rem;
}

p {
  font-size: 1.5rem;
  text-align: justify;
  margin: 2rem;
}
</style>
