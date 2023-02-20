<template>
  <div class="d-flex flex-column menu">
    <v-menu
      v-for="(element, index) in elements"
      :key="index"
      offset-y
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      width="380"
      height="100"
      class="mb-5"
      @click="toggleMenu(index)"
      :class="{
        animate__animated: animatedIndex === index,
        animate__bounceIn: animatedIndex === index,
      }"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          class="mb-3"
          width="380"
          height="70"
          dark
          style="border-radius: 16px; color: white; font-size: 30px"
          v-on="on"
        >
          {{ element.title }}
        </v-btn>
      </template>
      <v-list style="border-radius: 16px">
        <v-list-item
          v-for="(item, subIndex) in element.items"
          :key="subIndex"
          @click="navigateToPage(item.page)"
          class="list-item"
          style="color: white"
          ><v-list-item-content>
            <v-list-item-title style="font-size: 30px">
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="item.subtitle">
              {{ item.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <hr />
    <div v-if="user" class="cardiv">
      <h4>Id Usuario : {{ user.ID }}</h4>
      <p>
        El nombre de usuario : <strong>{{ user.Name }}</strong>
      </p>
      <p>
        IdPistola es: <strong>{{ idPistolaM }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.checkPda();
    console.log("je suis charge");
  },
  created() {
    // Récupérez l'utilisateur à partir des paramètres de la route

    this.user = this.$route.params.user;
    console.log(this.user);
  },

  methods: {
    navigateToPage(page) {
      this.$router.push(page);
    },
    toggleMenu(index) {
      this.animatedIndex = index;
      this.menu[index] = !this.menu[index];
      setTimeout(() => {
        this.animatedIndex = null;
      }, 1000);
    },
    checkPda(state) {
      let idPistola = localStorage.getItem("ID");
      console.log("pistola " + idPistola);
      if (idPistola == null) {
        window.location.href = "/initPistola";
        return false;
      } else {
        this.idPistolaM = idPistola;
        console.log("je veux voir la valeur de id Pistola", this.idPistolaM);
        return true;
      }
    },
  },
  data() {
    return {
      menu: [false, false, false, false, false, false, false, false], // un état pour chaque bouton
      animatedIndex: null,
      user: {},
      idPistolaM: "",
      elements: [
        {
          title: "Preparar",
          items: [{ title: "Picking", page: "picking" }],
        },
        {
          title: "Expedir",
          items: [
            { title: "1 Expedicion", page: "" },
            { title: "Multiples", page: "" },
          ],
        },
        {
          title: "Ubicar",
          items: [
            { title: "Reponer", page: "/reponer" },
            { title: "Entradas", page: "Description 6" },
            { title: "Reubicar", page: "Description 5" },
            { title: "Reubicar Toynamics", page: "Description 6" },
          ],
        },
        {
          title: "Devoluciones",
          items: [
            { title: "Palet/Caja/Producto", page: "Description 7" },
            { title: "Info Palet Caja", page: "Description 8" },
            { title: "Palet/Producto/Caja", page: "Description 9" },
            { title: "Palet/Caja", page: "Description 10" },
          ],
        },
        {
          title: "Packing",
          items: [
            { title: "Palet/Caja/Producto", page: "Description 7" },
            { title: "Info Palet Caja", page: "Description 8" },
            { title: "Palet/Producto/Caja", page: "Description 9" },
            { title: "Palet/Caja", page: "Description 10" },
          ],
        },
        {
          title: "Pesos",
          items: [
            { title: "Unidad/Inner/Master", page: "Description 7" },
            { title: "Unidad", page: "Description 8" },
            { title: "Inner", page: "Description 9" },
            { title: "Master", page: "Description 10" },
          ],
        },
        {
          title: "Tareas",
          items: [{ title: "Tareas", page: "Description 7" }],
        },
        {
          title: "Inventario",
          items: [
            { title: "Inventario", page: "Description 7" },
            { title: "Ubic Vacias", page: "Description 8" },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "assets/variables.scss";
.menu {
  width: 460px;
  height: 800px;
  max-width: 480px;
  max-height: 800px;
  align-content: center;
  margin: 20px auto;
}
.list-item {
  border-radius: 16px;
  margin: 4px;
  background-color: rgba(0, 0, 255, 0.8);
  text-align: center;
  font-size: 100px;
}
.list-item :hover {
  border-radius: 16px;
  margin: 4px;
  background-color: rgba(0, 153, 255, 0.8);
  color: rgb(187, 19, 202);
  text-align: center;
  font-size: 40px;
}
.cardiv {
  padding: 10px;
  margin: 10px;
  border-radius: 10%;
  background-color: rgb(0, 153, 255);
  width: 230px;
  color: blanchedalmond;
}
</style>
