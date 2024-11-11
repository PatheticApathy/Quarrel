<script setup lang="ts">
import { computed, ref } from 'vue';
import Navbar from './NavBarView.vue';

const teamAVotes = ref(100);
const teamBVotes = ref(70);

const totalVotes = computed(() => teamAVotes.value + teamBVotes.value);

const rectangleStyle = computed(() => {
  const redComponent = Math.max(0, 255 * (teamAVotes.value / totalVotes.value));
  const blueComponent = Math.max(0, 255 * (teamBVotes.value / totalVotes.value));
  return {
    backgroundColor: `rgb(${redComponent}, 0, ${blueComponent})`,
  };
});

const indicatorStyle = computed(() => {
  const position = (teamAVotes.value / totalVotes.value) * 100;
  return {
    left: `${position}%`,
  };
});
</script>

<template>
  <div class="rectangle" :style="rectangleStyle">
    <div class="indicator" :style="indicatorStyle"></div>
  </div>
  <Navbar />
</template>

<style scoped>
.rectangle {
  width: 40vw;
  height: 7vh;
  position: absolute;
  margin: 0 auto;
  border: 1px solid #ccc;
  margin-left: 40vw;
  margin-top: 20vh;
  border-radius: 20px;
}
.indicator {
  width: 2px;
  height: 100%;
  background-color: black;
  position: absolute;
}
</style>
