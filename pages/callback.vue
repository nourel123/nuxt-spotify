<template>
    <div class="spotify-connect">
      <h2>Connect your Spotify account</h2>
      <button @click="connectToSpotify">Connect to Spotify</button>
    </div>
  </template>
  
  <script setup>
import { onMounted } from 'vue'

const config = useRuntimeConfig()

const connectToSpotify = () => {
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${config.public.spotifyClientId}&response_type=code&redirect_uri=${encodeURIComponent(config.public.spotifyRedirectUri)}&scope=user-read-email playlist-read-private`;
  window.location.href = spotifyAuthUrl;
}

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    try {
      console.log("🔄 Exchanging code for token...");
      const response = await $fetch('/api/spotify-token', {
        method: 'GET',
        params: { code },
      });

      const { access_token, refresh_token, expires_in } = response;
      if (access_token) {
        console.log("✅ Access token obtained:", access_token);
        localStorage.setItem('spotify_access_token', access_token);
        localStorage.setItem('spotify_refresh_token', refresh_token);
        localStorage.setItem('spotify_token_expiry', Date.now() + expires_in * 1000);
        
        // Redirect to home after a short delay to ensure storage
        setTimeout(() => navigateTo('/home'), 100);
      } else {
        console.error("❌ No access token received");
      }
    } catch (error) {
      console.error("❌ Error during token exchange:", error);
    }
  } else {
    console.error("❌ No code found in URL");
  }
});
</script>

  
  <style scoped>
  .spotify-connect {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #121212;
    color: white;
    font-family: sans-serif;
  }
  
  button {
    background-color: #1DB954;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 30px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #1ed760;
  }
  </style>
  