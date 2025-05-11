const express = require('express');
const router = express.Router();
const spotify = require('../services/spotifyService');

let accessToken = null; 

router.get('/auth', (req, res) => {
  const url = spotify.getAuthUrl();
  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'No code provided' });
  try {
    accessToken = await spotify.getAccessToken(code);
    res.json({ message: 'Authentication successful', accessToken });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get access token', details: err.message });
  }
});

router.get('/artists', async (req, res) => {
  if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const artists = await spotify.getFollowedArtists(accessToken);
    res.json({ artists });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artists', details: err.message });
  }
});

router.get('/top-tracks', async (req, res) => {
  if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const tracks = await spotify.getTopTracks(accessToken);
    res.json({ tracks });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top tracks', details: err.message });
  }
});

router.get('/now-playing', async (req, res) => {
  if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const song = await spotify.getCurrentlyPlaying(accessToken);
    res.json({ nowPlaying: song });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch currently playing song', details: err.message });
  }
});

router.post('/play/:trackId', async (req, res) => {
  if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });
  const trackId = req.params.trackId;
  try {
    const tracks = await spotify.getTopTracks(accessToken);
    const track = tracks.find(t => t.id === trackId);
    if (!track) return res.status(404).json({ error: 'Track not found in top 10' });
    const result = await spotify.startPlayback(accessToken, track.uri);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to start playback', details: err.message });
  }
});

router.post('/stop', async (req, res) => {
  if (!accessToken) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const result = await spotify.stopPlayback(accessToken);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to stop playback', details: err.message });
  }
});

module.exports = router; 