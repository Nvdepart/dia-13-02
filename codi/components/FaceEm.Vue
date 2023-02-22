<template>
  <div class="container">
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
    <p>Loading ...</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.ring {
  width: 200px;
  height: 200px;
  border: 0 solid #000;
  border-radius: 50%;
  position: absolute;
}
.ring:nth-child(1) {
  border-bottom: 8px;
  border-color: rgb(255, 255, 255);
  animation: rotatel 2s linear infinite;
}
</style>
