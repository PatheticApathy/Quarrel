<template>
    <div class="back">
        <button @click="go_to_profile_page">Back to Profile Page</button>
        <h1>Following</h1>
    </div>
    <div class="save">
        <button @click="go_to_profile_page">Save</button>
    </div>
    <Navbar />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Navbar from './NavBarView.vue'
const router = useRouter();

function go_to_profile_page(){
    router.push("/profile");
}
</script>

<style>
.back button {
    border-radius: 20px;
    background-color: navy;
    color: white;
    padding: 20px;
    font-size: 15px;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    position: absolute;
    top: 20px;
    left: 480px;
}

.back h1{
    position: absolute;
    top: 25px;
    left: 730px;
}

.save button {
    border-radius: 20px;
    background-color: navy;
    color: white;
    padding: 20px;
    font-size: 15px;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    position: absolute;
    top: 20px;
    left: 1250px;
}

button:hover {
        background-color: violet;
        animation: bubble 1s ease-out;
    }

  @keyframes bubble {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>