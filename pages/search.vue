<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const results = ref([]);
const token = localStorage.getItem('spotify_access_token');

async function searchSpotify(query) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  results.value = data.tracks?.items || [];
}

onMounted(() => {
  const query = route.query.q;
  if (query) {
    searchSpotify(query);
  }
});
</script>

<template>
    <div class="container">
      <h1 class="title">Search Results for "{{ $route.query.q }}"</h1>
  
      <div v-if="results.length" class="track-row">
        <div v-for="track in results" :key="track.id" class="track-card">
          <img :src="track.album.images[0]?.url" alt="cover" class="track-image" />
          <div class="track-info">
            <h2 class="track-name">{{ track.name }}</h2>
            <p class="track-artists">{{ track.artists.map(a => a.name).join(', ') }}</p>
          </div>
        </div>
      </div>
  
      <p v-else class="loading">No results found.</p>
    </div>
  </template>
<style scoped>
.container {
  background-color: #0f0f0f;
  min-height: 100vh;
  padding: 40px;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
}

.track-row {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.track-card {
  background-color: #1a1a1a;
  border-radius: 16px;
  width: 240px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.track-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
}

.track-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.track-info {
  padding: 16px;
}

.track-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artists {
  font-size: 14px;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loading {
  color: #aaa;
  margin-top: 20px;
}
</style>
  
