<template>
  <div id="div0">
    <p id="estado" class="p">
      Indique el código de la PDA <br />
      para iniciar la pistola
    </p>
    <div style="text-align: center">
      <v-text-field
        id="numPda"
        v-model="numpda"
        name="NumPDA"
        value="1"
        prepend-inner-icon="mdi-remote"
        rounded
        style="border: 2px solid blue"
        height="50"
        ref="textField2"
        @keyup.enter="sendDataToServer"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sendDataToServer() {
      if (this.numpda) {
        localStorage.setItem("ID", this.numpda);
        this.$router.push({
          name: "index",
          params: {
            id: "ID",
            value: this.numpda,
          },
        });
      }
    },
  },

  data() {
    return {
      numpda: "",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/variables.scss";
</style>
