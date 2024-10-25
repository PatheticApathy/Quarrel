<template>
  <div class="top-row">
      <button @click="go_to_profile_page">Back to Profile Page</button>
      <h1>Following</h1>
      <button @click="go_to_profile_page">Save</button>
  </div>
  <div class="follower-info">
      <!-- Use v-for to iterate through the followers array -->
      <button v-for="(follower, index) in followers" :key="index" class="follower-button">
          <div id="rectangle">
              <img :src="follower[1]" width="50" height="50">
              <span class="follower-name">{{ follower[0] }}</span>
          </div>
      </button>
  </div>
  <Navbar />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Navbar from './NavBarView.vue'
const router = useRouter();

function go_to_profile_page() {
  router.push("/profile");
}

let followers = [
  ["champ", "../assets/champ-profile-pic.jpg"],
  ["alex", "../assets/alex-profile-pic.jpg"],
  ["jordan", "../assets/jordan-profile-pic.jpg"]
];
</script>

<style>
.top-row {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 67vw;
  justify-content: space-between;
  display: flex;
  flex-direction: row;

}

.back h1 {
  position: absolute;
  top: 25px;
  left: 730px;
}

#rectangle {
  width: 800px;
  height: 50px;
  background-color: violet;
  display: flex;
  align-items: center;
}

.follower-info {
  position: absolute;
  top: 100px;
  right: 20px;
  width: 65vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.follower-button {
  background-color: violet;
  display: flex;
  align-items: center;
  padding: 5px;
  border: none;
  width: fit-content;
}

.follower-info button{
  background-color: violet;
}

.follower-info img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 2px solid black;
  margin-right: 10px;
}

.follower-name {
  font-size: 18px;
  font-weight: bold;
  color: white;
}
</style>
