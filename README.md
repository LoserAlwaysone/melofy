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

### 3. Run the backend server
```bash
node server.js
```
Server will run on port 3000 by default.

### 4. Open the frontend
Open `index.html` in your browser (or serve via live server to avoid CORS issues).

## How to Use
- Click Play on any song in the playlist.
- The app requests your backend to extract audio URL.
- The audio plays without any YouTube video or branding.

## Notes
- Audio URLs are temporary and may expire; reloading or replaying fetches fresh URLs.
- You can add more songs by editing `script.js` video ID list.
- To host online, deploy backend on services like Render or Railway.
