<template>
  <div id="div0">
    <p id="estado" class="p">
      Indique el código de la PDA <br />
      para iniciar la pistola
    </p>
    <div style="text-align: center">
      <v-text-field
        id="numpda"
        name="id"
        value="123456"
        prepend-inner-icon="mdi-remote"
        outlined
        rounded
        height="50"
      ></v-text-field>
    </div>
    <p><v-btn class="button" id="btPDA">Iniciar</v-btn></p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.body {
  background: #59abe3 none repeat scroll 0% 0%;
  margin: 0px;
}

#div0 {
  width: 460px;
  height: 600px;
  background: #e6e6e6 none repeat scroll 0% 0%;
  border-radius: 8px;
  box-shadow: 0px 0px 10px -0px black;
  margin: calc(5vh - 5px) auto;
  padding: 10px 30px;
  max-width: calc(100vw - 10px);
  box-sizing: border-box;
  position: relative;
}

#divcenter {
  text-align: center;
}

.p {
  font-size: 30px;
  text-align: center;
}

.button {
  border-radius: 10px;
  border: 2px solid black;
  background-color: #0979b0 none repeat scroll 0% 0%;
  color: blue;
  cursor: pointer;
  font-weight: bold;
  font-size: 30px;
  left: 30%;
  width: 180px;
}

.button:hover {
  background: #0f8fe4 none repeat scroll 0% 0%;
  color: #950a0a;
}

#id {
  font-size: larger;
}

#usuario {
  text-align: center;
  font-weight: bold;
  border-radius: 10px;
  font-size: 30px;
  border: 1px solid black;
  width: 60%;
}

.p {
  vertical-align: 0px;
  font-weight: bold;
}
</style>
