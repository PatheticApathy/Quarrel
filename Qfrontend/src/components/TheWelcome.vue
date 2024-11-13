<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

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
    console.error(`Error parsing json: ${err}`);
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
    console.error(`Error parsing json: ${err}`);
  }
}

async function voteForTeam(aid: number, team: 'T1' | 'T2') {
  const user_vote = {
    UID: get_id(),
    AID: aid,
    voteSide: team
  };
  try {
    const url = `http://localhost:8081/vote/vote`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user_vote)
    });
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with error ${error.error}`);
      home_error_message.value = error.error;
    } else {
      console.log(`Successfully voted for ${team} on argument ${aid}`);
      get_args(); // Refresh arguments to reflect the new vote counts
    }
  } catch (err) {
    console.error(`Error voting for ${team}: ${err}`);
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

function calculateRectangleStyle(t1Votes: number, t2Votes: number) {
  const totalVotes = t1Votes + t2Votes;
  if (totalVotes === 0) return { backgroundColor: 'rgb(128, 128, 128)' }; // Neutral color if no votes

  const redComponent = Math.max(0, 255 * (t1Votes / totalVotes));
  const blueComponent = Math.max(0, 255 * (t2Votes / totalVotes));
  return {
    backgroundColor: `rgb(${redComponent}, 0, ${blueComponent})`,
  };
}

function calculateIndicatorStyle(t1Votes: number, t2Votes: number) {
  const totalVotes = t1Votes + t2Votes;
  if (totalVotes === 0) return { left: '50%' }; // Center if no votes

  const position = (t1Votes / totalVotes) * 100;
  return {
    left: `${position}%`,
  };
}

</script>

<template>
  <div class="feed">
    <div class="post_container">
      <div v-for="p in posts" class="post">
        <h1>{{ p.Comment }}</h1>
        <div v-if="!p.Hyperlink"></div>
        <div v-else>
          <img class="postImg" v-bind:src=p.Hyperlink>
        </div>
        <div style="text-align: left;">
          <input class="likeButton" type="submit" v-bind:value="`Likes: ${p.Likes}`" @click="like_post(p)">
          <input class="replyButton" type="submit"
            v-bind:value="`Replies: ${post_reply_count.has(p.PID) ? post_reply_count.get(p.PID) : 0}`"
            @click="router.push(`replies/post/${p.PID}`)">
        </div>
      </div>
      <div class="argument_container">
        <div v-for="a in args" :key="a.AID" class="argument">
          <h1>{{ a.Comment }} vs {{ a.Hyperlink }}</h1>
          <input type="submit" value="Argue" @click="router.push(`replies/args/${a.AID}`)">
          <div class="arg-bar" :style="calculateRectangleStyle(a.T1_votes, a.T2_votes)">
            <div class="indicator" :style="calculateIndicatorStyle(a.T1_votes, a.T2_votes)"></div>
          </div>
          <div class="vote-buttons">
            <button @click="voteForTeam(a.AID, 'T1')">Vote for Team 1</button>
            <button @click="voteForTeam(a.AID, 'T2')">Vote for Team 2</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.feed {
  position: absolute;
  display: block;
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

.argument {
  margin-top: 4.901960784313725490196078431373%;
  text-align: center;
  display: block;
  background-color: #708090;
  border-radius: 25px;
  padding: 50px;
  gap: 20px;
}

.postImg {
  max-width: 450px;
  max-height: 300px;
}

.arg-bar {
  width: 30vw;
  height: 5vh;
  position: relative;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-top: 10px;
}

.indicator {
  width: 4px;
  height: 100%;
  background-color: black;
  position: absolute;
}

.vote-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
