<template>
  <div class="profile-container">
    <div v-if="profile" class="profile-content">
      <h1 class="profile-name">{{ profile.name }}</h1>
      <p class="profile-email">{{ profile.email }}</p>

      <div v-if="profile.topItems && profile.topItems.length > 0">
        <h2 class="profile-top-tracks-title">Your Top Tracks:</h2>
        <ul class="profile-top-tracks">
          <li v-for="item in profile.topItems" :key="item.id" class="track-item">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="loading-text">Loading profile data...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const profile = ref(null);

async function fetchProfile() {
  try {
    const token = localStorage.getItem('spotify_access_token');
    const profileRes = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    profile.value = await profileRes.json();

    const topTracksRes = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    profile.value.topItems = await topTracksRes.json();
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
}

onMounted(fetchProfile);
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000; /* Black background */
  color: #fff; /* White text */
  font-family: 'Segoe UI', sans-serif;
}

.profile-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  background-color: #121212; /* Spotify dark gray */
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.profile-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile-email {
  font-size: 1rem;
  color: #b3b3b3; /* Spotify gray */
  margin-bottom: 20px;
}

.profile-top-tracks-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile-top-tracks {
  list-style: none;
  padding: 0;
}

.track-item {
  font-size: 1rem;
  margin: 5px 0;
  color: #fff;
}

.loading-text {
  font-size: 1rem;
  color: #b3b3b3; /* Spotify gray */
}
</style>
