export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const clientId = config.spotifyClientId;
    const clientSecret = config.spotifyClientSecret;
    const code = getQuery(event).code;
  
    if (!code) {
      throw createError({ statusCode: 400, statusMessage: "Missing authorization code" });
    }
  
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  
    try {
      const tokenResponse = await $fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: config.spotifyRedirectUri,
        }).toString(),
      });
  
      if (!tokenResponse.access_token) throw new Error("Failed to obtain access token");
  
      return {
        access_token: tokenResponse.access_token,
        refresh_token: tokenResponse.refresh_token,
        expires_in: tokenResponse.expires_in,
      };
    } catch (e) {
      console.error("❌ Token exchange failed:", e);
      throw createError({ statusCode: 500, statusMessage: "Token exchange failed" });
    }
  });
  