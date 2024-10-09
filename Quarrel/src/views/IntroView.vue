<template>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="intro">
          <h1>Welcome to Quarrel!</h1>
          <br/>
          <p>Do you like to argue? Quarrel is the time and the place for that. Sign up, pick a side, duke it out, or vote on a winner in another argument!</p>
          <br/>
          <p>We have lots of communities to choose from where you can make friends and enemies. If you can't find a community that you are interested in, make your own!</p>
          <br/>
          <p>Interested? You can log in or sign up by clicking the link below!</p>
          <button @click="goToSignUp">Log in or Sign Up</button>
      </div> 
    </header>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goToSignUp = () => {
    router.push('/login') 
  }
  </script>

  <style>
      .intro {
        color: navy;
        font-family: Georgia, serif;
        font-weight: bold;
        font-size: 20px;
    }

    .intro input {
        display: block;
        width: 400px;
        height: 40px;
        padding-left: 20px;
        margin-bottom: 1px;
        border: 3px solid navy;
        border-radius: 5px;
    }
  
    .intro button {
        width: 400px;
        height: 40px;
        border: 3px solid navy;
        background-color: navy;
        color: white;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 5px;
    }
  
    .intro button:hover {
        background-color: darkblue;
    }

    body {
        background-image: linear-gradient(mediumpurple, thistle);
    }
  </style>