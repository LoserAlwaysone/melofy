// server.js
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

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
