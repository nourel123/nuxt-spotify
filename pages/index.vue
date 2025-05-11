<template>
    <div>
      <h1>Welcome to Nuxt Spotify 🎵</h1>
      
      <p>This is a clone of Spotify using Nuxt 3 + Firebase.</p>
  
      <NuxtLink to="/login">Login</NuxtLink> |
      <NuxtLink to="/signup">Sign Up</NuxtLink>
    </div>
  </template>
  
  <script setup>
  </script>
<style scoped>
div {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 24px;
  font-weight: 700;
}

p {
  font-size: 1.15rem;
  margin-bottom: 20px;
  color: #b3b3b3;
}

a {
  color: #1fd662;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

a:hover {
  text-decoration: underline;
  color: #25f46b;
}
</style>
