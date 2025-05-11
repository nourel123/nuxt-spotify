<template>
  <div class="container">
    <h1 class="title">Made For {{ userName }}</h1>

    <div class="playlist-row">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="playlist-card"
        @click="goToPlaylist(playlist.id)"
      >
        <img :src="playlist.firstTrackImage || '/placeholder.png'" class="playlist-image" />
        <div class="playlist-info">
          <h2 class="playlist-name">{{ playlist.name }}</h2>
          <p class="playlist-artists">{{ playlist.artists }}</p>
        </div>
      </div>
    </div>

    <div v-if="!playlists.length" class="loading">Loading playlists...</div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const playlists = ref([]);
const userName = ref('');
const token = localStorage.getItem('spotify_access_token');
const router = useRouter();

async function fetchFirstTrackInfo(playlist) {
  const res = await fetch(playlist.tracks.href + '?limit=1', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const firstTrack = data.items[0]?.track;

  return {
    ...playlist,
    firstTrackImage: firstTrack?.album?.images?.[0]?.url,
    artists: firstTrack?.artists?.map(a => a.name).join(', ') || '',
  };
}

onMounted(async () => {
  try {
    const profileRes = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profileData = await profileRes.json();
    userName.value = profileData.display_name;

    const playlistsRes = await fetch(`https://api.spotify.com/v1/users/${profileData.id}/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const playlistsData = await playlistsRes.json();

    playlists.value = await Promise.all(
      playlistsData.items.map(fetchFirstTrackInfo)
    );
  } catch (err) {
    console.error('Error loading playlists:', err);
  }
});

function goToPlaylist(id) {
  router.push(`/playlist/${id}`);
}
</script>
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

.playlist-row {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.playlist-card {
  background-color: #1a1a1a;
  border-radius: 16px;
  width: 240px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.playlist-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
}

.playlist-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.playlist-info {
  padding: 16px;
}

.playlist-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-artists {
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
