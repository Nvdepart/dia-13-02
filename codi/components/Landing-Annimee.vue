<template>
  <div class="eurekakids-landing-page">
    <NavBar />
    <v-main>
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
          <v-col cols="12" md="4">
            <v-card
              elevation="4"
              outlined
              class="mx-auto my-12 my-card"
              max-width="374"
              @mouseover="startAnimation"
              @mouseleave="stopAnimation"
            >
              <v-img
                :src="require('@/assets/images/icons/1.jpg')"
                height="320px"
                transition="scale-transition"
              />
              <v-card-title class="text-uppercase my-card-title"
                >Produits de qualité</v-card-title
              >
              <v-card-text class="my-card-text">
                Nos produits sont soigneusement sélectionnés pour offrir une
                expérience de jeu créative et enrichissante pour les enfants de
                tous âges.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card
              elevation="4"
              outlined
              class="mx-auto my-12 my-card"
              max-width="374"
              @mouseover="startAnimation"
              @mouseleave="stopAnimation"
            >
              <v-img
                :src="require('@/assets/images/icons/2.jpg')"
                height="320px"
                transition="scale-transition"
                class="d-block align-items-center"
              />
              <v-card-title class="text-uppercase my-card-title"
                >Passion pour l'apprentissage</v-card-title
              >
              <v-card-text class="my-card-text">
                Nous sommes passionnés par l'apprentissage des enfants. C'est
                pourquoi nous offrons des produits qui stimulent leur créativité
                et leur curiosité naturelle.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card
              elevation="4"
              outlined
              class="mx-auto my-12 my-card"
              max-width="374"
              @mouseover="startAnimation"
              @mouseleave="stopAnimation"
            >
              <v-img
                :src="require('@/assets/images/icons/3.jpg')"
                height="320px"
                transition="scale-transition"
              />
              <v-card-title class="text-uppercase"
                >Livraison rapide</v-card-title
              >
              <v-card-text class="my-card-text">
                Nous exv-card-textédions nos produits rapidement et efficacement
                pour que vous puissiez les recevoir le plus rapidement possible.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAnimating: false,
    };
  },
  props: {
    title: String,
    text: String,
  },
  methods: {
    startAnimation() {
      this.isAnimating = true;
    },
    stopAnimation() {
      this.isAnimating = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  display: block;
  border-radius: 10%;
  background-color: alpha($color: #000000);
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
}

.my-card:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
}

.my-card-title {
  text-align: center;
}

.my-card-text {
  text-align: center;
}
.eurekakids-landing-page .v-img {
  transition-duration: 3s;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.eurekakids-landing-page .v-img:hover {
  transform: scale(1.5);
}
</style>
