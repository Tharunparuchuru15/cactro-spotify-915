"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  // Hardcoded for demo
  const hardcodedTrackId = "2FPYJZygSLhD9RdPvEnBha";
  const [response, setResponse] = useState("");

  const playTrack = async () => {
    const res = await fetch(`http://localhost:3001/spotify/play/${hardcodedTrackId}`, {
      method: "POST",
    });
    setResponse(res.ok ? "Playback started!" : "Error starting playback");
  };

  const stopTrack = async () => {
    const res = await fetch("http://localhost:3001/spotify/stop", {
      method: "POST",
    });
    setResponse(res.ok ? "Playback stopped!" : "Error stopping playback");
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: 32 }}>
      <h1>Tharun's Spotify Demo</h1>
      <h2>API Endpoints (Backend)</h2>
      <ul>
        <li>
          <a href="http://localhost:3001/spotify/auth" target="_blank" rel="noopener noreferrer">
            GET /spotify/auth
          </a>{" "}
          <span>→ Start Spotify authentication</span>
        </li>
        <li>
          <a href="http://localhost:3001/spotify/artists" target="_blank" rel="noopener noreferrer">
            GET /spotify/artists
          </a>{" "}
          <span>→ List followed artists</span>
        </li>
        <li>
          <a href="http://localhost:3001/spotify/top-tracks" target="_blank" rel="noopener noreferrer">
            GET /spotify/top-tracks
          </a>{" "}
          <span>→ List top 10 tracks</span>
        </li>
        <li>
          <a href="http://localhost:3001/spotify/now-playing" target="_blank" rel="noopener noreferrer">
            GET /spotify/now-playing
          </a>{" "}
          <span>→ Show currently playing song</span>
        </li>
      </ul>
      <h2>Playback Control (via curl)</h2>
      <pre>
        {`curl -X POST http://localhost:3001/spotify/stop`}
      </pre>
      <pre>
        {`curl -X POST http://localhost:3001/spotify/play/<trackId>`}
      </pre>
      <p>
        Replace <code>&lt;trackId&gt;</code> with a Spotify track ID from your top tracks.
      </p>
      <h2>Demo Controls</h2>
      <button onClick={playTrack} style={{ marginRight: 10 }}>Play Now (Demo Track)</button>
      <button onClick={stopTrack}>Stop</button>
      <div style={{ marginTop: 10 }}>
        <b>Demo Track ID:</b> {hardcodedTrackId}
      </div>
      {response && <div style={{ marginTop: 10, color: "green" }}>{response}</div>}
      <h3>Note:</h3>
      <ul>
        <li>Make sure your backend server is running at <b>http://localhost:3001</b>.</li>
        <li>Authenticate first using <a href="http://localhost:3001/spotify/auth" target="_blank" rel="noopener noreferrer">/spotify/auth</a> before using the other endpoints.</li>
      </ul>
    </main>
  );
}
