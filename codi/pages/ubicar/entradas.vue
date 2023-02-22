<template>
  <div class="centered pa-4 ma-2">
    <div>
      <h1>Envio Pedido TIENDAS</h1>
      <br />
      <v-select
        v-model="ExpedId"
        :items="NoShipped"
        item-value="ExpedId"
        item-text="ExpedId"
        label="ExpedId"
        outlined
        dense
        @keydown.up.prevent="previousOption"
        @keydown.down.prevent="nextOption"
      ></v-select>
      <div class="leftdiv">
        <v-row>
          <v-col cols="4">
            <v-subheader
              :style="{
                'font-size': '35px',
                width: '250px',
              }"
              >Mesa :</v-subheader
            >
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="ID"
              value=""
              rounded
              :style="{
                'font-size': '35px',
                width: '250px',
                border: '2px solid blue',
              }"
              type="number"
              v-model="textField1"
              @keyup.enter="focusTextField('textField2')"
              @keydown.up.prevent="getPreviousExpedID()"
              @keydown.down.prevent="getNextExpedID()"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <div class="leftdiv">
        <v-row>
          <v-col cols="4">
            <v-subheader
              :style="{
                'font-size': '35px',
                width: '250px',
              }"
              >Pedido :</v-subheader
            >
          </v-col>
          <br />
          <v-col cols="8">
            <v-text-field
              label=""
              value=""
              rounded
              :style="{
                'font-size': '35px',
                width: '250px',
                border: '2px solid blue',
              }"
              type="number"
              v-model="textField2"
              ref="textField2"
              @keyup.enter="focusTextField('textField3')"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <div class="leftdiv">
        <v-row>
          <v-col cols="4">
            <v-subheader
              :style="{
                'font-size': '35px',
                width: '250px',
              }"
              >Bultor :</v-subheader
            >
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
    getPreviousExpedID() {
      if (this.NoShipped.length > 0) {
        const index = this.NoShipped.findIndex(
          (element) => element.ExpedId === this.ExpedID
        );
        if (index > 0) {
          this.ExpedID = this.NoShipped[index - 1].ExpedId;
        }
      }
    },

    getNextExpedID() {
      if (this.NoShipped.length > 0) {
        const index = this.NoShipped.findIndex(
          (element) => element.ExpedId === this.ExpedID
        );
        if (index >= 0 && index < this.NoShipped.length - 1) {
          this.ExpedID = this.NoShipped[index + 1].ExpedId;
        }
      }
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
      if (this.textField1 && this.textField2) {
        // envoyer les données au serveur
        console.log(
          "Envoi de données au serveur:",
          this.textField1,
          this.textField2,
          this.textField3
        );
        // L'envoie avec succes
        this.state = true;

        // Réinitialiser les valeurs des champs de texte
        this.focusTextField("textField2");
        this.textField2 = "";
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
        this.textField1 = newExpedId;
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
        this.textField1 = newExpedId;
      }
    },
  },
  data() {
    return {
      NoShipped: [],
      state: false,
      textField1: "",
      textField2: "",
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
