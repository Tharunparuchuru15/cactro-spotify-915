# Spotify API Integration

This project exposes a set of endpoints on top of the Spotify API to show your top 10 tracks, the now playing song, and the artists you follow. It also allows you to start/stop playback of your top tracks. Built with Node.js and Express.

## Features
- List the artists you follow
- Show your top 10 tracks
- Show the currently playing song
- Start playback of any top 10 song
- Stop the currently playing song

## Project Structure
```
/src
  /routes
    spotify.js         # All /spotify endpoints (Express router)
  /services
    spotifyService.js  # All Spotify API logic
  app.js               # Express app setup and middleware
index.js               # Entry point, starts the server
.env                    # Environment variables
package.json
```

## Setup
1. **Clone the repo and install dependencies:**
   ```bash
   npm install
   ```
2. **Create a `.env` file in the root:**
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/spotify/callback
   ```
3. **Start the server:**
   ```bash
   node index.js
   ```

## Usage
1. Go to `http://localhost:3000/spotify/auth` to authenticate with Spotify.
2. Use the following endpoints (all return JSON):

| Endpoint                        | Method | Description                                 |
|---------------------------------|--------|---------------------------------------------|
| `/spotify/auth`                 | GET    | Start Spotify OAuth2 flow                   |
| `/spotify/callback`             | GET    | Spotify redirects here after auth           |
| `/spotify/artists`              | GET    | List followed artists                       |
| `/spotify/top-tracks`           | GET    | List top 10 tracks                          |
| `/spotify/now-playing`          | GET    | Show currently playing song                 |
| `/spotify/play/:trackId`        | POST   | Start playback of a top 10 song by track ID |
| `/spotify/stop`                 | POST   | Stop currently playing song                 |

## Deployment
- Deploy to your portfolio site (Vercel, Render, etc.).
- Update `SPOTIFY_REDIRECT_URI` in your `.env` and Spotify Developer Dashboard to match your deployed URL (e.g., `https://yourdomain.com/spotify/callback`).

---
**Note:** This project stores the access token in memory for demo purposes. For production, use a database or session store. 