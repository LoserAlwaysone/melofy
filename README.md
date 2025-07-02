# Melofy - Audio Only Music Web App

## Overview
Melofy is a simple music streaming web app that plays audio-only streams extracted from YouTube videos using yt-dlp. It provides a clean interface without YouTube branding or video, just pure audio playback.

## Features
- Playlist of songs (YouTube video IDs)
- Audio-only streaming via backend API with yt-dlp
- Dark-themed Spotify-like UI
- Responsive design with sidebar and bottom player

## Requirements
- Node.js (v14+ recommended)
- yt-dlp installed globally (`pip install yt-dlp`)
- npm packages: express and cors

## Setup Instructions

### 1. Install yt-dlp
```bash
pip install yt-dlp
```

### 2. Install Node.js dependencies
```bash
npm install express cors
```

### 3. Configure YouTube API Key (Optional, for Search)
   For song search functionality to work, you need a YouTube Data API v3 key.
   - Obtain an API key from the Google Cloud Console.
   - Set it as an environment variable: `export YOUTUBE_API_KEY="YOUR_ACTUAL_API_KEY"`
   - Alternatively, for local development only, you can replace `"YOUR_FALLBACK_YOUTUBE_API_KEY"` in `server.js` with your actual key. (Not recommended for production).
   - If no key is provided or it's invalid, searching for songs will likely fail, but playing featured songs from `data.json` will still work.

### 4. Run the backend server
```bash
node server.js
```
The server will start, typically on port 3000 (e.g., `http://localhost:3000`).
It now serves the frontend HTML, CSS, and JS files as well.

### 5. Open the App
Open your browser and navigate to `http://localhost:3000`.

## How to Use
- Browse featured songs on the homepage or use the search bar (if API key is configured).
- Click on a song card or its play button to start playback.
- Use the player controls at the bottom for play/pause, skip, volume, etc.
- Click the album art in the player bar to open a fullscreen view with lyrics and background visuals.
- The app requests the backend to extract audio URLs for playback, avoiding direct YouTube branding on the frontend.

## Notes
- Audio URLs fetched via `yt-dlp` are temporary and may expire; replaying will fetch fresh URLs.
- Featured songs are managed in `data.json`. You can edit this file to change the default playlist.
- For online hosting, deploy the backend (Node.js app) on services like Render or Railway. Ensure `YOUTUBE_API_KEY` is set as an environment variable there.
