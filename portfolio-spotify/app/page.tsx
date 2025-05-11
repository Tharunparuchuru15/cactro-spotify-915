import Image from "next/image";

export default function Home() {
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
      <h3>Note:</h3>
      <ul>
        <li>Make sure your backend server is running at <b>http://localhost:3001</b>.</li>
        <li>Authenticate first using <a href="http://localhost:3001/spotify/auth" target="_blank" rel="noopener noreferrer">/spotify/auth</a> before using the other endpoints.</li>
      </ul>
    </main>
  );
}
