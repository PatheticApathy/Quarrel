<template>
    <div class="back">
        <button @click="go_to_profile_page">Back to Profile Page</button>
        <h1>Followers</h1>
    </div>
    <div class="save">
        <button @click="go_to_profile_page">Save</button>
    </div>
    <div class="followers">
        <!-- Use v-for to iterate through the followers array -->
        <button v-for="(follower, index) in followers" :key="index" class="follower-button">
            <div id="rectangle">
                <img :src="follower[1]" width="50" height="50">
                <span class="follower-name">{{ follower[0] }}</span>
            </div>
        </button>
    </div>
    <Navbar />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Navbar from './NavBarView.vue'
const router = useRouter();

function go_to_profile_page() {
    router.push("/profile");
}

let followers = [
    ["champ", "../assets/champ-profile-pic.jpg"],
    ["alex", "../assets/alex-profile-pic.jpg"],
    ["jordan", "../assets/jordan-profile-pic.jpg"]
];
</script>

<style>
.back button {
    border-radius: 20px;
    background-color: navy;
    color: white;
    padding: 20px;
    font-size: 15px;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    position: absolute;
    top: 20px;
    left: 480px;
}

.back h1 {
    position: absolute;
    top: 25px;
    left: 730px;
}

.save button {
    border-radius: 20px;
    background-color: navy;
    color: white;
    padding: 20px;
    font-size: 15px;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    position: absolute;
    top: 20px;
    left: 1250px;
}

button:hover {
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

#rectangle {
    width: 800px;
    height: 50px;
    background-color: violet;
    display: flex;
    align-items: center;
}

.followers {
    position: absolute;
    top: 100px;
    left: 480px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.follower-button {
    background-color: violet;
    display: flex;
    align-items: center;
    padding: 5px;
    border: none;
    width: fit-content;
}

.followers button{
    background-color: violet;
}

.followers img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 2px solid black;
    margin-right: 10px;
}

.follower-name {
    font-size: 18px;
    font-weight: bold;
    color: white;
}
</style>
