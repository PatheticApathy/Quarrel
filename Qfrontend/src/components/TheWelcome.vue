<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <div class="post_container">
    <div class="post">
      <h1>Post here</h1>
      <div>
        Likes and stuff
        <div>
          <img width="450" height="250"
            src="https://imgs.search.brave.com/qqE_mtUsi44VqSRHrTcBOrjrwFYeo2FjIh8tpXTs_z8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZ2ljZS5jb20v/Y2RuL3Nob3AvZmls/ZXMvc29uaWMtdGhl/LWhlZGdlaG9nLXgt/a2luZy1pY2UtbWV0/YWwtc29uaWMtbmVj/a2xhY2Uta2luZy1p/Y2UtMzkxNTUyNDk1/NDUzOTEuanBnP3Y9/MTcyNzI5OTMxMyZ3/aWR0aD0xMTAw">
        </div>
        <div style="text-align: left;">Likes: 10 Views: 10 Comments: 10</div>
      </div>
    </div>
    <div class='post'>
      <h1>Another post</h1>
      <div>
        blah
      </div>
    </div>
  </div>
</template>

<style>
.post_container {
  position: absolute;
  top: 100px;
  left: 25%;
  height: 100%;
  width: 50%;
}

.post {
  margin-top: 30px;
  text-align: center;
  background-color: #708090;
  border-radius: 25px;
  padding: 20px;
}
</style>
