<template>
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
</template>
  
<script>
    export default {
        name: 'SignupView',
        data() {
            return {
                username: '',
                email: '',
                password1: '',
                password2: '',
                errorMessage: ''
            };
        },
        methods: {
            signupSubmit() {
                if (this.username === "" || this.email === "" || this.password1 === "" || this.password2 === "") {
                    this.errorMessage = "Please fill out all of the fields";
                }
                else if(this.password1 != this.password2) {
                    this.errorMessage = "Passwords do not match";
                } 
                else {
                    this.registerUser();
                }
                
            },
            registerUser() {
                this.errorMessage = "Success!";
            }
        }
    }
</script>
  
<style>
    .register {
        color: navy;
        font-family: Georgia, serif;
        font-weight: bold;
        font-size: 15px;
        position: absolute;
        right: 25rem;
        top: 5rem;
    }
    .register input {
        display: block;
        width: 300px;
        height: 40px;
        padding-left: 20px;
        margin-bottom: 5px;
        border: 3px solid navy;
        border-radius: 5px;
    }
  
    .register button {
        width: 300px;
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