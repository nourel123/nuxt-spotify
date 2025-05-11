export default defineNuxtConfig({
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
    apiBaseUrl: process.env.API_BASE_URL,
    public: {
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
      spotifyApiBaseUrl: 'https://api.spotify.com/v1',  // ✅ Add this line
    }
  }
})
