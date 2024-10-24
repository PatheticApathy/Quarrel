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
      <button @click="signup_submit">Sign Up!</button>
      <p v-if="signup_error_message" style="color: red">{{ signup_error_message }}</p>
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
      <button @click="request_login">Log In!</button>
      <br />
      <button @click="go_to_home">Forgot Password?</button>
      <p v-if="login_error_message" style="color: red">{{ login_error_message }}</p>
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
var signup_error_message = ref<string>("");
var login_error_message = ref<string>("");


//on load
get_id()

//functions
function go_to_home() {
  router.push('/home') // Navigate to home page after login
}

function signup_submit() {
  const signup_attempt = user.value
  if (signup_attempt.username === "" || signup_attempt.email === "" || signup_attempt.password === "" || signup_attempt.password2 === "") {
    signup_error_message.value = "Please fill out all of the fields";
  }
  else if (signup_attempt.password !== signup_attempt.password2) {
    signup_error_message.value = "Passwords do not match";
  }
  else {
    register_user();
  }
}

async function register_user() {
  console.log('Sending Signup info');
  const user_json: User = {
    UID: 0,
    Username: user.value.username,
    Password: user.value.password,
    Follow_count: 0,
    Bio: "blah"
  }
  try {
    const resp = await fetch('http://localhost:8081/user/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user_json),
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      signup_error_message.value = error.error;
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
    } else {
      const id: UID = await resp.json();
      console.log(`Logged in with id: ${id.UID}`);
      create_client_id(id.UID);
      go_to_home();
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}

async function request_login() {
  console.log('Sending Login info');
  try {
    const resp = await fetch('http://localhost:8081/user/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login.value),
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      login_error_message.value = error.error;
    } else {
      const id: UID = await resp.json();
      console.log(`Logged in with id: ${JSON.stringify(id)}`);
      create_client_id(id.UID);
      go_to_home();
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }

}

function create_client_id(client_id: number): void {
  localStorage.setItem('QuarrelSessionID', String(client_id));
}

function get_id() {
  const client_id = localStorage.getItem('QuarrelSessionID');
  if (!client_id) {
    return;
  } else {
    go_to_home()
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
