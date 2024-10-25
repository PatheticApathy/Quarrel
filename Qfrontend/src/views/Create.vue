<script setup lang="ts">
import Navbar from './NavBarView.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

//TODO: argumnets have not been implemented yet. Wil have to decide next sprint probably
const content_type = ref<string>("post");
const comment = ref<string>("");
const hyperlink = ref<string>("");

function create_content() {
  if (content_type.value === "post") {
    "pass";
  } else {
    "pass"
  }

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
          <label label for="args">Arguents</label>
          <input v-model="content_type" type="radio" id="post" value="post" />
          <label for="post">Post</label>
        </div>
      </div>
      <div>
        <textarea v-model="comment" id="comment" cols="100" rows="40" width="500" maxlength="280" name="comment"
          placeholder="Insert Comment here"></textarea>
        <input v-model="hyperlink" type="text">
      </div>
    </div>
  </div>
</template>
