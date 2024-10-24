<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { ref } from 'vue'

const posts = ref<Array<Post>> (
  [
  {
    PID: 72,
    Comment: "Jeffey",
    Likes: 32,
    Views: 7,
    Poster: 0,
    Hyperlink: ""
  },
  {
    PID: 27,
    Comment: "This shit may or may not work",
    Likes: 5000000000,
    Views: 0,
    Poster: 2,
    Hyperlink: "https://imgs.search.brave.com/qqE_mtUsi44VqSRHrTcBOrjrwFYeo2FjIh8tpXTs_z8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZ2ljZS5jb20v/Y2RuL3Nob3AvZmls/ZXMvc29uaWMtdGhl/LWhlZGdlaG9nLXgt/a2luZy1pY2UtbWV0/YWwtc29uaWMtbmVj/a2xhY2Uta2luZy1p/Y2UtMzkxNTUyNDk1/NDUzOTEuanBnP3Y9/MTcyNzI5OTMxMyZ3/aWR0aD0xMTAw"
  }
]
)
</script>

<template>
  <div class="post_container">
    <div v-for="p in posts" class="post">
      <h1>{{ p.Comment }}</h1>
        <div v-if="!p.Hyperlink"></div>
        <div v-else>
          <img width="450" height="250"
            v-bind:src=p.Hyperlink>
        </div>
        <div style="text-align: left;">Likes: {{ p.Likes }} Views: {{ p.Views }} Replies: 10</div>        
    </div>
  </div>
</template>

<style>
.post_container {
  position: absolute;
  top: 100px;
  left: 396px;
  height: 100%;
  width: 612px;
}

.post {
  margin-top: 30px;
  text-align: center;
  background-color: #708090;
  border-radius: 25px;
  padding: 20px;
}
</style>
