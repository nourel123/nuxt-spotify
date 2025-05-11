<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const playlistId = route.params.id;
const playlist = ref(null);
const token = localStorage.getItem('spotify_access_token');

async function getPlaylist() {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  playlist.value = await res.json();
}

async function playTrack(uri) {
  const token = localStorage.getItem('spotify_access_token');
  const deviceId = localStorage.getItem('spotify_device_id');

  if (!deviceId) {
    alert('Player not ready yet. Please wait...');
    return;
  }

  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: [uri]
    }),
  });
}

onMounted(getPlaylist);
</script>
<template>
  <div v-if="playlist">
    <h1>{{ playlist.name }}</h1>
    <p>{{ playlist.description }}</p>

    <div v-for="item in playlist.tracks.items" :key="item.track.id" class="track">
      <img :src="item.track.album.images[0]?.url" width="60" />
      <span>{{ item.track.name }} - {{ item.track.artists.map(a => a.name).join(', ') }}</span>
      <button @click="playTrack(item.track.uri)">▶️ Play</button>
    </div>
  </div>
</template>
<style scoped>
/* General container styles */
div {
  background-color: #121212; /* Spotify dark background */
  color: #fff; /* White text */
  padding: 20px;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
  color: #b3b3b3; /* Lighter text for description */
  margin-bottom: 20px;
}

/* Track list styles */
.track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181818; /* Slightly lighter than the page background */
  border-radius: 5px;
  margin: 10px 0;
  padding: 15px;
  transition: background-color 0.3s ease;
}

.track:hover {
  background-color: #282828; /* Lighter shade on hover */
}

/* Track image */
.track img {
  border-radius: 5px;
  margin-right: 15px;
  transition: transform 0.2s ease;
}

.track img:hover {
  transform: scale(1.1); /* Zoom effect on hover */
}

/* Track name and artist text */
.track span {
  flex-grow: 1;
  font-size: 1.1rem;
  color: #b3b3b3; /* Lighter color for track name and artist */
}

/* Play button styles */
.track button {
  background-color: #1db954; /* Spotify green */
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.track button:hover {
  background-color: #1ed760; /* Darker green on hover */
}

/* For larger screens, make it responsive */
@media (max-width: 768px) {
  .track {
    flex-direction: column;
    text-align: center;
  }

  .track img {
    margin-bottom: 10px;
  }
}
</style>
