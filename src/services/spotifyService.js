const axios = require('axios');

function getAuthUrl() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const scopes = [
    'user-follow-read',
    'user-top-read',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-read-playback-state',
    'streaming',
  ];
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(code) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });
  const response = await axios.post(tokenUrl, params.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data.access_token;
}

async function getFollowedArtists(accessToken) {
  const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.artists.items.map(artist => ({
    id: artist.id,
    name: artist.name,
    genres: artist.genres,
    images: artist.images,
    external_urls: artist.external_urls,
  }));
}

async function getTopTracks(accessToken) {
  const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.items.map(track => ({
    id: track.id,
    name: track.name,
    artists: track.artists.map(a => a.name),
    album: track.album.name,
    uri: track.uri,
    external_urls: track.external_urls,
  }));
}

async function getCurrentlyPlaying(accessToken) {
  const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.data || !response.data.item) return null;
  const track = response.data.item;
  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map(a => a.name),
    album: track.album.name,
    uri: track.uri,
    is_playing: response.data.is_playing,
    progress_ms: response.data.progress_ms,
    external_urls: track.external_urls,
  };
}

async function startPlayback(accessToken, trackUri) {
  await axios.put('https://api.spotify.com/v1/me/player/play', {
    uris: [trackUri],
  }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return { message: 'Playback started' };
}

async function stopPlayback(accessToken) {
  await axios.put('https://api.spotify.com/v1/me/player/pause', {}, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return { message: 'Playback stopped' };
}

module.exports = {
  getAuthUrl,
  getAccessToken,
  getFollowedArtists,
  getTopTracks,
  getCurrentlyPlaying,
  startPlayback,
  stopPlayback,
}; 