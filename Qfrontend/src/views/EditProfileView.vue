<template>
    <div class="back">
        <button @click="go_to_profile_page">Back to Profile Page</button>
        <h1>Edit Profile</h1>
    </div>
    <div class="save">
        <button @click="go_to_profile_page">Save</button>
    </div>
    <div class="upload_background_image">
        <button>
        <img src="../assets/upload-image.png" alt="Clickable Image" style="width: 50px; height: 50px;">
        </button>
    </div>
    <span class="dot"></span>
    <div class="upload_profile_pic">
        <button>
        <img src="../assets/upload-image.png" alt="Clickable Image" style="width: 50px; height: 50px;">
        </button>
    </div>
    <div class="edit-name">
        <p>Name:</p>
        <input type="text" placeholder="enter new username...">
    </div>
    <div class="edit-bio">
        <p>Bio:</p>
        <input type="text" placeholder="enter new bio...">
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

.upload_background_image button {
    background-color: transparent;
    position: absolute;
    top: 175px;
    left: 875px;
    border: 0px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
}

.dot {
    height: 150px;
    width: 150px;
    background-color: #d095e5;
    border-radius: 50%;
    position: absolute;
    top: 225px;
    left: 575px;
}

.upload_profile_pic button {
    background-color: transparent;
    position: absolute;
    top: 250px;
    left: 600px;
    border: 0px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
}

.edit-name {
    position: absolute;
    top: 400px;
    left: 500px;
}

.edit-bio {
    position: absolute;
    top: 475px;
    left: 500px;
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

  @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

input {
  display: block;
  width: 800px;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 1px;
  border: 3px solid navy;
  border-radius: 5px;
}

</style>