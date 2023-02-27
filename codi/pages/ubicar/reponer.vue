<template>
  <div @keyup.esc="goBack" class="div0 pa-2 ma-2">
    <div class="centered pa-0 ma-0">
      <h1 style="font-size: 50px">Mensage</h1>
      <br />
      <div>
        <v-row>
          <v-col
            cols="4"
            :style="{ 'font-size': '18px' }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Referencia:</h1>
          </v-col>
          <v-col cols="8" :style="{ 'font-size': '25px' }">
            <h1>Referencia</h1>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col
            cols="4"
            :style="{
              'font-size': '18px',
            }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Nombre :</h1>
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
            <h1>Req :</h1>
          </v-col>
          <br />
          <v-col
            cols="8"
            :style="{
              'font-size': '25px',
            }"
          >
            <h1>{{ selectedC4 }}</h1>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col
            cols="4"
            :style="{
              'font-size': '18px',
            }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>2ª</h1>
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
          <v-col
            cols="4"
            :style="{
              'font-size': '18px',
            }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>1ª</h1>
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
          <v-col
            cols="4"
            :style="{
              'font-size': '18px',
            }"
            class="leftdiv pa-0 ma-0"
          >
            <h1>Total</h1>
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
          <span style="color: yellow">Cantidad en 1ª</span>
        </h1>
      </div>
      <div>
        <v-combobox
          v-model="selectedItem"
          :items="albaran"
          item-text="albaran"
          item-value="albaran"
          label="Select an item"
          clearable
        />
        <table class="my-table">
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in tableData"
              :key="index"
              @click="onRowClick(row)"
            >
              <td v-for="(cell, key) in row" :key="key">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios

      .get(`http://127.0.0.1:8080/apipda/dorepos&usuid=1&pda=12`)

      .then((response) => {
        console.log("el numero de picking se ha encontrado", response);
        if (response.data.Result) {
          // L'utilisateur existe, récupérez les informations de l'utilisateur

          this.headers = response.data.Headers;
          this.tableData = response.data.Data;
          console.log("le numero de reference est ", this.tableData);
          this.albaran = this.tableData.map((item) => item.C1);
          console.log("La valeur du ALBARAN est", this.albaran);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
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
        this.textField1 = "";
        this.textField2 = "";
        this.textField3 = "";
        this.textField4 = "";
        this.textField5 = "";
      }
    },
    onRowClick(row) {
      this.selectedItem = row.albaran;
      console.log("Row clicked: ", row);
      this.selectedC4 = row.C4;
    },
    goBack() {
      this.$router.go(-1); // Revenir à la page précédente
    },
  },
  data() {
    return {
      tableData: [],
      albaran: null,
      state: false,
      headers: [],
      selectedItem: null,
      selectedC4: "",
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
  align-items: top;
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
