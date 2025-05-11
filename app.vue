<template>
  <div>
    <NavBar />
    <NuxtPage />
  </div>
</template>

<script setup>
import { NavBar } from '#components';
import { onMounted } from 'vue';

onMounted(() => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = localStorage.getItem('spotify_access_token');

    const player = new Spotify.Player({
      name: 'Nuxt Spotify Player',
      getOAuthToken: cb => cb(token),
      volume: 0.8
    });

    player.addListener('ready', ({ device_id }) => {
      console.log('Spotify Player Ready with Device ID', device_id);
      localStorage.setItem('spotify_device_id', device_id);
    });

    player.addListener('initialization_error', e => console.error(e.message));
    player.addListener('authentication_error', e => console.error(e.message));
    player.addListener('account_error', e => console.error(e.message));
    player.addListener('playback_error', e => console.error(e.message));

    player.connect();
    window.spotifyPlayer = player;
  };
});
</script>





