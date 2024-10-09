<script setup lang="ts">
import SignUp from './SignupView.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="signin">
        <h1>Log In</h1>
        <br/>
        <p>Username:</p>
        <input type="text" placeholder="Enter Username" />
        <br/>
        <p>Password:</p>
        <input type="password" placeholder="Enter Password" />
        <br/>
        <button>Log In!</button>
        <br/>
        <button>Forgot Password?</button>
    </div>
    <SignUp />
</template>


<style>
    .signin {
        color: navy;
        font-family: Georgia, serif;
        font-weight: bold;
        font-size: 15px;
        position: absolute;
        top: 5rem;
        left: 20rem;
    }
    .signin input {
        display: block;
        width: 300px;
        height: 40px;
        padding-left: 20px;
        margin-bottom: 5px;
        border: 3px solid navy;
        border-radius: 5px;
    }
  
    .signin button {
        width: 300px;
        height: 40px;
        border: 3px solid navy;
        background-color: navy;
        color: white;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 5px;
    }
  
    .signin button:hover {
        background-color: darkblue;
    }
</style>