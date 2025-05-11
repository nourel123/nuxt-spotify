<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } });
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <NuxtLink to="/">Nuxt Spotify</NuxtLink>
    </div>
    <div class="search">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        placeholder="Search..."
      />
    </div>
    <div class="links">
      <NuxtLink to="/home">Home</NuxtLink>
      <NuxtLink to="/profile">Profile</NuxtLink>
    </div>
  </nav>
</template>


  
  <style scoped>
  .navbar {
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 40px;
    height: 70px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  
  .logo a {
    color: #94ed67;
    font-weight: 700;
    text-decoration: none;
    font-size: 1.6rem;
    letter-spacing: 1px;
  }
  
  .search input {
    padding: 10px 18px;
    border-radius: 50px;
    border: none;
    width: 260px;
    background-color: #1e1e1e;
    color: #fff;
    font-size: 0.95rem;
    outline: none;
    transition: background-color 0.3s ease, box-shadow 0.2s ease;
    box-shadow: inset 0 0 0 1px #333;
  }
  
  .search input:focus {
    background-color: #2a2a2a;
    box-shadow: 0 0 0 2px #1fd662;
  }
  
  .links a {
    margin-left: 30px;
    color: #b3b3b3;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.3s ease;
  }
  
  .links a:hover {
    color: #1fd662;
  }
  </style>
  
