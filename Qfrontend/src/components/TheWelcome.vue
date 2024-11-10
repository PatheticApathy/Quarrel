<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const posts = ref<Array<Post>>([]);
const args = ref<Array<Arguments>>([]);

get_post();
get_args();

const home_error_message = ref<String>('');

async function get_post() {
  console.log('Fetching posts');
  try {
    const resp = await fetch('http://localhost:8081/post/post/batch',
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
      let fetched_posts = await resp.json();
      posts.value = fetched_posts;
      console.log("Succesfully fetched");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}

async function get_args() {
  console.log('Fetching args');
  try {
    const resp = await fetch('http://localhost:8081/post/args/batch',
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
      let fetched_args = await resp.json();
      args.value = fetched_args;
      console.log("Succesfully fetched");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}
</script>

<template>
  <div class="post_container">
    <div v-for="p in posts" class="post">
      <h1>{{ p.Comment }}</h1>
      <div v-if="!p.Hyperlink"></div>
      <div v-else>
        <img class="postImg" v-bind:src=p.Hyperlink>
      </div>
      <div style="text-align: left;">Likes: {{ p.Likes }} Views: {{ p.Views }} <input type="submit" value="Replies: 0"
          @click="router.push(`replies/post/${p.PID}`)">
      </div>
    </div>
  </div>
</template>


<style>
.post_container {
  position: absolute;
  top: 12.86008230452674897119341563786%;
  left: 25.78125%;
  height: 100%;
  width: 39.84375%;
}

.post {
  margin-top: 4.901960784313725490196078431373%;
  text-align: center;
  background-color: #708090;
  border-radius: 25px;
  padding: 20px;
}

.postImg {
  max-width: 450px;
  max-height: 300px;
}
</style>
