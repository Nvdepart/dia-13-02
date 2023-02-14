<template>
  <div class="d-flex flex-column align-center">
    <v-menu
      v-for="(element, index) in elements"
      :key="index"
      offset-y
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      class="mb-5"
      width="400"
      height="50"
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
          width="400"
          height="50"
          dark
          v-on="on"
        >
          {{ element.title }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, subIndex) in element.items"
          :key="subIndex"
          @click="navigateToPage(item.page)"
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="item.subtitle">
            {{ item.subtitle }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
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
  },
  data() {
    return {
      menu: [false, false, false, false], // un état pour chaque bouton
      animatedIndex: null,
      elements: [
        {
          title: "Preparar",
          items: [{ title: "Picking", page: "picking_select" }],
        },
        {
          title: "Expedir",
          items: [
            { title: "1 Expedicion", page: "" },
            { title: "Multiples", page: "Description 6" },
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
.animate__animated {
  animation-duration: 1s;
}

.animate__bounceIn {
  animation-name: animate__bounceIn;
}

@keyframes animate__bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  60% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>
