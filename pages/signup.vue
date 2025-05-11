<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
      <p>Already have an account? <NuxtLink to="/login">Login</NuxtLink></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  const email = ref('')
  const password = ref('')
  const { $auth } = useNuxtApp()
  
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword($auth, email.value, password.value)
      navigateTo('/login')
    } catch (err) {
      alert(err.message)
    }
  }
  </script>
  
  <style scoped>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #ffffff;
    padding: 20px;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 340px;
    background-color: #181818;
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  }
  
  input {
    margin-bottom: 1rem;
    padding: 14px 16px;
    border: 1px solid #333;
    border-radius: 30px;
    font-size: 15px;
    background-color: #121212;
    color: #ffffff;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }
  
  input:focus {
    border-color: #1fd662;
    background-color: #1a1a1a;
    outline: none;
  }
  
  input::placeholder {
    color: #b3b3b3;
  }
  
  button {
    padding: 14px 0;
    border: none;
    border-radius: 30px;
    background-color: #1fd662;
    color: #000;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #25f46b;
  }
  
  p {
    margin-top: 20px;
    font-size: 13px;
    color: #bbbbbb;
  }
  
  p a {
    color: #1fd662;
    text-decoration: none;
    font-weight: 600;
  }
  
  p a:hover {
    text-decoration: underline;
  }
  </style>
  