<template>
  <div class="access_page">
    <div class="register">
      <h1>Sign Up</h1>
      <br />
      <p>Username: I wouldn't use your real name :)</p>
      <input type="text" v-model="user.username" placeholder="Enter Username" />
      <br />
      <p>Email</p>
      <input type="email" v-model="user.email" placeholder="Enter Email" />
      <br />
      <p>Password: Shhh! Just between us.</p>
      <input type="password" v-model="user.password" placeholder="Enter Password" />
      <br />
      <input type="password" v-model="user.password2" placeholder="Confirm Password" />
      <br />
      <button @click="signupSubmit">Sign Up!</button>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
    <div class="signin">
      <h1>Log In</h1>
      <br />
      <p>Username:</p>
      <input type="text" v-model="login.username" placeholder="Enter Username" />
      <br />
      <p>Password:</p>
      <input type="password" v-model="login.password" placeholder="Enter Password" />
      <br />
      <button @click="signupSubmit()">Log In!</button>
      <br />
      <button>Forgot Password?</button>
      <!--<p v-if="login_errorMessage" style="color: red">{{ login_errorMessage }}</p>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

//models
interface Signup {
  username: string,
  password: string,
  password2: string,
  email: string,
}

interface Login {
  username: string,
  password: string,
}

const login_template: Login = {
  username: '',
  password: ''
}

const signup_template: Signup = {
  username: '',
  password: '',
  password2: '',
  email: ''
}

const router = useRouter()
const user = ref<Signup>(signup_template);
const login = ref<Login>(login_template);
var errorMessage = defineModel<string>();
//var login_errorMessage = defineModel<string>();

//functions
function goToHome() {
  router.push('/home') // Navigate to home page after login
}

function signupSubmit() {
  const signup_attempt = user.value
  if (signup_attempt === undefined) {
    errorMessage.value = "Please fill out all of the fields";
  }
  if (signup_attempt.username === "" || signup_attempt.email === "" || signup_attempt.password === "" || signup_attempt.password2 === "") {
    errorMessage.value = "Please fill out all of the fields";
  }
  else if (signup_attempt.password !== signup_attempt.password2) {
    errorMessage.value = "Passwords do not match";
  }
  else {
    registerUser();
  }
}

async function registerUser() {
  console.log('Sending Login info');
  const json: User = {
    UID: 0,
    Username: user.value.username,
    Password: user.value.password,
    Follow_count: 0


  }
  console.log(json);
  try {
    const resp = await fetch('http://localhost:8081/user/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      }
    );
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }
    const johnny = await resp.json();
    console.log(johnny);
    //const logged_user: User = JSON.parse(await resp.json());
    //console.log(logged_user);
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}
</script>

<style>
.access_page {
  display: flex;
  justify-content: space-between;
  gap: 100px;
}

.signin {
  color: white;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  position: absolute;
  top: 60px;
  left: 700px;
}

.signin input {
  display: block;
  width: 500px;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 1px;
  border: 3px solid navy;
  border-radius: 5px;

}

.signin button {
  width: 500px;
  height: 40px;
  border: 0px solid navy;
  background-color: navy;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 0px;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  margin-top: 20px;
  border-radius: 20px;
}

.signin button:hover {
  background-color: violet;
  animation: bubble 1s ease-out;
}

.signin button {
  width: 500px;
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

.register {
  color: white;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  font-size: 15px;
  position: absolute;
  top: 60px;
  left: 100px;
}

.register input {
  display: block;
  width: 500px;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 1px;
  border: 3px solid navy;
  border-radius: 5px;
}

.register button {
  width: 500px;
  height: 40px;
  border: 3px solid navy;
  background-color: navy;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}

.register button:hover {
  background-color: darkblue;
}

.register input {
  display: block;
  width: 500px;
  height: 40px;
  padding-left: 20px;
  margin-bottom: 1px;
  border: 3px solid navy;
  border-radius: 5px;
}

.register button {
  width: 500px;
  height: 40px;
  border: 0px solid navy;
  background-color: navy;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 0px;
  font-family: 'Verdana', 'sans-serif';
  font-weight: 900;
  margin-top: 20px;
  border-radius: 20px;
}

.register button:hover {
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
