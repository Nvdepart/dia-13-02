<template>
  <div class="eurekakids-landing-page">
    <NavBar />
    <v-content>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-uppercase mb-5">Bienvenue chez Eurekakids</h1>
            <p class="subtitle-1">Le magasin pour les enfants créatifs</p>
            <v-btn class="mt-6" color="primary" to="/shop">
              Magasinez maintenant
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-10">
          <v-col cols="12" md="4" class="text-center">
            <v-img
              class="mb-6"
              :src="require('@/assets/images/icons/rocket.png')"
              width="64"
              height="64"
              transition="scale-transition"
            />
            <h2 class="text-uppercase mb-4">Produits de qualité</h2>
            <p>
              Nos produits sont soigneusement sélectionnés pour offrir une
              expérience de jeu créative et enrichissante pour les enfants de
              tous âges.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-img
              class="mb-6"
              :src="require('@/assets/images/icons/heart.png')"
              width="64"
              height="64"
              transition="scale-transition"
            />
            <h2 class="text-uppercase mb-4">Passion pour l'apprentissage</h2>
            <p>
              Nous sommes passionnés par l'apprentissage des enfants. C'est
              pourquoi nous offrons des produits qui stimulent leur créativité
              et leur curiosité naturelle.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-img
              class="mb-6"
              :src="require('@/assets/images/icons/rocket.png')"
              width="64"
              height="64"
              transition="scale-transition"
            />
            <h2 class="text-uppercase mb-4">Livraison rapide</h2>
            <p>
              Nous expédions nos produits rapidement et efficacement pour que
              vous puissiez les recevoir le plus rapidement possible.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <Footer />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.eurekakids-landing-page .v-img {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}

.eurekakids-landing-page .v-img:hover {
  transform: scale(1.2);
}
</style>
