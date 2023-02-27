<template>
  <div class="centered pa-4 ma-2" @keyup.esc="goBack">
    <div>
      <h1 style="font-size: 40px">Entradas</h1>
      <br />
      <div>
        <v-row>
          <v-col
            cols="4"
            :style="{
              'font-size': '18px',
            }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Nombre</h1>
          </v-col>
          <v-col cols="8" :style="{ 'font-size': '25px' }">
            <h1>{{ mensage }}</h1>
          </v-col>
        </v-row>
      </div>

      <div v-if="albarans.length">
        <v-row>
          <v-col
            cols="4"
            :style="{ 'font-size': '18px' }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Entrega</h1>
          </v-col>
          <v-col cols="8">
            <v-combobox
              v-model="selectedAlbaran"
              :items="albarans"
              label="Select Albaran"
              rounded
              :style="{
                'font-size': '40px',
                width: '250px',
                height: '100%',
                border: '2px solid blue',
              }"
              @keydown.enter.prevent="moveToNextInput($event, $refs.combobox2)"
              @change="loadReferenceData"
              ref="combobox1"
            ></v-combobox>
          </v-col>
        </v-row>
      </div>

      <div v-if="references.length">
        <v-row>
          <v-col
            cols="4"
            :style="{ 'font-size': '18px' }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Ref :</h1>
          </v-col>
          <v-col cols="8">
            <v-combobox
              v-model="selectedReference"
              :items="references"
              label="Select Reference"
              rounded
              :style="{
                'font-size': '40px',
                width: '250px',
                height: '100%',
                border: '2px solid blue',
              }"
              @keydown.enter.prevent="moveToNextInput($event, $refs.combobox3)"
              @change="loadUbicaciones(selectedReference)"
              ref="combobox2"
            ></v-combobox>
          </v-col>
        </v-row>
      </div>

      <div v-if="ubicaciones.length">
        <v-row>
          <v-col
            cols="4"
            :style="{ 'font-size': '18px' }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Ubic :</h1>
          </v-col>
          <v-col cols="8">
            <v-combobox
              v-model="selectedUbicacion"
              :items="ubicaciones"
              label="Ubicación"
              rounded
              :style="{
                'font-size': '40px',
                width: '250px',
                height: '100%',
                border: '2px solid blue',
              }"
              @keydown.enter.prevent="moveToNextInput($event, $refs.textField1)"
              ref="combobox3"
            ></v-combobox>
          </v-col>
        </v-row>
      </div>

      <div v-if="ubicaciones.length">
        <v-row>
          <v-col
            cols="4"
            :style="{ 'font-size': '18px' }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Cantidad</h1>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label=""
              value=""
              rounded
              :style="{
                'font-size': '40px',
                width: '250px',
                border: '2px solid blue',
              }"
              type="number"
              v-model="inputValue"
              ref="textField1"
              @keyup.enter="sendValueToServer"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      -->
      <br />
      <div v-if="owner">
        <h1 style="font-size: 30px; background-color: green">
          <span style="color: white">{{ owner }}</span>
        </h1>
      </div>
    </div>
    <div v-if="tableData">
      <h1 style="font-size: 20px">La liste des Pedidos de tableData</h1>
      <table class="my-table" v-if="tableData">
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="(cell, key) in row" :key="key">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dataFiltered() {
      if (this.selectedReference) {
        return this.tableData.filter(
          (item) => item.C2 === this.selectedReference
        );
      } else {
        return this.tableData;
      }
    },
  },
  async created() {
    const response = await this.$axios.get(
      "http://127.0.0.1:8080/apipda/doreception?reception=000&user=1&pda=1&referencia=1301515&cantidad=24"
    );
    this.tableData = response.data.Data;
    this.mensage = response.data.Msg;
    this.headers = response.data.Headers;
    console.log("la premiere table", this.tableData);
    this.albarans = this.tableData.map((item) => item.C1);
  },
  methods: {
    changeOption(ref, direction) {
      const items = this.$refs[ref].items;
      if (items.length && this[ref] !== null) {
        const index = items.findIndex((item) => item === this[ref]);
        let newIndex = direction === "previous" ? index - 1 : index + 1;
        if (newIndex < 0) newIndex = items.length - 1;
        if (newIndex >= items.length) newIndex = 0;
        this[ref] = items[newIndex];
      }
    },

    moveToNextInput(event, nextInputRef) {
      if (event.target === event.currentTarget && event.key === "Enter") {
        if (nextInputRef && typeof nextInputRef.focus === "function") {
          this.$nextTick(() => nextInputRef.focus());
        } else {
          console.warn(`Invalid nextInputRef: ${nextInputRef}`);
        }
      }
    },
    changeTextValue(ref, value) {
      this[ref] = value;
    },
    goBack() {
      this.$router.go(-1); // Revenir à la page précédente
    },
    async loadReferenceData() {
      const response = await this.$axios.get(
        `http://127.0.0.1:8080/apipda/doreception?reception=123&user=1&pda=1&albaran=${this.selectedAlbaran}&cantidad=24`
      );
      this.tableData = response.data.Data;
      this.mensage = response.data.Msg;
      this.headers = response.data.Headers;
      console.log("la deuxieme table", this.tableData);
      this.references = [...new Set(this.tableData.map((item) => item.C1))];
      this.selectedReference = "";
    },
    filterDataByReference() {
      this.tableData = this.dataFiltered;
    },
    loadUbicaciones(referencia) {
      this.$axios
        .get(
          `http://127.0.0.1:8080/apipda/doreception?reception=123&user=1&pda=1&referencia=1301515&cantidad=24`
        )
        .then((response) => {
          this.tableData = response.data.Data;
          this.ubicaciones = response.data.Data;
          this.mensage = response.data.Msg;
          this.headers = response.data.Headers;
          this.owner = response.data.Owner;
          console.log("la troisieme table", this.tableData);
          this.ubicaciones = [
            ...new Set(this.tableData.map((item) => item.C1)),
          ];
          this.selectedUbicacion = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sendValueToServer() {
      this.$axios
        .post("/api/my-endpoint", { value: this.inputValue })
        .then((response) => {
          console.log(response.data);
          console.log(
            this.selectedAlbaran,
            this.selectedReference,
            this.selectedUbicacion,
            this.inputValue
          );
          this.inputValue = "";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // sendDataToServer() {
    //   if (
    //     this.combobox1 &&
    //     this.combobox2 &&
    //     this.combobox3 &&
    //     this.vTextField3
    //   ) {
    //     // envoyer les données au serveur
    //     console.log(
    //       "Envoi de données au serveur:",
    //       this.combobox1,
    //       this.combobox2,
    //       this.combobox3,
    //       this.textField3
    //     );
    //     // L'envoie avec succes
    //     this.state = true;

    //     // Réinitialiser les valeurs des champs de texte
    //     this.textField3 = "";
    //   }
    // },
    // handleUpDownKeys(event, ref) {
    //   if (event.keyCode === 38) {
    //     // Up arrow key
    //     if (this.reception.length === 0) {
    //       return;
    //     }
    //     const currentExpedId = this.$refs[ref].value;
    //     const currentIndex = this.reception.findIndex(
    //       (el) => el.ExpedId === currentExpedId
    //     );
    //     let newExpedId;
    //     if (currentIndex === -1 || currentIndex === 0) {
    //       newExpedId = this.reception[this.reception.length - 1].ExpedId;
    //     } else {
    //       newExpedId = this.reception[currentIndex - 1].ExpedId;
    //     }
    //     this.$refs[ref].value = newExpedId;
    //     this.textField3 = newExpedId;
    //   } else if (event.keyCode === 40) {
    //     // Down arrow key
    //     if (this.reception.length === 0) {
    //       return;
    //     }
    //     const currentExpedId = this.$refs[ref].value;
    //     const currentIndex = this.reception.findIndex(
    //       (el) => el.ExpedId === currentExpedId
    //     );
    //     let newExpedId;
    //     if (currentIndex === -1 || currentIndex === this.reception.length - 1) {
    //       newExpedId = this.reception[0].ExpedId;
    //     } else {
    //       newExpedId = this.reception[currentIndex + 1].ExpedId;
    //     }
    //     this.$refs[ref].value = newExpedId;
    //     this.textField3 = newExpedId;
    //   }
    // },
  },
  data() {
    return {
      headers: [],
      tableData: [],
      albarans: [],
      references: [],
      ubicaciones: [],
      state: false,
      inputValue: "",
      mensage: "",
      owner: "",
      selectedAlbaran: null,
      selectedReference: null,
      selectedUbicacion: null,
    };
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
