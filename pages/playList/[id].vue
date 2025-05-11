<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const playlistId = route.params.id;
const playlist = ref(null);
const player = ref(null);

const token = localStorage.getItem('spotify_access_token');

async function waitForSpotifySDK() {
  return new Promise((resolve) => {
    if (window.Spotify) resolve();
    else window.onSpotifyWebPlaybackSDKReady = resolve;
  });
}

async function initializePlayer() {
  await waitForSpotifySDK();

  const spotifyPlayer = new window.Spotify.Player({
    name: 'Nuxt Player',
    getOAuthToken: cb => cb(token),
    volume: 0.5
  });

  spotifyPlayer.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    localStorage.setItem('spotify_device_id', device_id);
  });

  spotifyPlayer.addListener('initialization_error', e => console.error('Init Error', e.message));
  spotifyPlayer.addListener('authentication_error', e => console.error('Auth Error', e.message));
  spotifyPlayer.addListener('account_error', e => console.error('Account Error', e.message));
  spotifyPlayer.addListener('playback_error', e => console.error('Playback Error', e.message));

  await spotifyPlayer.connect();
  player.value = spotifyPlayer;
}

async function getPlaylist() {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  playlist.value = await res.json();
}

async function playTrack(uri) {
  const deviceId = localStorage.getItem('spotify_device_id');
  if (!deviceId) {
    alert('Spotify Web Player not ready yet!');
    return;
  }

  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uris: [uri] })
  });
}
async function pausePlayback() {
  const deviceId = localStorage.getItem('spotify_device_id');
  if (!deviceId) {
    alert('Spotify Web Player not ready yet!');
    return;
  }

  await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

onMounted(async () => {
  await initializePlayer();
  await getPlaylist();
});
</script>

<template>
  <div v-if="playlist" class="playlist-container">
    <h1 class="playlist-title">{{ playlist.name }}</h1>
    <p class="playlist-description">{{ playlist.description }}</p>

    <button class="stop-btn" @click="pausePlayback">⏹ Stop</button>

    <div class="track" v-for="item in playlist.tracks.items" :key="item.track.id">
      <img :src="item.track.album.images[0]?.url" class="album-art" />
      <div class="track-info">
        <span class="track-title">{{ item.track.name }}</span>
        <span class="track-artist">{{ item.track.artists.map(a => a.name).join(', ') }}</span>
      </div>
      <button class="play-btn" @click="playTrack(item.track.uri)">▶️ Play</button>
    </div>
  </div>
</template>
<style scoped>
.playlist-container {
  background: #121212;
  color: white;
  padding: 2rem;
  font-family: 'Helvetica Neue', sans-serif;
}

.playlist-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.playlist-description {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #b3b3b3;
}

.track {
  display: flex;
  align-items: center;
  background: #181818;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  transition: background 0.2s ease;
}

.track:hover {
  background: #282828;
}

.album-art {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 1rem;
}

.track-info {
  flex: 1;
}

.track-title {
  font-weight: bold;
  display: block;
}

.track-artist {
  color: #b3b3b3;
  font-size: 0.9rem;
}

.play-btn,
.stop-btn {
  background: #1db954;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.play-btn:hover,
.stop-btn:hover {
  background: #1ed760;
}

.stop-btn {
  margin-bottom: 2rem;
}
</style>

