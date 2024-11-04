<template>
  <div class="edit-page">
      <div class="top-bar">
          <button @click="go_to_profile_page">Back to Profile Page</button>
          <h1>Edit Profile</h1>
          <button @click="update_profile">Save</button>
      </div>
      <div class="upload_background_image">
          <button>
              <img src="../assets/upload-image.png" alt="Clickable Image" style="width: 50px; height: 50px;">
          </button>
      </div>
      <span class="dot"></span>
      <div class="upload_profile_pic">
          <button>
              <img src="../assets/upload-image.png" alt="Clickable Image" style="width: 50px; height: 50px;">
          </button>
          <input type="text" v-model="profile_pic_edit" placeholder="enter profile pic URL">
      </div>
      <div class="edit-name">
          <p>Name:</p>
          <input type="text" v-model="username_edit" placeholder="Enter new username...">
      </div>
      <div class="edit-bio">
          <p>Bio:</p>
          <input type="text" v-model="bio_edit" placeholder="Enter new bio...">
      </div>
  </div>
  <Navbar />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Navbar from './NavBarView.vue';
import { ref } from 'vue';

const router = useRouter();

// State variables to hold the new name and bio input
const username_edit = ref('');
const bio_edit = ref('');
const profile_pic_edit = ref('');

// Navigation back to profile page
function go_to_profile_page(){
  router.push("/profile");
}

// Function to send the updated profile information to the server
async function update_profile() {
// Fetching the client ID from local storage
const clientId = localStorage.getItem('QuarrelSessionID');

// Check if client ID exists before proceeding
if (!clientId) {
  console.error("Client ID not found in local storage.");
  return;
}

console.log(`Updating profile for client ID: ${clientId}`);

// Constructing the updated user object
const updatedUser : UpdateUser = {
  Username: username_edit.value,
  Bio: bio_edit.value,
  ProfilePic: profile_pic_edit.value
};

try {
  const response = await fetch(`http://localhost:8081/user/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    // Log detailed error if request fails
    const errorData = await response.json();
    console.error(`Failed to update profile. Status: ${response.status}, Error: ${errorData.error}`);
  } else {
    // Confirm successful update
    console.log('Profile updated successfully');
    go_to_profile_page(); // Navigate back to the profile page
  }
} catch (error) {
  console.error(`Error updating profile: ${error}`);
}
}
</script>

<style>
.edit-page { 
    display: flex;
    flex-direction: column;
}
.top-bar {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 67vw;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    padding: 20px;
}

.upload_background_image button {
    background-color: transparent;
    border: 0px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    position: absolute;
    top: 27vh;
    right: 27vw; 
}

.dot {
    height: 150px;
    width: 150px;
    background-color: #d095e5;
    border-radius: 50%;
    position: absolute;
    top: 225px;
    left: 575px;
}

.upload_profile_pic button {
    background-color: transparent;
    position: absolute;
    top: 250px;
    left: 600px;
    border: 0px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
}

.upload_profile_pic input {
  position: absolute;
  top: 60vh;
  right: 40vw;
  width: 20vw;
}

.edit-name {
    position: absolute;
    top: 70vh;
    right: 5vw;
}

.edit-bio {
    position: absolute;
    top: 85vh;
    right: 5vw;
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

  @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

input {
  display: block;
  width: 60vw;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 1px;
  border: 3px solid navy;
  border-radius: 5px;
}

</style>