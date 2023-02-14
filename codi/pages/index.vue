<template>
  <UsuariId></UsuariId>

  <!-- <div v-if="dataFromLocalStorage" class="divUsuari">
    <Usuari :data="dataFromLocalStorage"></Usuari>
  </div>-->
</template>

<script>
export default {
  /* computed: {
    dataFromLocalStorage() {
      return JSON.parse(localStorage.getItem("key"));
    },
  },*/
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
.divUsuari {
  display: flex;
  text-align: center;
  position: relative;
  flex-direction: row-reverse;
  width: 480px;
  height: 800px;
  background-color: #bd2424;
}
</style>
