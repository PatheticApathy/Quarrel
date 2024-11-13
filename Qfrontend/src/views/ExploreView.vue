<script setup lang="ts">
import Navbar from './NavBarView.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter();
const content_type = ref<string>("post");
const comment = ref<string>("");
const team1Comment = ref<string>("");
const team2Hyperlink = ref<string>("");
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
  if (content_type.value === "post") {
    content_link = hyperlink.value;
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
      Comment: team1Comment.value,
      Likes: 0,
      Views: 0,
      Poster: UID,
      Hyperlink: team2Hyperlink.value,
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
        console.log(`Argument has ID: ${id.AID}`);
        go_to_home();
      }
    } catch (err) {
      console.error(`Connection error: ${err}`)
    }
  }
}
function go_to_home() {
  router.push('/home')
}
</script>

<template>
  <div>
    <Navbar />
    <h1>Create a post or argument</h1>
    <br>
    <div>
      <div>
        Choose input type:
        <div>
          <input v-model="content_type" type="radio" id="args" value="args" />
          <label for="args">Arguments</label>
          <input v-model="content_type" type="radio" id="post" value="post" />
          <label for="post">Post</label>
        </div>
      </div>
      <div v-if="content_type === 'post'">
        <div class="post_input">
          <textarea v-model="comment" id="comment" cols="100" rows="10" maxlength="280" placeholder="Insert Comment here"></textarea>
          <label for="hyperlink">Link:</label>
          <input id="hyperlink" v-model="hyperlink" type="text">
        </div>
      </div>
      <div v-else-if="content_type === 'args'">
        <div class="teams">
          <div>
            <label for="team1Comment">Team 1:</label>
            <input id="team1Comment" v-model="team1Comment" type="text" placeholder="Insert Team 1" />
          </div>
          <div>
            <label for="team2Hyperlink">Team 2:</label>
            <input id="team2Hyperlink" v-model="team2Hyperlink" type="text" placeholder="Insert Team 2" />
          </div>
        </div>
      </div>
      <div class="submit_button">
        <input type="submit" @click="create_content" value="Submit">
      </div>
      <p v-if="error_message">{{ error_message }}</p>
    </div>
  </div>
</template>

<style>

.post_input input{
  border: 3px solid navy;
  border-radius: 5px;
}

.post_input textarea{
  border: 3px solid navy;
  border-radius: 5px;
}

.teams input {
  width: 60vw;
  height: 50px;
  border: 3px solid navy;
  border-radius: 5px;
}

.submit_button input {
  width: 500px;
  height: 40px;
  border: 0px solid navy;
  background-color: navy;
  color: white;
  cursor: pointer;
  border-radius: 0px;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  margin-top: 20px;
  border-radius: 20px;
}

.submit_button input:hover {
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
