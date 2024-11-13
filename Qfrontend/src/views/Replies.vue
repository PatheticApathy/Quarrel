<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './NavBarView.vue'
import { routes } from 'vue-router/auto-routes';

const router = useRoute();
const replies = ref<Array<Replies>>([]);
const reply_error_message = ref<string>('');
const selectedTeam = ref<number>(0); // 0 for Team 1 (blue), 1 for Team 2 (red)
const new_reply = ref<Replies>({
  RID: 0,
  Comment: '',
  Likes: 0,
  Views: selectedTeam.value, // This will reflect the team choice (0 or 1)
  Poster: get_id()
});

switch (router.params.type) {
  case ('arg'):
    get_replies_for_arg(Number(router.params.id));
    break;
  case ('post'):
    get_replies_for_post(Number(router.params.id));
    break;
  default:
    console.log("How'd you get here?");
}

async function get_replies_for_post(id: number) {
  console.log('Fetching replies for posts');
  try {
    const resp = await fetch(`http://localhost:8081/replies/post/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with error ${error.error}`);
      reply_error_message.value = error.error;
    } else {
      replies.value = await resp.json();
      console.log("Successfully fetched");
    }
  } catch (err) {
    console.error(`Error parsing json: ${err}`);
  }
}

async function get_replies_for_arg(id: number) {
  console.log('Fetching replies for arg');
  try {
    const resp = await fetch(`http://localhost:8081/replies/arg/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with error ${error.error}`);
      reply_error_message.value = error.error;
    } else {
      replies.value = await resp.json();
      console.log("Successfully fetched");
    }
  } catch (err) {
    console.error(`Error parsing json: ${err}`);
  }
}

async function create_replies_for_arg(argument_id: number) {
  new_reply.value.Views = selectedTeam.value; // Set team choice before submission
  console.log('Sending reply for argument');
  try {
    const resp = await fetch(`http://localhost:8081/replies/arg`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        AID: argument_id,
        reply: new_reply.value
      })
    });
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with error ${error.error}`);
      reply_error_message.value = error.error;
    } else {
      const id: { RID: number } = await resp.json();
      console.log(`Successfully created with id ${id.RID}`);
      new_reply.value.RID = id.RID;
      replies.value.push(JSON.parse(JSON.stringify(new_reply.value)));
    }
  } catch (err) {
    console.error(`Error parsing json: ${err}`);
  }
}

async function create_replies_for_post(post_id: number) {
  new_reply.value.Views = selectedTeam.value; // Set team choice before submission
  console.log('Sending reply for posts');
  try {
    const resp = await fetch(`http://localhost:8081/replies/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        PID: post_id,
        reply: new_reply.value
      })
    });
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with error ${error.error}`);
      reply_error_message.value = error.error;
    } else {
      const id: { RID: number } = await resp.json();
      console.log(`Successfully created with id ${id.RID}`);
      new_reply.value.RID = id.RID;
      replies.value.push(JSON.parse(JSON.stringify(new_reply.value)));
    }
  } catch (err) {
    console.error(`Error parsing json: ${err}`);
  }
}

async function like_reply(reply: Replies) {
  console.log('Liked post');
  try {
    const resp = await fetch('http://localhost:8081/replies/like',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ RID: reply.RID })
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
    } else {
      reply.Likes++
      console.log("Succesfully liked");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}
function get_id() {
  const client_id = localStorage.getItem('QuarrelSessionID');
  if (!client_id) {
    throw new Error("no session id found. try logging in again");
  } else {
    return Number(client_id);
  }
}
</script>

<template>
  <div class="reply_container">
    <div>
      <h1 style="text-align: center;">Reply:</h1>
      <textarea class="replyText" v-model="new_reply.Comment" cols="80" rows="5" maxlength="280"
        placeholder="Insert Comment here"></textarea>
      <div v-if="router.params.type == 'arg'">
        <label>
          <input type="radio" v-model="selectedTeam" :value="0" /> Team 1 (Blue)
        </label>
        <label>
          <input type="radio" v-model="selectedTeam" :value="1" /> Team 2 (Red)
        </label>
      </div>
      <div class="submit-reply">
      <input
        @click="(router.params.type == 'post') ? create_replies_for_post(Number(router.params.id)) : create_replies_for_arg(Number(router.params.id))"
        type="submit" name="Submit reply">
      </div>
     </div>
    <div v-for="r in replies" :key="r.RID" class="reply" :style="{ backgroundColor: r.Views === 0 ? '#1873DA' : '#DA3A18' }">
      <h1>{{ r.Comment }}</h1>
      <div style="text-align: left;">
        <input type="submit" v-bind:value="`Likes: ${r.Likes}`" @click="like_reply(r)">
      </div>
    </div>
  </div>
  <Navbar />
</template>

<style>
.reply_container {
  position: absolute;
  top: 12.86008230452674897119341563786%;
  left: 30%;
  height: 100%;
  width: 39.84375%;
}

.replyText:focus {
  outline: none;
  border-color: violet;
}

.replyInput {
  background-color: navy;
  border-color: navy;
  color: white;
}

.replyInput:hover {
  background-color: violet;
  border-color: violet;
}

.reply {
  margin-top: 4.901960784313725490196078431373%;
  text-align: center;
  background-color: darkslateblue;
  border-radius: 25px;
  padding: 20px;
}

.submit-reply input {
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

.submit-reply input:hover {
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
