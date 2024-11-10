<script setup lang="ts">
import Navbar from './NavBarView.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter();
const content_type = ref<string>("post");
const comment = ref<string>("");
const hyperlink = ref<string>("");
const error_message = ref<string>("");

function get_id() {
  const client_id = localStorage.getItem('QuarrelSessionID');
  if (!client_id) {
    throw new Error("No session id found. Try logging in again");
  } else {
    return Number(client_id);
  }
}
async function create_content() {
  const UID: number = get_id();
  let content_link: string | null = null;
  if (!UID) {
    console.error("No User ID, must login again");
    return;
  }
  if (hyperlink.value !== "") {
    content_link = hyperlink.value
  }
  if (content_type.value === "post") {
    const post: Post = {
      PID: 0,
      Comment: comment.value,
      Likes: 0,
      Views: 0,
      Poster: UID,
      Hyperlink: content_link
    }
    try {
      const resp = await fetch("http://localhost:8081/post/post", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (!resp.ok) {
        const error: Api_Error = await resp.json();
        error_message.value = error.error;
        console.error(`Response status: ${resp.status} with errror ${error.error}`);
      } else {
        const id: PID = await resp.json();
        console.log(`Post has ID: ${id.PID}`);
        go_to_home();
      }
    } catch (err) {
      console.error(`Connection error: ${err}`)
    }
  } else {
    const arg: Arguments = {
      AID: 0,
      Comment: comment.value,
      Likes: 0,
      Views: 0,
      Poster: UID,
      Hyperlink: content_link,
      T1_votes: 0,
      T2_votes: 0
    }
    try {
      const resp = await fetch("http://localhost:8081/post/args", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg)
      });
      if (!resp.ok) {
        const error: Api_Error = await resp.json();
        error_message.value = error.error;
        console.error(`Response status: ${resp.status} with errror ${error.error}`);
      } else {
        const id: AID = await resp.json();
        console.log(`Post has ID: ${id.AID}`);
        go_to_home();
      }
    } catch (err) {
      console.error(`Connection error: ${err}`)
    }
  }
}
function go_to_home() {
  router.push('/home') // Navigate to home page after login
}
</script>

<template>
  <div>
    <Navbar />
    <h1>Create a post or argument</h1>
    <br>
    <div>
      <div>
        Choose input type
        <div>
          <input v-model="content_type" type="radio" id="args" value="args" />
          <label label for="args">Arguments</label>
          <input v-model="content_type" type="radio" id="post" value="post" />
          <label for="post">Post</label>
        </div>
      </div>
      <div>
        <textarea v-model="comment" id="comment" cols="100" rows="40" width="500" maxlength="280" name="comment"
          placeholder="Insert Comment here"></textarea>
        <label for="hyperlink">Link:</label>
        <input id="hyperlink" v-model="hyperlink" type="text">
        <input type="submit" @click="create_content">
      </div>
    </div>
  </div>
</template>
