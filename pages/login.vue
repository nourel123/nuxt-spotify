<template>
  <div class="auth-page">
    <div class="auth-box">
      <h2>Login to Nuxt Spotify</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
        

      </form>
      <p>Don't have an account? <NuxtLink to="/signup">Sign Up</NuxtLink></p>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()


import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
const email = ref('')
const password = ref('')
const { $auth } = useNuxtApp()

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword($auth, email.value, password.value)
    navigateTo('/callback')
  } catch (err) {
    alert(err.message)
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000000;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.auth-box {
  background-color: #181818;
  padding: 50px 40px;
  border-radius: 16px;
  width: 360px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
}

.auth-box h2 {
  margin-bottom: 24px;
  font-size: 26px;
  font-weight: 600;
  color: #ffffff;
}

.auth-box input {
  display: block;
  width: 100%;
  margin-bottom: 18px;
  padding: 14px 16px;
  border-radius: 30px;
  border: 1px solid #333;
  background-color: #121212;
  color: #fff;
  font-size: 15px;
  transition: border 0.2s ease, background-color 0.2s ease;
}

.auth-box input:focus {
  border-color: #1fd662;
  background-color: #1a1a1a;
  outline: none;
}

.auth-box input::placeholder {
  color: #aaaaaa;
}

.auth-box button {
  background-color: #1fd662;
  color: #000;
  padding: 14px 0;
  border: none;
  width: 100%;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  transition: background-color 0.3s ease;
}

.auth-box button:hover {
  background-color: #25f46b;
}

.auth-box p {
  margin-top: 20px;
  font-size: 13px;
  color: #bbbbbb;
}

.auth-box p a {
  color: #1fd662;
  text-decoration: none;
  font-weight: 600;
}

.auth-box p a:hover {
  text-decoration: underline;
}
</style>

