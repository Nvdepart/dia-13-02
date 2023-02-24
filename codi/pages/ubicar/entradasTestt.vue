<template>
  <div>
    <component
      :is="currentComponent"
      :albaran="selectedAlbaran"
      :referencia="selectedReferencia"
      :ubicacion="selectedUbicacion"
      @albaran-selected="onAlbaranSelected"
      @referencia-selected="onReferenciaSelected"
    />
  </div>
</template>

<script>
//import Albaran from "./Albaran.vue";
// import Referencia from "@/Entradas/Referencia.vue";
// import Ubicacion from "@/Entradas/Ubicacion.vue";

export default {
  //components: {
  // Albaran,
  //     Referencia,
  //     Ubicacion,
  // },
  data() {
    return {
      currentComponent: "Albaran",
      selectedAlbaran: null,
      selectedReferencia: null,
      selectedUbicacion: null,
    };
  },
  methods: {
    onAlbaranSelected(value) {
      this.selectedAlbaran = value;
      this.currentComponent = "Referencia";
    },
    onReferenciaSelected(value) {
      this.selectedReferencia = value;
      this.currentComponent = "Ubicacion";
    },
  },
};
</script>
