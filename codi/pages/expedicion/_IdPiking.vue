<template>
  <div class="centered pa-4 ma-2">
    <div v-if="picking">
      <h1>PICKING : {{ picking.PickingId }}</h1>
      <h1>TIENDA: {{ picking.Msg }}</h1>
      <h1>NOMBRE : {{ picking.Nombre }}</h1>
      <h1>REFERENCIA : {{ picking.Referencia }}</h1>
      <br />
      <div>
        <v-btn class="rounded-number" color="green" dark
          ><div class="number-container">
            <span class="number">{{ picking.Ubic1 }}</span>
          </div>
        </v-btn>
        <v-btn class="rounded-number" color="red" dark
          ><div class="number-container">
            <span class="number">{{ picking.Ubic2 }}</span>
          </div>
        </v-btn>
        <v-btn class="rounded-number" style="background-color: gray"
          ><div class="number-container">
            <span class="number">{{ picking.Ubic3 }}</span>
          </div>
        </v-btn>
        <v-btn class="rounded-number" style="background-color: #9f1412"
          ><div class="number-container">
            <span class="number">{{ picking.Ubic4 }}</span>
          </div>
        </v-btn>
        <br />
        <br />
        <h1 style="font-size: 50px">
          <span style="color: yellow">{{ picking.Cogido }}</span> /
          <span style="color: red">{{ picking.Total }}</span>
        </h1>
        <br />
      </div>
      <div class="leftdiv">
        <h1>Unid:</h1>
        <v-text-field
          rounded
          value="+1"
          :style="{
            'font-size': '40px',
            width: '250px',
            border: '2px solid blue',
          }"
          height="60"
          ref="textField1"
          v-model="textField1"
          @keyup.enter="focusTextField('textField2')"
        ></v-text-field>

        <br />
      </div>
      <br />
      <div class="leftdiv">
        <h1>CB :</h1>
        <v-text-field
          rounded
          :style="{
            'font-size': '40px',
            width: '250px',
            border: '2px solid blue',
          }"
          height="60"
          v-model="textField2"
          ref="textField2"
          @keyup.enter="sendDataToServer"
        ></v-text-field>
      </div>
      <br />
      <div v-if="picking.Display != 0">
        <h1 style="font-size: 30px; background-color: blueviolet">
          <span style="color: yellow">DISPLAY : {{ picking.Display }}</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.descarregarPicking();
  },
  methods: {
    descarregarPicking() {
      console.log(this.$route.params);
      let id = this.$route.params.IdPiking;
      console.log("la valeur de idPicking is ", id);
      this.$axios
        .get(
          `http://127.0.0.1:8080/apipda/dopicking?pickingid=${id}&pda=1&user=1&ubicid=11&artid=22&ordid=33&cantidad=+1&cb=123456789`
        )
        .then((response) => {
          this.picking = response.data;
          console.log(this.picking);
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
          this.textField2
        );
        this.focusTextField("textField1");
        // Réinitialiser les valeurs des champs de texte
        this.textField1 = "";
        this.textField2 = "";
      }
    },
  },
  data() {
    return {
      picking: null,
      textField1: "",
      textField2: "",
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
