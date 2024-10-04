<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>

    <div class="logo">
      <span class="logospan">Quarrel</span>
    </div>
    
    <div class="leftNavBarDiv1">
      <nav class="leftNavBarNav" aria-label="Primary" role="Navigation">
        <RouterLink to="/">
          <div class="leftNavBarDiv2">
            <div class="leftNavBarDiv3">
              <svg class="leftNavBarSvg" view-box="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="placeholder"></path>
                </g>
              </svg>
            </div>
            <div class="leftNavBarDiv4">
              <span class="leftNavBarSpan" style="text-overflow:unset;">Home
              </span>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/about">
          <div class="leftNavBarDiv2">
            <div class="leftNavBarDiv3">
              <svg class="leftNavBarSvg" view-box="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="placeholder"></path>
                </g>
              </svg>
            </div>
            <div class="leftNavBarDiv4">
              <span class="leftNavBarSpan" style="text-overflow:unset;">About</span>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/explore">
          <div class="leftNavBarDiv2">
            <div class="leftNavBarDiv3">
              <svg class="leftNavBarSvg" view-box="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="placeholder"></path>
                </g>
              </svg>
            </div>
            <div class="leftNavBarDiv4">
              <span class="leftNavBarSpan" style="text-overflow:unset;">Explore</span>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/messages">
          <div class="leftNavBarDiv2">
            <div class="leftNavBarDiv3">
              <svg class="leftNavBarSvg" view-box="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="placeholder"></path>
                </g>
              </svg>
            </div>
            <div class="leftNavBarDiv4">
              <span class="leftNavBarSpan" style="text-overflow:unset;">Messages (Coming Soon)</span>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/profile">
          <div class="leftNavBarDiv2">
            <div class="leftNavBarDiv3">
              <svg class="leftNavBarSvg" view-box="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="placeholder"></path>
                </g>
              </svg>
            </div>
            <div class="leftNavBarDiv4">
              <span class="leftNavBarSpan" style="text-overflow:unset;">Profile</span>
            </div>
          </div>
        </RouterLink>
      </nav>
    </div>

    <div class="post">
      <RouterLink to="/compose/post">
    </div>

  </header>

  <RouterView />
</template>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

.logo {
  position: absolute;
  left: 10rem;
  top: 0.5rem;
  font-size: 3rem;
  text-align: left;
  color: navy;
}

.post {
  background-color: violet;
  display: circle;
}

.postButton {
  background-color: violet;
  border-color: violet;
  display: ;
}

.leftNavBarNav {
  height: 552.75px;
  width: 285px;
  border-right: 1px solid var(--color-border);
}

.leftNavBarDiv1 {
  height: 552.75px;
  width: 259px;
  position: absolute;
  left: 12rem;
  top: 5rem;
}

.leftNavBarA {
  height: 50.25px;
  width: 259px;
}

.leftNavBarDiv2 {
  height: 50.25px;
  width: 250px;
  color: navy;
}

.leftNavBarDiv2:hover {
  color: darkblue;
}

.leftNavBarDiv3 {
  height: 26.25px;
  width: 26.25px;
}

.leftNavBarSvg {
  height: 26.25px;
  width: 26.25px;
}

.leftNavBarDiv4 {
  height: 55.1334px;
  width: 200px;
}

.leftNavBarSpan {
  height: 55.1334px;
  width: 200px;
}

g {
  height: 23px;
  width: 21.8833px;
}

path {
  height: 23px;
  width: 21.8833px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
