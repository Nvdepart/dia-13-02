<template>
  <div>
    <v-btn class="accordion">Preparar</v-btn>
    <div class="panel">
      <v-btn
        type="submit"
        class="accordion2"
        id="Picking"
        onclick="window.location.href='/picking_select'"
      >
        Picking
      </v-btn>
    </div>
    <v-btn class="accordion">Expedir</v-btn>
    <div class="panel">
      <v-btn class="accordion2">1 expedición</v-btn>
      <v-btn class="accordion2">Multiples</v-btn>
    </div>
    <v-btn class="accordion">Ubicar</v-btn>
    <div class="panel">
      <v-btn
        type="submit"
        onclick="window.location.href='/reponer';"
        class="accordion2"
      >
        Reponer
      </v-btn>
      <v-btn class="accordion2">Entradas</v-btn>
      <v-btn class="accordion2">Reubicar</v-btn>
      <v-btn class="accordion2">Reubicar Toynamics</v-btn>
    </div>
    <v-btn class="accordion">Devoluciones</v-btn>
    <div class="panel">
      <v-btn class="accordion2">Palet/Caja/Producto</v-btn>
      <v-btn class="accordion2">Info Palet Caja</v-btn>
      <v-btn class="accordion2">Palet/Producto/Caja</v-btn>
      <v-btn class="accordion2">Palet/Caja</v-btn>
    </div>
    <v-btn class="accordion">Packing</v-btn>
    <div class="panel">
      <v-btn class="accordion2">Palet/Caja/Producto</v-btn>
      <v-btn class="accordion2">Info Palet Caja</v-btn>
      <v-btn class="accordion2">Palet/Producto/Caja</v-btn>
      <v-btn class="accordion2">Palet/Caja</v-btn>
    </div>
    <v-btn class="accordion">Pesos</v-btn>
    <div class="panel">
      <v-btn class="accordion2">Unidad/Inner/Master</v-btn>
      <v-btn class="accordion2">Unidad</v-btn>
      <v-btn class="accordion2">Inner</v-btn>
      <v-btn class="accordion2">Master</v-btn>
    </div>
    <v-btn class="accordion">Tareas</v-btn>
    <div class="panel">
      <v-btn class="accordion2">Tareas</v-btn>
    </div>
    <v-btn class="accordion">Inventario</v-btn>
    <div class="panel">
      <v-btn class="accordion2">Inventario</v-btn>
      <v-btn class="accordion2">Ubic Vacias</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  /* mounted() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        var panels = document.getElementsByClassName("panel");
        for (j = 0; j < panels.length; j++) {
          panels[j].style.display = "none";
        }
        var acc2 = document.getElementsByClassName("accordion");
        for (k = 0; k < panels.length; k++) {
          acc2[k].classList.remove("active");
        }

        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        //    if (panel.style.display === "block") {
        //      panel.style.display = "none";
        //    } else {
        panel.style.display = "block";
        //    }
      });
    }
  },
};*/
};
</script>

<style lang="scss" scoped>
@import "assets/variables.scss";
</style>
