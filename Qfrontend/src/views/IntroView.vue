<template>
    <header>
      <div class = "intro_page">
      <div class = "letter">
        <img src="../assets/Quarrel_letter.svg" width = 500 height = 600>
      </div>
      <div class="intro">
          <h1>Happening Now</h1>
          <br/>
          <p>Do you like to argue? Quarrel is the time and the place for that. Sign up, pick a side, duke it out, or vote on a winner in another argument!</p>
          <br/>
          <p>We have lots of communities to choose from where you can make friends and enemies. If you can't find a community that you are interested in, make your own!</p>
          <br/>
          <p>Interested? You can log in or sign up by clicking the link below!</p>
          <button @click="goToSignUp">Log in or Sign Up</button>
      </div> 
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

  <style scoped>
  .intro_page {
    display: flex;
    justify-content: space-between;
    gap: 100px;
    color: white;

    }

  .letter {
    position: absolute;
    top: 0px;
    left: 80px;
    filter: invert(100%);
  }

  .intro {
    position: absolute;
    top: 100px;
    left: 650px;
    margin-right: 40px;
  }

  h1 {
    font-size: 70px;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
  }

  p {
    font-size: 15px;
    font-family: 'Verdana', 'sans-serif';
    font-weight: 900;
  }
  </style>