<template>
  <div style="text-align: center; font-size: 35px">
    <div style="padding-bottom: 50px">
      <h1>INDICAR PICKING</h1>
    </div>
    <v-row align-content-sm>
      <v-col cols="4" style="text-align: end">
        <h3>Num. :</h3>
        <br />
        <h3>Ubic. :</h3>
      </v-col>
      <v-col style="margin-right: 20px">
        <v-text-field
          id="pickingId"
          name="pickingId"
          v-model="pickingId"
          prepend-inner-icon="mdi-numeric"
          value=""
          type="number"
          outlined
          rounded
          :style="{ 'font-size': '40px' }"
          height="80"
        ></v-text-field>
        <v-text-field
          id="ubicId"
          name="ubicid"
          v-model="ubicId"
          prepend-inner-icon="mdi-numeric"
          type="number"
          outlined
          rounded
          class="text-center custom-field"
          :style="{ 'font-size': '40px' }"
          height="80"
        ></v-text-field
      ></v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "/assets/variables.scss";
.custom-field .v-input__control {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-field .v-input__control input {
  text-align: center;
  width: 100%;
  border-color: black;
}
</style>
