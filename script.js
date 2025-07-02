const API_KEY = "AIzaSyC_BRozw5h0FI85YfLBdr0rWlTf5efeEzg";

const searchInput = document.getElementById('searchInput');
const songList = document.getElementById('songList');
const mainPlayer = document.getElementById('mainPlayer');
const nowPlaying = document.getElementById('nowPlaying');

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  if (query.length < 3) {
    songList.innerHTML = '<p>Type at least 3 characters to search</p>';
    return;
  }
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items) throw new Error("No results");
    renderSongs(data.items);
  } catch {
    songList.innerHTML = '<p>Error loading search results</p>';
  }
});

function renderSongs(items) {
  songList.innerHTML = '';
  items.forEach(item => {
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const channel = item.snippet.channelTitle;

    const div = document.createElement('div');
    div.className = 'song';
    div.textContent = `${title} - ${channel}`;

    const btn = document.createElement('button');
    btn.textContent = 'Play';
    btn.onclick = () => playSong(videoId, title, channel);

    div.appendChild(btn);
    songList.appendChild(div);
  });
}

async function playSong(videoId, title, artist) {
  try {
    nowPlaying.textContent = 'Loading...';
    mainPlayer.pause();
    mainPlayer.removeAttribute('src');
    mainPlayer.load();

    const res = await fetch(`/api/audio/${videoId}`);
    if (!res.ok) throw new Error('Failed to fetch audio URL');
    const data = await res.json();

    mainPlayer.src = data.audioUrl;
    nowPlaying.textContent = `${title} — ${artist}`;
    await mainPlayer.play();
  } catch {
    nowPlaying.textContent = '';
    alert('Failed to load audio.');
  }
}
