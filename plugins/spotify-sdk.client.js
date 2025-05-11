// plugins/spotify-player.client.ts
export default defineNuxtPlugin(() => {
    if (process.client) {
      // Define the SDK-ready function BEFORE loading the script
      if (!window.onSpotifyWebPlaybackSDKReady) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          console.log('Spotify SDK is ready');
        };
      }
  
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.head.appendChild(script);
    }
  });
  