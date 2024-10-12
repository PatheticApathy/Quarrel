<template>
  <div class = "access_page">
    <div class="register">
        <h1>Sign Up</h1> 
        <br/>
        <p>Username: I wouldn't use your real name :)</p>
        <input type="text" v-model="username" placeholder="Enter Username" />
        <br/>
        <p>Email</p>
        <input type="email" v-model="email" placeholder="Enter Email" />
        <br/>
        <p>Password: Shhh! Just between us.</p>
        <input type="password" v-model="password1" placeholder="Enter Password" />
        <br/>
        <input type="password" v-model="password2" placeholder="Confirm Password" />
        <br/>
        <button @click="signupSubmit">Sign Up!</button>
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
    <div class="signin">
        <h1>Log In</h1>
        <br/>
        <p>Username:</p>
        <input type="text" v-model="login_username" placeholder="Enter Username" />
        <br/>
        <p>Password:</p>
        <input type="password" v-model="login_password" placeholder="Enter Password" />
        <br/>
        <button @click="LoginSubmit">Log In!</button>
        <br/> 
        <button>Forgot Password?</button>
        <p v-if="login_errorMessage" style="color: red">{{ this.login_errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'LoginView',
    data() {
        return {
            login_username: '',
            login_password: '',
            login_errorMessage: '',
            username: '',
            email: '',
            password1: '',
            password2: '',
            errorMessage: ''
        }
    },
    setup() {
        const router = useRouter()

        const goToHome = () => {
            router.push('/home') // Navigate to home page after login
        }

        return { goToHome }
    },
    methods: {
        LoginSubmit() {
            if (this.login_username === "" || this.login_password === "") {
                this.login_errorMessage = "Please fill out all fields."
            } else {
                this.login_errorMessage = "Success!"
                this.goToHome() 
            }
        },
        signupSubmit() {
            if (this.username === "" || this.email === "" || this.password1 === "" || this.password2 === "") {
                this.errorMessage = "Please fill out all of the fields"
            } 
            else if (this.password1 !== this.password2) {
                this.errorMessage = "Passwords do not match"
            } 
            else {
                this.registerUser()
            }
        },
        registerUser() {
            const registrationData = {
                username: this.username,
                email: this.email,
                password: this.password1
            }

            fetch('http://127.0.0.1:8000', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response failed')
                }
                return response.json()
            })
            .then(data => {
                this.errorMessage = "Registration successful!"
                console.log(data)
            })
            .catch(error => {
                this.errorMessage = "An error occurred during registration: " + error.message
            })
        }
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
</style>