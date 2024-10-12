<script setup lang="ts">
import Navbar from './NavBarView.vue'
</script>

<template>
    <div class="messages">
      <h1>This is a messages page</h1>
    </div>
    <Navbar />
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>