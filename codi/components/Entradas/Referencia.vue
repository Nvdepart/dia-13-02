<template>
  <div>
    <label for="referencia">REFERENCIA:</label>
    <select
      id="referencia"
      v-model="selectedReferencia"
      @change="onReferenciaSelected"
    >
      <option v-for="referencia in referencias" :value="referencia">
        {{ referencia }}
      </option>
    </select>
    <table>
      <thead>
        <tr>
          <th>ALBARAN</th>
          <th>REFERENCIA</th>
          <th>LINEAS</th>
          <th>CANTIDAD</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.referencia">
          <td>{{ row.albaran }}</td>
          <td>{{ row.referencia }}</td>
          <td>{{ row.lineas }}</td>
          <td>{{ row.cantidad }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["albaran"],
  data() {
    return {
      referencias: [],
      selectedReferencia: null,
      tableData: [],
    };
  },
  mounted() {
    // Appeler l'API pour récupérer les données de la table Referencia
    // en utilisant la valeur de albaran et mettre à jour la propriété
    // referencias et tableData
    this.getReferenciaData();
  },
  methods: {
    getReferenciaData() {
      const url =
        "http://127.0.0.1:8080/apipda/doreception?reception=123&user=1&pda=1";
      if (this.selectedAlbaran !== null) {
        url += "&albaran=" + this.selectedAlbaran;
      }
      if (this.selectedReferencia !== null) {
        url += "&referencia=" + this.selectedReferencia;
      }
      this.$axios
        .get(url)
        .then((response) => {
          this.referencia = response.data.referencia;
          this.tableData = response.data.tableData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onReferenciaSelected(event) {
      const selectedReferencia = event.target.value;
      // Émettre un événement pour indiquer que l'utilisateur a sélectionné une référence
      this.$emit("referencia-selected", selectedReferencia);
    },
  },
};
</script>
