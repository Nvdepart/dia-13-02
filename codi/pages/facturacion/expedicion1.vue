<template>
  <div @keyup.esc="goBack" class="centered pa-4 ma-2">
    <div>
      <h1>Envio Pedido TIENDAS</h1>
      <br />
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
              label=""
              value=""
              rounded
              :style="{
                'font-size': '35px',
                width: '250px',
                border: '2px solid blue',
              }"
              type="number"
              v-model="textField1"
              ref="textField1"
              @keyup.enter="focusTextField('textField2')"
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
              >Grande :</v-subheader
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
              @keyup.enter="focusTextField('textField4')"
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
              >Pequiño
            </v-subheader>
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
              v-model="textField4"
              ref="textField4"
              @keyup.enter="focusTextField('textField5')"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col cols="4">
            <v-subheader
              :style="{
                'font-size': '35px',
                width: '250px',
              }"
              >Palets :
            </v-subheader>
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
              v-model="textField5"
              ref="textField5"
              @keyup.enter="sendDataToServer"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <br />
      <div v-if="state">
        <h1 style="font-size: 30px; background-color: green">
          <span style="color: yellow">El pedido se ha enviado</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.checkPickingExistence;
  },
  methods: {
    checkPickingExistence() {
      this.$axios
        //        .get(`http://192.168.0.181:8080/apipda/findpicking?pickingid=9876543&pda=1&user=1&ubicacio=00`)
        .get(
          `http://127.0.0.1:8080/apipda/doshippingweb?shippingid=9876543&pda=1&user=1&box=2`
        )
        // http://127.0.0.1:8080/apipda/findpicking?pickingid=${this.pickingId}
        .then((response) => {
          console.log(
            "el numero de picking se ha encontrado",
            response.data.Result
          );
          if (response.data.Result) {
            // L'utilisateur existe, récupérez les informations de l'utilisateur
            let self = this;
            self.pickingExists = true;
            console.log(self.pickingExists);
            self.shipped = response.data;
            console.log("le numero de reference est ", self.shipped);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    focusTextField(ref) {
      this.$refs[ref].focus();
    },
    /*  focusTextField2() {
      this.$refs.textField2.focus();
    },
    focusTextField3() {
      this.$refs.textField3.focus();
    },
    focusTextField4() {
      this.$refs.textField4.focus();
    },
    focusTextField5() {
      this.$refs.textField5.focus();
    }, */
    sendDataToServer() {
      if (this.textField1 && this.textField2) {
        // envoyer les données au serveur
        console.log(
          "Envoi de données au serveur:",
          this.textField1,
          this.textField2,
          this.textField3,
          this.textField4,
          this.textField5
        );
        // L'envoie avec succes
        this.state = true;
        this.focusTextField("textField1");
        // Réinitialiser les valeurs des champs de texte

        this.textField2 = "";
        this.textField3 = "";
        this.textField4 = "";
        this.textField5 = "";
      }
    },
    goBack() {
      this.$router.go(-1); // Revenir à la page précédente
    },
  },
  data() {
    return {
      shipped: null,
      state: false,
      textField1: "",
      textField2: "",
      textField3: "",
      textField4: "",
      textField5: "",
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
</style>
