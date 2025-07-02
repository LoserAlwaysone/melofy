// server.js
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');

const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');
const https = require('https'); // For making HTTPS requests to YouTube API

const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTANT: Store your API key in an environment variable in a real deployment
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "YOUR_FALLBACK_YOUTUBE_API_KEY";
// Replace "YOUR_FALLBACK_YOUTUBE_API_KEY" with the actual key for local dev if not using .env
// For the sandbox, I'll hardcode the one from script.js for now, but ideally this should be an env var.
const ACTUAL_API_KEY_FOR_SANDBOX = "AIzaSyC_BRozw5h0FI85YfLBdr0rWlTf5efeEzg"; // The key from script.js

app.use(cors());
app.use(express.static(path.join(__dirname))); // Serve static files from root (index.html, script.js, etc.)

// Endpoint to proxy YouTube search requests
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${ACTUAL_API_KEY_FOR_SANDBOX}`; // Use the key here

  https.get(youtubeUrl, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => {
      data += chunk;
    });
    apiRes.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        if (apiRes.statusCode !== 200) {
          console.error('YouTube API Error:', jsonData);
          return res.status(apiRes.statusCode).json({ error: 'Failed to fetch from YouTube API', details: jsonData });
        }
        res.json(jsonData);
      } catch (e) {
        console.error('Error parsing YouTube API response:', e);
        res.status(500).json({ error: 'Error parsing YouTube API response' });
      }
    });
  }).on('error', (err) => {
    console.error('Error calling YouTube API:', err.message);
    res.status(500).json({ error: 'Failed to connect to YouTube API' });
  });
});

app.get('/api/audio/:id', (req, res) => {
  const videoId = req.params.id;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const cmd = `yt-dlp -f bestaudio -g ${url}`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('yt-dlp error:', stderr);
      return res.status(500).json({ error: 'Failed to fetch audio URL' });
    }
    const audioUrl = stdout.trim();
    res.json({ audioUrl });
  });
});

app.listen(PORT, () => {
  console.log(`Melofy backend running at http://localhost:${PORT}`);
});
