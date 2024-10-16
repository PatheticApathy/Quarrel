<script setup lang="ts">
import Navbar from './NavBarView.vue'
</script>

<template>
    <div class="background-image">
      <img src="../assets/background-image.jpg" width = 1000 height = 250>
    </div>
    <div class="profile-pic">
      <img src="../assets/profile-pic.jpg" width = 150 height = 150>
    </div>
    <div class="explore">
      <h1>Dr. Bowman</h1>
    </div>
    <div class="bio">
      <p>Finally a doctor!</p>
      <p>Latech Computer Science</p>
    </div>
    <div class="followers">
      <button>Followers: 12,414</button>
      <button>Following: 0</button>
    </div>
    <div class="edit">
      <button @click="go_to_edit_profile">Edit Profile</button>
    </div>
    <Navbar />
</template>

<style>

.background-image {
    position: absolute;
    top: 0px;
    left: 460px;
    filter: blur(2px);
    -webkit-filter: blur(2px);
}

.profile-pic {
  position: absolute;
  top: 175px;
  left: 550px;
  border-radius: 50%;
  border: 5px solid black;
  overflow: hidden;
}

h1 {
  position: absolute;
  top: 275px;
  left: 730px;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
}

.bio {
  display: block;
  justify-content: space-between;
  gap: 10px;
  position: absolute;
  top: 375px;
  left: 575px;
  font-size: 15px;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
}

.followers {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  position: absolute;
  top: 450px;
  left: 575px;
  color: white;
}

.followers button {
  border-radius: 40px;
  background-color: navy;
  color: white;
  padding: 20px;
  font-size: 15px;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
}

  .edit button {
    position: absolute;
    top: 300px;
    left: 1050px;
    width: 150px;
    height: 150px;
    border: 0px solid navy;
    background-color: navy;
    color: white;
    cursor: pointer;
    margin-top: 10px;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    font-size: 15px;
    margin-top: 20px;
    border-radius: 50%;
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
</style>