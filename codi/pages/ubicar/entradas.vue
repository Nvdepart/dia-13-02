<template>
  <div class="centered pa-4 ma-2">
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
            <h1>Nombre</h1>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col
            cols="4"
            :style="{ 'font-size': '18px' }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Entrega</h1>
          </v-col>
          <v-col cols="8" v-if="reception">
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
              @keydown.up.prevent="previousOption"
              @keydown.down.prevent="nextOption"
              @change="loadReferenceData"
              @keydown.enter="moveToNextCombobox"
              ref="combobox1"
            ></v-combobox>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col
            cols="4"
            :style="{ 'font-size': '18px' }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Ref :</h1>
          </v-col>
          <v-col cols="8" v-if="reception">
            <v-combobox
              v-model="selectedReference"
              :items="referenceItems"
              label="Select Reference"
              rounded
              :style="{
                'font-size': '40px',
                width: '250px',
                height: '100%',
                border: '2px solid blue',
              }"
              @keydown.up.prevent="previousOption"
              @keydown.down.prevent="nextOption"
              @change="moveToNextCombobox"
              @keydown.enter="moveToNextCombobox"
              ref="combobox2"
            ></v-combobox>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col
            cols="4"
            :style="{ 'font-size': '18px' }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Ubic :</h1>
          </v-col>
          <v-col cols="8" v-if="reception">
            <v-combobox
              :items="reception.Data"
              item-value="reception.Data.C1"
              item-text="reception.Data.C1"
              rounded
              :style="{
                'font-size': '40px',
                width: '250px',
                height: '100%',
                border: '2px solid blue',
              }"
              @keydown.up.prevent="previousOption"
              @keydown.down.prevent="nextOption"
              @change="moveToNextCombobox"
              @keydown.enter="moveToNextCombobox"
              ref="combobox3"
            ></v-combobox>
          </v-col>
        </v-row>
      </div>

      <div>
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
              v-model="textField3"
              ref="textField3"
              @keyup.enter="sendDataToServer"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <br />
      <div v-if="state">
        <h1 style="font-size: 30px; background-color: green">
          <span style="color: white">El pedido se ha bien enviado</span>
        </h1>
      </div>
    </div>
    <div v-if="reception">
      <h1 style="font-size: 20px">La liste des Pedidos de Reception</h1>
      <table class="my-table" v-if="reception">
        <thead>
          <tr>
            <th v-for="(header, index) in reception.Headers" :key="index">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in reception.Data" :key="index">
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
    albarans() {
      // get unique albarans from data
      const albarans = new Set();
      this.reception.Data.forEach((row) => albarans.add(row.C1));
      return Array.from(albarans);
    },
  },
  mounted() {
    this.checkPickingExistence();
  },
  methods: {
    previousOption() {
      if (this.reception.length && this.ExpedId !== null) {
        const index = this.reception.findIndex(
          (item) => item.ExpedId === this.ExpedId
        );
        if (index > 0) {
          this.ExpedId = this.reception[index - 1].ExpedId;
        } else {
          this.ExpedId = this.reception[this.reception.length - 1].ExpedId;
        }
      }
    },
    nextOption() {
      if (this.reception.length && this.ExpedId !== null) {
        const index = this.reception.findIndex(
          (item) => item.ExpedId === this.ExpedId
        );
        if (index < this.reception.length - 1) {
          this.ExpedId = this.reception[index + 1].ExpedId;
        } else {
          this.ExpedId = this.reception[0].ExpedId;
        }
      }
    },
    moveToNextCombobox() {
      this.$nextTick(() => {
        if (this.$refs.combobox1.focused) {
          this.$refs.combobox2.focus();
        } else if (this.$refs.combobox2.focused) {
          this.$refs.combobox3.focus();
        } else if (this.$refs.combobox3.focused) {
          this.$refs.vTextField3.focus();
        }
      });
    },

    checkPickingExistence() {
      this.$axios
        //        .get(`http://192.168.0.181:8080/apipda/findpicking?pickingid=9876543&pda=1&user=1&ubicacio=00`)
        .get(
          `http://127.0.0.1:8080/apipda/doreception?reception=000&user=1&pda=1&referencia=1301515&cantidad=24`
        )
        // http://127.0.0.1:8080/apipda/findpicking?pickingid=${this.pickingId}
        .then((response) => {
          console.log(
            "el numero de shipping se ha encontrado",
            response.data.Result
          );
          if (response.data.Result) {
            // L'utilisateur existe, récupérez les informations de l'utilisateur
            let self = this;
            self.receptionExists = true;
            console.log(self.receptionExists);
            self.reception = response.data;
            console.log("le contenu est ", self.reception.Data.C3);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadReferenceData() {
      try {
        const response = await this.$axios.get(
          `http://127.0.0.1:8080/apipda/doreception?reception=123&user=1&pda=1&referencia=1301515&cantidad=24`
        );
        this.referenceData = response.data;
        console.log("le contenu avec la Reference est ", this.referenceData);
      } catch (error) {
        console.error(error);
      }
    },
    focusTextField(ref) {
      this.$refs[ref].focus();
    },

    sendDataToServer() {
      if (
        this.combobox1 &&
        this.combobox2 &&
        this.combobox3 &&
        this.vTextField3
      ) {
        // envoyer les données au serveur
        console.log("Envoi de données au serveur:", this.textField3);
        // L'envoie avec succes
        this.state = true;

        // Réinitialiser les valeurs des champs de texte
        this.textField3 = "";
      }
    },
    handleUpDownKeys(event, ref) {
      if (event.keyCode === 38) {
        // Up arrow key
        if (this.reception.length === 0) {
          return;
        }
        const currentExpedId = this.$refs[ref].value;
        const currentIndex = this.reception.findIndex(
          (el) => el.ExpedId === currentExpedId
        );
        let newExpedId;
        if (currentIndex === -1 || currentIndex === 0) {
          newExpedId = this.reception[this.reception.length - 1].ExpedId;
        } else {
          newExpedId = this.reception[currentIndex - 1].ExpedId;
        }
        this.$refs[ref].value = newExpedId;
        this.textField3 = newExpedId;
      } else if (event.keyCode === 40) {
        // Down arrow key
        if (this.reception.length === 0) {
          return;
        }
        const currentExpedId = this.$refs[ref].value;
        const currentIndex = this.reception.findIndex(
          (el) => el.ExpedId === currentExpedId
        );
        let newExpedId;
        if (currentIndex === -1 || currentIndex === this.reception.length - 1) {
          newExpedId = this.reception[0].ExpedId;
        } else {
          newExpedId = this.reception[currentIndex + 1].ExpedId;
        }
        this.$refs[ref].value = newExpedId;
        this.textField3 = newExpedId;
      }
    },
  },
  data() {
    return {
      reception: null,
      state: false,
      textField3: "",
      ExpedID: "",
      headers: "",
      selectedAlbaran: null,
      selectedReference: null,
      referenceItems: null,
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
  border-collapse: collapse;
  text-align: center;
  justify-content: center;
}

.my-table th,
.my-table td {
  text-align: left;
  padding: 0px 40px 0px 20px;
  font-size: 30px;
}

.my-table th {
  background-color: #1d6acf;
  color: white;
}

.my-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
