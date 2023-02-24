<template>
  <div>
    <select v-model="selectedAlbaran" @change="onAlbaranSelected">
      <option
        v-for="albaran in albarans"
        :key="albaran.albaran"
        :value="albaran.albaran"
      >
        {{ albaran.albaran }}
      </option>
    </select>
    <table class="my-table">
      <thead>
        <tr>
          <th>ALBARAN</th>
          <th>PROVEEDOR</th>
          <th>LINEAS</th>
          <th>CANTIDAD</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(albaran, index) in albarans"
          :key="index"
          v-if="albaran.albaran === selectedAlbaran"
        >
          <td>{{ albaran.C1 }}</td>
          <td>{{ albaran.C2 }}</td>
          <td>{{ albaran.C3 }}</td>
          <td>{{ albaran.C4 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albarans: [],
      selectedAlbaran: null,
    };
  },
  mounted() {
    this.getAlbaranData();
  },
  methods: {
    getAlbaranData() {
      const url =
        "http://127.0.0.1:8080/apipda/doreception?reception=000&user=1&pda=1&referencia=1301515&cantidad=24";
      this.$axios
        .get(url)
        .then((response) => {
          this.albarans = response.data.Data;
          console.log(this.albarans);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onAlbaranSelected(event) {
      const selectedAlbaran = event.target.value;
      this.selectedAlbaran = selectedAlbaran;
    },
  },
};
</script>
<style lang="scss" scoped>
.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.leftdiv {
  display: flex;
  flex-direction: row;
  justify-content: flex;
  align-items: center;
  text-align: left;
}
.rounded-number {
  height: 300px;
  width: 100px;
  border-radius: 100%;
  padding: 0;
  margin: 0;
  position: relative;
}

.number-container {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.number {
  font-size: 3rem;
  font-weight: bold;
  color: white;
}
.my-table {
  width: 100%;
  max-width: 460px;
  border-collapse: collapse;
  text-align: center;
  justify-content: center;
}

.my-table th,
.my-table td {
  text-align: left;
  padding: 0px 10px 0px 10px;
  font-size: 20px;
}

.my-table th {
  background-color: #1d6acf;
  color: white;
}

.my-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
