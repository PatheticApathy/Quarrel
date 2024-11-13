<script setup lang="ts">
import Navbar from './NavBarView.vue'
import { ref, onMounted } from "vue"
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

const router = useRouter();
const route = useRoute();

const UID = ref<number>(0);
const isFollowing = ref<boolean>(false);

try {
  UID.value = Number(get_id());
} catch (error) {
  console.error(`Error, ${error}`);
}

function get_id() {
  const client_id = localStorage.getItem('QuarrelSessionID');
  if (!client_id) {
    throw new Error("no session id found. try logging in again");
  } else {
    return client_id;
  }
}

let id: number = Number(route.params.id);

const profile = ref<User>({ UID: 0, Username: "Babaoey", Password: "", Follow_count: 0, Following_count: 0, Bio: "Bio goes here...", Profile_pic: "" });

onMounted(() => {
  display_data();
  is_following(); // Call this when the component is mounted
});

onBeforeRouteUpdate((to, _, next) => {
  id = Number(to.params.id);
  display_data();
  is_following(); // Update the follow status on route change
  next();
});

const go_to_edit_profile = () => {
  router.push('/edit-profile');
};

const go_to_followers = () => {
  router.push(`/followers/${id}`);
};

const go_to_following = () => {
  router.push(`/following/${id}`);
};

const followUser = async () => {
  await follow();
  is_following(); // Update follow status after action
};
async function display_data() {
  if (!id) {
    console.error("No ID, login again");
  }
  const base_path = `http://localhost:8081/user/find/${id}`;
  try {
    const resp = await fetch(base_path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with error ${error.error}`);
    } else {
      const user: User = await resp.json();
      console.log(JSON.stringify(user));
      profile.value = user;
    }
  } catch (err) {
    console.error(`Error parsing json: ${err}`);
  }
}

async function follow() {
  const user_follow = {
    FID: get_id(),
    IID: id
  };
  const base_path = `http://localhost:8081/follow`;
  try {
    const resp = await fetch(base_path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user_follow),
    });
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with error ${error.error}`);
    } else {
      console.log(`User ${user_follow.FID} followed/unfollowed user ${user_follow.IID}`);
    }
  } catch (err) {
    console.error(`Error parsing json: ${err}`);
  }
}

async function is_following() {
  console.log('Fetching users');
  const base = `http://localhost:8081/follow/followers/${id}`;
  try {
    const resp = await fetch(base, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with error ${error.error}`);
    } else {
      const text = await resp.text();
      const followers = JSON.parse(text) as Array<User>;
      console.log("Successfully fetched");
      isFollowing.value = followers.some(user => user.UID === UID.value);
    }
  } catch (err) {
    console.error(`Error parsing JSON: ${err}`);
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
        <div class="username">{{ profile.Username }}</div>
        <div class="follow-button-container" v-if="id !== UID">
          <div v-if="isFollowing">
            <button @click="followUser" class="follow-button">Unfollow</button>
          </div>
          <div v-else>
            <button @click="followUser" class="follow-button">Follow</button>
          </div>
        </div>
        <div class="edit-button-container" v-else>
          <button @click="go_to_edit_profile" class="edit-button">Edit Profile</button>
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
  display: block;
  margin-top: 10vh;
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
  position: relative;
  margin-left: -200px;
  margin-top: 250px;
}

.username {
  font-size: 1.8rem;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
}

.follow-button-container {
  position: absolute;
  top: 0;
  right: 0;
}

.edit-button-container {
  position: absolute;
  top: 0;
  right: 0;
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

.follow-button,
.edit-button {
  background-color: navy;
  color: white;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 1rem;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  cursor: pointer;
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
