<script setup lang="ts">
import Navbar from './NavBarView.vue'
</script>

<template>
    <div class="background-image">
      <img src="../assets/background-image.jpg" width = 1000 height = 300>
    </div>
    <div class="explore">
      <h1>This is a profile page</h1>
    </div>
    <Navbar />
</template>

<style>
.background-image {
    position: absolute;
    top: 0px;
    left: 200px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>