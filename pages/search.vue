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
      <NuxtLink
        v-for="track in results"
        :key="track.id"
        :to="`/playlist/${track.id}`"
        class="track-card"
      >
        <img :src="track.album.images[0]?.url" alt="cover" class="track-image" />
        <div class="track-info">
          <h2 class="track-name">{{ track.name }}</h2>
          <p class="track-artists">{{ track.artists.map(a => a.name).join(', ') }}</p>
        </div>
      </NuxtLink>
    </div>
    <p v-else class="loading">No results found.</p>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  background: #121212;
  color: #fff;
  min-height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
}

.track-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.track-card {
  display: block;
  width: 200px;
  background-color: #1f1f1f;
  padding: 1rem;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, background-color 0.2s;
}

.track-card:hover {
  background-color: #282828;
  transform: scale(1.05);
}

.track-image {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.track-info {
  text-align: center;
}

.track-name {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.track-artists {
  font-size: 0.9rem;
  color: #b3b3b3;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #b3b3b3;
}
</style>
