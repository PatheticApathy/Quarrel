<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const posts = ref<Array<Post>>([]);
const args = ref<Array<Arguments>>([]);
const post_reply_count = ref<Map<number, number>>(new Map());
const home_error_message = ref<String>('');

get_post();
get_args();

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
  await get_post_count();
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

async function get_post_count() {
  console.log('Fetching posts reply count');
  let id_list: Array<{ PID: number }> = [];
  for (const post of posts.value.values()) {
    id_list.push({ PID: post.PID });
  };
  try {
    const resp = await fetch('http://localhost:8081/replies/post/count',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id_list)
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      home_error_message.value = error.error;
    } else {
      const rep_count: Array<{ PID: number, reply_count: number }> = await resp.json();
      rep_count.map((coco) => {
        post_reply_count.value?.set(coco.PID, coco.reply_count);
      });
      console.log("Succesfully fetched");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}

async function like_post(post: Post) {
  const user_id: number | undefined = get_id();
  console.log('Liked post');
  try {
    const resp = await fetch('http://localhost:8081/like/like',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UID: user_id, PID: post.PID })
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      unlike_post(post);
    } else {
      post.Likes++
      console.log("Succesfully liked");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}

async function unlike_post(post: Post) {
  const user_id: number | undefined = get_id();
  console.log('Unliked post');
  try {
    const resp = await fetch('http://localhost:8081/like/unlike',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UID: user_id, PID: post.PID })
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
    } else {
      post.Likes--
      console.log("Succesfully unliked");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}

function get_id() {
  const client_id = localStorage.getItem('QuarrelSessionID');
  if (!client_id) {
    console.error("No user ID in local storage")
    return undefined;
  } else {
    console.log(("User_id acquired"))
    return Number(client_id);
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
      <div style="text-align: left;">
        <input type="submit" v-bind:value="`Likes: ${p.Likes}`" @click="like_post(p)">
        <input type="submit" v-bind:value="`Replies: ${post_reply_count.has(p.PID) ? post_reply_count.get(p.PID) : 0}`"
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
