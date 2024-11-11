<script setup lang="ts">
import Navbar from './NavBarView.vue'
import { ref } from "vue"
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

const router = useRouter();
const route = useRoute();

const UID = ref<number>(0);
try {
  UID.value = Number(get_id());
} catch (error) {
  console.error(`Error, ${error}`);
}

function get_id() {
  const client_id = localStorage.getItem('QuarrelSessionID');
  if (!client_id) {
    throw new Error("No session id found. Try logging in again");
  } else {
    return client_id;
  }
}
 // Replace this with your actual logic to get the current user ID
let id: number = Number(route.params.id)

const profile = ref<User>({ UID: 0, Username: "Babaoey", Password: "", Follow_count: 0, Following_count: 0, Bio: "Bio goes here...", Profile_pic: "" });
display_data();
onBeforeRouteUpdate((to, _, next) => { id = Number(to.params.id); display_data(); next() });

const go_to_edit_profile = () => {
  router.push('/edit-profile')
}
const go_to_followers = () => {
  router.push('/followers')
}
const go_to_following = () => {
  router.push('/following')
}

const followUser = () => {
  console.log("Follow button clicked");
}

async function display_data() {
  if (!id) { console.error("No ID, login again") }
  const base_path = `http://localhost:8081/user/find/${id}`;
  try {
    const resp = await fetch(base_path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
    } else {
      const user: User = await resp.json();
      console.log(JSON.stringify(user));
      profile.value = user;
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}

</script>

<template>
  <div class="profile-page">
    <Navbar />
    <div class="profile-content">
      <div class="background-container">
        <img class="background-image" src="../assets/background-image.jpg" alt="Background Image">
        <div class="profile-pic">
          <img v-bind:src="profile.Profile_pic" alt="Profile Picture">
        </div>
      </div>
      <div class="user-info">
        <div class="username">{{ profile.Username }}
          <div class="edit-profile" v-if="id === UID">
            <button @click="go_to_edit_profile">Edit Profile</button>
          </div>
          <div class="follow-profile" v-else>
            <button @click="followUser">Follow</button>
          </div>
        </div>
        <div class="bio">{{ profile.Bio }}</div>
        <div class="followers">
          <button @click="go_to_followers">Followers: {{ profile.Follow_count }}</button>
          <button @click="go_to_following">Following: {{ profile.Following_count }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5vh;
}

.profile-page {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.background-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 68vw;
  height: 40vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  z-index: -1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(2px);
}

.profile-pic {
  position: absolute;
  bottom: -75px;
  left: 100px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid white;
  overflow: hidden;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: -200px;
  margin-top: 250px;
  position: absolute;
  bottom: 10vh;
  gap: 10px;
}

.username {
  font-size: 1.8rem;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.bio {
  font-size: 1.2rem;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  max-width: 400px;
}

.followers {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.followers button {
  border-radius: 40px;
  background-color: navy;
  color: white;
  padding: 10px;
  font-size: 1rem;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  cursor: pointer;
}

.edit-profile button {
  background-color: navy;
  color: white;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 1rem;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  cursor: pointer;
  margin-left: 20vw;
}

.follow-profile button {
  background-color: navy;
  color: white;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 1rem;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  cursor: pointer;
  margin-left: 20vw;
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
