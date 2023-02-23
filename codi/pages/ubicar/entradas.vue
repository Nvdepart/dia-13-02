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
          <v-col cols="8">
            <v-combobox
              :items="NoShipped"
              item-value="ExpedId"
              item-text="ExpedId"
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
          <v-col cols="8">
            <v-combobox
              :items="NoShipped"
              item-value="ExpedId"
              item-text="ExpedId"
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
          <v-col cols="8">
            <v-combobox
              :items="NoShipped"
              item-value="ExpedId"
              item-text="ExpedId"
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
    <div v-if="NoShipped">
      <h1 style="font-size: 20px">La liste des Pedidos NoShipped</h1>
      <table class="my-table">
        <thead>
          <tr>
            <th>ExpedId</th>
            <th>Shop</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(element, index) in NoShipped" :key="index">
            <td>{{ element.ExpedId }}</td>
            <td>{{ element.Shop }}</td>
            <td>{{ element.Order }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.checkPickingExistence();
  },
  methods: {
    previousOption() {
      if (this.NoShipped.length && this.ExpedId !== null) {
        const index = this.NoShipped.findIndex(
          (item) => item.ExpedId === this.ExpedId
        );
        if (index > 0) {
          this.ExpedId = this.NoShipped[index - 1].ExpedId;
        } else {
          this.ExpedId = this.NoShipped[this.NoShipped.length - 1].ExpedId;
        }
      }
    },
    nextOption() {
      if (this.NoShipped.length && this.ExpedId !== null) {
        const index = this.NoShipped.findIndex(
          (item) => item.ExpedId === this.ExpedId
        );
        if (index < this.NoShipped.length - 1) {
          this.ExpedId = this.NoShipped[index + 1].ExpedId;
        } else {
          this.ExpedId = this.NoShipped[0].ExpedId;
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
          `http://127.0.0.1:8080/apipda/doshippingweb?shippingid=9876543&pda=1&user=1&box=2`
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
            self.pickingExists = true;
            console.log(self.pickingExists);
            self.NoShipped = response.data.NoShipped;
            console.log("le numero de reference est ", self.NoShipped);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
        if (this.NoShipped.length === 0) {
          return;
        }
        const currentExpedId = this.$refs[ref].value;
        const currentIndex = this.NoShipped.findIndex(
          (el) => el.ExpedId === currentExpedId
        );
        let newExpedId;
        if (currentIndex === -1 || currentIndex === 0) {
          newExpedId = this.NoShipped[this.NoShipped.length - 1].ExpedId;
        } else {
          newExpedId = this.NoShipped[currentIndex - 1].ExpedId;
        }
        this.$refs[ref].value = newExpedId;
        this.textField3 = newExpedId;
      } else if (event.keyCode === 40) {
        // Down arrow key
        if (this.NoShipped.length === 0) {
          return;
        }
        const currentExpedId = this.$refs[ref].value;
        const currentIndex = this.NoShipped.findIndex(
          (el) => el.ExpedId === currentExpedId
        );
        let newExpedId;
        if (currentIndex === -1 || currentIndex === this.NoShipped.length - 1) {
          newExpedId = this.NoShipped[0].ExpedId;
        } else {
          newExpedId = this.NoShipped[currentIndex + 1].ExpedId;
        }
        this.$refs[ref].value = newExpedId;
        this.textField3 = newExpedId;
      }
    },
  },
  data() {
    return {
      NoShipped: [],
      state: false,
      textField3: "",
      ExpedID: "",
      headers: [
        { text: "ExpedId", value: "ExpedId" },
        { text: "Shop", value: "Shop" },
        { text: "Order", value: "Order" },
      ],
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
