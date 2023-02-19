<template>
  <div class="centered pa-4 ma-2">
    <div>
      <h1>PICKING :</h1>
      <h1>Tienda :</h1>
      <h1>Nombre :</h1>
      <h1>REFERENCIA :</h1>
      <br />
      <div>
        <v-btn class="rounded-number" color="green" dark
          ><div class="number-container">
            <span class="number">09</span>
          </div>
        </v-btn>
        <v-btn class="rounded-number" color="red" dark
          ><div class="number-container">
            <span class="number">1</span>
          </div>
        </v-btn>
        <v-btn class="rounded-number" style="background-color: gray"
          ><div class="number-container">
            <span class="number">18</span>
          </div>
        </v-btn>
        <v-btn class="rounded-number" style="background-color: #9f1412"
          ><div class="number-container">
            <span class="number">10</span>
          </div>
        </v-btn>
        <br />
        <br />
        <h1>
          <span style="color: yellow">0</span> /
          <span style="color: red">2</span>
        </h1>
        <br />
      </div>
      <div class="leftdiv">
        <h1>
          Unid :
          <v-btn style="font-size: 30px" large color="primary"> +1</v-btn>
        </h1>
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
        ></v-text-field>
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
      let id = this.$route.params.pickingIdVue;

      console.log("la valeur de idPiking is ", id);
      this.$axios
        .get(
          `http://127.0.0.1:8080/apipda/dopicking?pickingid=${this.id}&pda=1&user=1&ubicid=11&artid=22&ordid=33&cantidad=+1&cb=123456789`
        )
        .then((response) => {
          this.picking = response.data;
          console.log(this.picking);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data() {
    return {
      picking: null,
      pickingIdVue: null,
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
  justify-content: left;
  align-items: center;
  text-align: left;
}
.rounded-number {
  height: 180px;
  width: 30px;
  border-radius: 50%;
  padding: 0;
  position: relative;
}

.number-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.number {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}
</style>
