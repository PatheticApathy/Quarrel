<script setup lang="ts">
import Navbar from './NavBarView.vue'

import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let users = ref<Array<User>>([]);
search_users();

const home_error_message = ref<String>('');

async function search_users() {
  console.log('Fetching users');
  try {
    const resp = await fetch('http://localhost:8081/user/search/' + route.params.query,
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
      users.value = await resp.json();
      console.log("Succesfully fetched");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}
</script>

<template>
  <div class="profileSearch">
    <RouterLink :to="{ name: 'profile', params: { id: u.UID } }" v-for="u in users">
      <div class="searchObject">
        <span v-if="!u.Profile_pic">
          <img class="userImg"
            src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg">
        </span>
        <span v-else>
          <img class="userImg" v-bind:src=u.Profile_pic>
        </span>
        <span>{{ '\u00A0\u00A0' + u.Username }}</span>
      </div>
    </RouterLink>
  </div>
  <Navbar />
</template>

<style>
.profileSearch {
  position: relative;
  left: -50%;
  top: 50%;
}

.searchObject {
  padding-bottom: 5%;
}

.searchObject:hover {
  background-color: violet;
}
</style>
