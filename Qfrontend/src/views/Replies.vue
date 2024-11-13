<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './NavBarView.vue'

const router = useRoute();
const replies = ref<Array<Replies>>([]);
const reply_error_message = ref<string>('');
const new_reply = ref<Replies>({
  RID: 0,
  Comment: '',
  Likes: 0,
  Views: 0,
  Poster: get_id()
});

switch (router.params.type) {
  case ('arg'):
    get_replies_for_arg(Number(router.params.id));
  case ('post'):
    get_replies_for_post(Number(router.params.id));
  default:
    console.log("How'd you get here?");
}

async function get_replies_for_post(id: number) {
  console.log('Fetching replies for posts');
  try {
    const resp = await fetch(`http://localhost:8081/replies/post/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      reply_error_message.value = error.error;
    } else {
      replies.value = await resp.json();
      console.log("Succesfully fetched");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}
async function get_replies_for_arg(id: number) {
  console.log('Fetching replies for arg');
  try {
    const resp = await fetch(`http://localhost:8081/replies/arg/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      reply_error_message.value = error.error;
    } else {
      replies.value = await resp.json();
      console.log("Succesfully fetched");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}
async function create_replies_for_arg(argument_id: number) {
  console.log('Sending reply for argument');
  try {
    const resp = await fetch(`http://localhost:8081/replies/arg`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          AID: argument_id,
          reply: new_reply.value
        })
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      reply_error_message.value = error.error;
    } else {
      const id: { RID: number } = await resp.json();
      console.log(`Succesfully created with id ${id.RID}`);
      new_reply.value.RID = id.RID;
      replies.value.push(new_reply.value);
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}
async function create_replies_for_post(post_id: number) {
  console.log('Sending reply for posts');
  try {
    const resp = await fetch(`http://localhost:8081/replies/post`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          PID: post_id,
          reply: new_reply.value
        })
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      reply_error_message.value = error.error;
    } else {
      const id: { RID: number } = await resp.json();
      console.log(`Succesfully created with id ${id.RID}`);
      new_reply.value.RID = id.RID;
      replies.value.push(JSON.parse(JSON.stringify(new_reply.value)));
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
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
</script>


<template>
  <div class="reply_container">
    <div>
      <h1 style="text-align: center;">Reply:</h1>
      <textarea v-model="new_reply.Comment" cols="80" rows="5" maxlength="280"
        placeholder="Insert Comment here"></textarea>
      <input
        @click="(router.params.type == 'post') ? create_replies_for_post(Number(router.params.id)) : create_replies_for_arg(Number(router.params.id))"
        type="submit" name="Submit reply">
    </div>
    <div v-for="r in replies" class="reply">
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
  left: 40.78125%;
  height: 100%;
  width: 39.84375%;
}

.reply {
  margin-top: 4.901960784313725490196078431373%;
  text-align: center;
  background-color: #708090;
  border-radius: 25px;
  padding: 20px;
}
</style>
