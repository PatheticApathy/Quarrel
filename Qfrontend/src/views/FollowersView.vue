<template>
    <div class="top-row">
        <button @click="go_back">Back to Profile Page</button>
        <h1>Followers</h1>
    </div>
    <div class="follower-info">
        <!-- Use v-for to iterate through the followers array -->
        <RouterLink v-for="(follower, index) in followers" :key="index" :to="{ name: 'profile', params: { id: follower.UID } }" class="follower-button">
            <div id="rectangle" class="follower-container">
                <span v-if="!follower.Profile_pic">
                    <img class="userImg" src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg">
                </span>
                <span v-else>
                    <img class="userImg" :src="follower.Profile_pic">
                </span>
                <span class="username">{{ '\u00A0\u00A0' + follower.Username }}</span>
            </div>
        </RouterLink>
    </div>
    <Navbar />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Navbar from './NavBarView.vue'
import { ref } from 'vue'
const router = useRouter();

function go_back() {
    router.go(-1);
}

let followers = ref<Array<User>>([]);
get_follower();

const home_error_message = ref<String>('');

async function get_follower() {
    console.log('Fetching users');
    try {
    const resp = await fetch('http://localhost:8081/follow/followers/',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      home_error_message.value = error.error;
    } else {
      let text = await resp.text();
      followers.value = JSON.parse(text);
      console.log("Succesfully fetched");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}

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
    padding: 20px;
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
    border-radius: 8px;
    padding: 5px;
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
    padding: 10px;
    border: none;
    border-radius: 8px;
    width: fit-content;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.follower-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.follower-info button {
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
