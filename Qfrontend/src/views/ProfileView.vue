<script setup lang="ts">
import Navbar from './NavBarView.vue'
import { ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const go_to_edit_profile = () => {
  router.push('/edit-profile') 
}

const go_to_followers = () => {
   router.push('/followers')
}

const go_to_following = () => {
  router.push('/following')
}

const user = ref<User>({
  UID: 12345,
  Username: "Dr. Bowman",
  Password: "imtotallyadoctor",
  Follow_count: 12414,
  Bio: "Finally a doctor! Latech Computer Science"
})
</script>

<template>
    <div class="profile-page">
        <Navbar />
        <div class="profile-content">
            <div class="background-container">
                <img class="background-image" src="../assets/background-image.jpg" alt="Background Image">
                <div class="profile-pic">
                    <img src="../assets/profile-pic.jpg" alt="Profile Picture">
                </div>
            </div>
            <div class="user-info">
                <div class="username">{{ user.Username }}
                  <div class="edit-profile">
                    <button @click="go_to_edit_profile">Edit Profile</button>
                  </div>
                </div>
                <div class="bio">{{ user.Bio }}</div>
                <div class="followers">
                    <button @click="go_to_followers">Followers: {{ user.Follow_count }}</button>
                    <button @click="go_to_following">Following: 0</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-content{
  display: flex;
  flex-direction: column;
}
/* Layout container for the profile page */
.profile-page {
    display: flex;
    flex-direction: column;
    width: 100%;
}

/* Container for background image and profile picture */
.background-container {
    position: absolute; /* Set it to cover the entire viewport */
    top: 0; /* Align it to the top */
    right: 0; /* Align it to the left */
    width: 75vw; /* Full width of the viewport */
    height: 40vh; /* Full height of the viewport */
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    z-index: -1; /* Make sure it's behind other elements */
}
.background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(2px);
}

/* Profile picture styling and overlap */
.profile-pic {
    position: absolute;
    bottom: -75px; /* Overlapping the bottom of the background image */
    left: 100px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 5px solid white;
    overflow: hidden;
}

.profile-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* User info section: username, bio, and followers */
.user-info {
    display: flex;
    flex-direction: column;
    margin-left: -150px; /* Push to the right of profile picture */
    margin-top: 100px;
    gap: 30px;
}

.username {
    font-size: 1.8rem;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    display: flex;
    flex-direction: row;
}

.bio {
    font-size: 1.2rem;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    max-width: 400px;
}

.followers {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    flex-wrap: wrap; /* Ensure it stays contained */
}

.followers button {
    border-radius: 20px;
    background-color: navy;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    cursor: pointer;
}

/* Edit profile button styling */
.edit-profile {
    position: absolute;
    top: 370px; /* Placed to the right of the profile info */
    right: 200px;
}

.edit-profile button {
    background-color: navy;
    color: white;
    border-radius: 50px;
    padding: 15px 30px;
    font-size: 1rem;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
    cursor: pointer;
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
</style>

