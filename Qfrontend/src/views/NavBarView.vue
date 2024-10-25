<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div ref="el">
      <div class="full">
        <div class="logo">
          <span class="logospan">Quarrel</span>
        </div>

        <div class="leftNavBarDiv1">
          <nav class="leftNavBarNav" aria-label="Primary" role="Navigation">
            <RouterLink to="/home">
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
            <RouterLink to="/create">
              <div class="leftNavBarDiv2">
                <div class="leftNavBarDiv3">
                  <svg class="leftNavBarSvg" view-box="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="placeholder"></path>
                    </g>
                  </svg>
                </div>
                <div class="leftNavBarDiv4">
                  <span class="leftNavBarSpan" style="text-overflow:unset;">Create</span>
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
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  overflow: hidden;
}

.full {
  height: 100%;
  width: 25.78125%;
  border-right: 1px solid var(--color-border);
  position: fixed;
  left: 0rem;
  top: 0rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:hover {
  background-color: violet;
}

.logo {
  position: absolute;
  left: 6rem;
  top: 0.5rem;
  font-size: 3rem;
  text-align: left;
  color: white;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
}

.leftNavBarNav {
  height: 552.75px;
  width: 285px;
}

.leftNavBarDiv1 {
  height: 552.75px;
  width: 259px;
  position: absolute;
  left: 8rem;
  top: 5rem;
}

.leftNavBarA {
  height: 50.25px;
  width: 259px;
}

.leftNavBarDiv2 {
  height: 50.25px;
  width: 250px;
  color: white;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
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
  width: 250px;
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

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
