<template>
  <div>
    <label for="ubicacion">UBICACION:</label>
    <select
      id="ubicacion"
      v-model="selectedUbicacion"
      @change="onUbicacionSelected"
    >
      <option v-for="ubicacion in ubicaciones" :value="ubicacion">
        {{ ubicacion }}
      </option>
    </select>
    <table>
      <thead>
        <tr>
          <th>ALBARAN</th>
          <th>REFERENCIA</th>
          <th>UBICACION</th>
          <th>CANTIDAD</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.ubicacion">
          <td>{{ row.albaran }}</td>
          <td>{{ row.referencia }}</td>
          <td>{{ row.ubicacion }}</td>
          <td>{{ row.cantidad }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["albaran", "referencia"],
  data() {
    return {
      ubicaciones: [],
      selectedUbicacion: null,
      tableData: [],
    };
  },
  mounted() {
    // Appeler l'API pour récupérer les données de la table Ubicacion
    // en utilisant les valeurs de albaran et referencia et mettre à jour la propriété
    // ubicaciones et tableData
  },
  methods: {
    onUbicacionSelected(event) {
      const selectedUbicacion = event.target.value;
      // Émettre un événement pour indiquer que l'utilisateur a sélectionné une ubicacion
      this.$emit("ubicacion-selected", selectedUbicacion);
    },
  },
};
</script>
