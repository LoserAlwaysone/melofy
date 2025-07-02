// const API_KEY = "AIzaSyC_BRozw5h0FI85YfLBdr0rWlTf5efeEzg"; // Removed: API key is now on the backend

const searchInput = document.getElementById('searchInput');
const songList = document.getElementById('songList');
const featuredList = document.getElementById('featuredList'); // Added for featured songs
const mainPlayer = document.getElementById('mainPlayer');
// const nowPlaying = document.getElementById('nowPlaying'); // Replaced by new elements

// Player UI Elements
const playerContainer = document.getElementById('player-container');
const playerAlbumArt = document.getElementById('playerAlbumArt');
const playerSongTitle = document.getElementById('playerSongTitle');
const playerSongArtist = document.getElementById('playerSongArtist');
const playPauseButton = document.getElementById('playPauseButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const loopButton = document.getElementById('loopButton');
const shuffleButton = document.getElementById('shuffleButton'); // Added for completeness, functionality TBD
const currentTimeDisplay = document.getElementById('currentTime');
const totalDurationDisplay = document.getElementById('totalDuration');
const progressBar = document.getElementById('progressBar');
const volumeButton = document.getElementById('volumeButton');
const volumeBar = document.getElementById('volumeBar');

let currentPlaylist = []; // To store the list of songs currently being browsed/searched
let currentIndex = -1;    // Index of the currently playing song in currentPlaylist
let isShuffle = false;    // Shuffle state
let isLoop = false;       // Loop state for current song

// Fullscreen Player Elements
const fullscreenPlayer = document.getElementById('fullscreenPlayer');
const closeFullscreenButton = document.getElementById('closeFullscreenButton');
const fullscreenBackground = document.getElementById('fullscreenBackground');
const fullscreenCoverArt = document.getElementById('fullscreenCoverArt');
const fullscreenSongTitle = document.getElementById('fullscreenSongTitle');
const fullscreenSongArtist = document.getElementById('fullscreenSongArtist');
const fullscreenLyrics = document.getElementById('fullscreenLyrics');


// Function to load featured songs from data.json
async function loadFeaturedSongs() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('Failed to fetch featured songs');
    const songs = await res.json();
    currentPlaylist = songs; // Set initial playlist to featured songs
    renderFeaturedSongs(songs);
  } catch (error) {
    console.error("Error loading featured songs:", error);
    if (featuredList) featuredList.innerHTML = '<p>Error loading featured songs.</p>';
  }
}

// Function to render featured songs
function renderFeaturedSongs(songs) {
  if (!featuredList) return;
  featuredList.innerHTML = ''; // Clear previous content
  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 cursor-pointer';

    card.innerHTML = `
      <div class="aspect-w-1 aspect-h-1">
        <img src="${song.coverArt}" alt="${song.title}" class="object-cover w-full h-full">
      </div>
      <div class="p-4">
        <h3 class="text-md font-semibold truncate text-white">${song.title}</h3>
        <p class="text-sm text-gray-400 truncate">${song.artist}</p>
        <button class="play-button mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-xs transition-colors">
          Play
        </button>
      </div>
    `;

    // Attach event listener to the card itself or a specific play button within it
    const songIndex = currentPlaylist.findIndex(s => s.id === song.id);

    card.querySelector('.play-button').addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click if button is clicked
      currentIndex = songIndex;
      playSongFromCurrentPlaylist();
    });

    // Optionally, make the whole card clickable to play or show details
    card.addEventListener('click', () => {
      // For now, just play. Later this could open the fullscreen view.
      currentIndex = songIndex;
      playSongFromCurrentPlaylist();
    });

    featuredList.appendChild(card);
  });
}

// Call loadFeaturedSongs on page load
document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedSongs();
  // Hide search results section initially if it's empty
  const searchResultsSection = document.getElementById('searchResultsSection');
  if (searchResultsSection && songList.children.length === 0) {
    searchResultsSection.classList.add('hidden');
  }
});

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  const searchResultsSection = document.getElementById('searchResultsSection');

  if (query.length < 3) {
    songList.innerHTML = '<p class="text-gray-400 col-span-full text-center">Type at least 3 characters to search</p>';
    if (searchResultsSection) searchResultsSection.classList.remove('hidden'); // Show message
    if (query.length === 0 && searchResultsSection) searchResultsSection.classList.add('hidden'); // Hide if query is empty
    return;
  }

  if (searchResultsSection) searchResultsSection.classList.remove('hidden'); // Show section when searching

  try {
    // const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`; // Old direct URL
    const url = `/api/search?q=${encodeURIComponent(query)}`; // New backend endpoint
    const res = await fetch(url);
    if (!res.ok) { // Check if response status is not OK (e.g. 4xx, 5xx)
      const errorData = await res.json().catch(() => ({ message: "Unknown server error" }));
      throw new Error(`Server error: ${res.status} ${res.statusText}. ${errorData.error || errorData.message || ''}`);
    }
    const data = await res.json();
    if (!data.items || data.items.length === 0) {
        songList.innerHTML = '<p class="text-gray-400 col-span-full text-center">No results found.</p>';
        // currentPlaylist = []; // Clear playlist if search yields no results
        return;
    }
    // Map YouTube search results to our song object structure
    const searchResults = data.items.map((item, index) => ({
      id: item.id.videoId + '-' + index, // Create a unique ID for search results
      audioSourceId: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      coverArt: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url || 'https://via.placeholder.com/150',
      // backgroundVisual: 'default_background_if_needed.jpg' // Search results might not have this
    }));
    currentPlaylist = searchResults; // Update current playlist with search results
    renderSongs(searchResults); // Render the mapped results
  } catch(error) {
    console.error("Search error:", error);
    songList.innerHTML = '<p class="text-red-500 col-span-full text-center">Error loading search results.</p>';
  }
});

function renderSongs(songs) { // Changed 'items' to 'songs' to match the data structure
  songList.innerHTML = ''; // Clear previous search results
  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 cursor-pointer';

    card.innerHTML = `
      <div class="aspect-w-1 aspect-h-1">
        <img src="${song.coverArt}" alt="${song.title}" class="object-cover w-full h-full">
      </div>
      <div class="p-4">
        <h3 class="text-md font-semibold truncate text-white">${song.title}</h3>
        <p class="text-sm text-gray-400 truncate">${song.artist}</p>
        <button class="play-button mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-xs transition-colors">
          Play
        </button>
      </div>
    `;

    const songIndex = currentPlaylist.findIndex(s => s.id === song.id);

    card.querySelector('.play-button').addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = songIndex;
      playSongFromCurrentPlaylist();
    });

    card.addEventListener('click', () => {
      currentIndex = songIndex;
      playSongFromCurrentPlaylist();
    });

    songList.appendChild(card);
  });
}

// Consolidated Play Song Logic
async function playSongFromCurrentPlaylist() {
  if (currentIndex < 0 || currentIndex >= currentPlaylist.length) {
    console.warn("Invalid currentIndex for playSongFromCurrentPlaylist:", currentIndex);
    return;
  }

  const song = currentPlaylist[currentIndex];
  if (!song) {
    console.error("Song not found in currentPlaylist at index:", currentIndex);
    return;
  }

  // Update Player UI
  playerAlbumArt.src = song.coverArt || 'https://via.placeholder.com/64';
  playerSongTitle.textContent = song.title || 'Unknown Title';
  playerSongArtist.textContent = song.artist || 'Unknown Artist';

  updatePlayPauseIcon(false); // Show loading or play icon initially
  progressBar.value = 0;
  currentTimeDisplay.textContent = formatTime(0);
  totalDurationDisplay.textContent = formatTime(0);

  try {
    // Fetch and play audio
    // nowPlaying.textContent = 'Loading...'; // Old element
    mainPlayer.pause();
    mainPlayer.removeAttribute('src'); // Ensure it reloads the source
    mainPlayer.load(); // Important to call load before setting src if changing source

    const res = await fetch(`/api/audio/${song.audioSourceId}`);
    if (!res.ok) throw new Error(`Failed to fetch audio URL for ${song.audioSourceId}`);
    const data = await res.json();

    mainPlayer.src = data.audioUrl;
    await mainPlayer.play();
    updatePlayPauseIcon(true);

  } catch (error) {
    console.error('Failed to load audio:', error);
    playerSongTitle.textContent = "Error loading track";
    playerSongArtist.textContent = error.message.substring(0,30); // Show part of error
    updatePlayPauseIcon(false);
    // alert('Failed to load audio.'); // Avoid alert, use UI feedback
  }
}

function updatePlayPauseIcon(isPlaying) {
  if (isPlaying) {
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
  } else {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event Listeners for Player Controls
playPauseButton.addEventListener('click', () => {
  if (mainPlayer.paused || mainPlayer.ended) {
    if(mainPlayer.src) mainPlayer.play();
    else if(currentPlaylist.length > 0 && currentIndex !== -1) playSongFromCurrentPlaylist(); // Play current if src not set
    else if(currentPlaylist.length > 0) { // Play first song if nothing selected
        currentIndex = 0;
        playSongFromCurrentPlaylist();
    }
  } else {
    mainPlayer.pause();
  }
});

mainPlayer.addEventListener('play', () => updatePlayPauseIcon(true));
mainPlayer.addEventListener('pause', () => updatePlayPauseIcon(false));
mainPlayer.addEventListener('ended', () => {
  updatePlayPauseIcon(false);
  if (isLoop) {
    mainPlayer.currentTime = 0;
    mainPlayer.play();
  } else {
    playNextSong();
  }
});

mainPlayer.addEventListener('loadedmetadata', () => {
  totalDurationDisplay.textContent = formatTime(mainPlayer.duration);
  progressBar.max = mainPlayer.duration;
});

mainPlayer.addEventListener('timeupdate', () => {
  currentTimeDisplay.textContent = formatTime(mainPlayer.currentTime);
  progressBar.value = mainPlayer.currentTime;
});

progressBar.addEventListener('input', () => {
  mainPlayer.currentTime = progressBar.value;
});

volumeBar.addEventListener('input', (e) => {
  mainPlayer.volume = e.target.value;
  // TODO: Update volume icon based on volume level (e.g., muted, low, high)
});

loopButton.addEventListener('click', () => {
  isLoop = !isLoop;
  mainPlayer.loop = isLoop; // Also set the native loop property
  loopButton.classList.toggle('text-green-500', isLoop); // Visual feedback
  loopButton.classList.toggle('text-gray-400', !isLoop);
});

// Basic Next/Prev functionality
function playNextSong() {
  if (currentPlaylist.length === 0) return;
  currentIndex = (currentIndex + 1) % currentPlaylist.length;
  playSongFromCurrentPlaylist();
}

function playPrevSong() {
  if (currentPlaylist.length === 0) return;
  currentIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  playSongFromCurrentPlaylist();
}

nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPrevSong);


// TODO: Implement Shuffle, Volume Icon update, more robust playlist management

// --- Fullscreen Player Logic ---

function openFullscreenPlayer() {
  if (currentIndex < 0 || currentIndex >= currentPlaylist.length) return;
  const song = currentPlaylist[currentIndex];

  fullscreenCoverArt.src = song.coverArt || 'https://via.placeholder.com/300';
  fullscreenSongTitle.textContent = song.title || 'Unknown Title';
  fullscreenSongArtist.textContent = song.artist || 'Unknown Artist';
  fullscreenLyrics.textContent = song.lyrics || 'Lyrics not available for this song.';

  // Handle background visual
  fullscreenBackground.innerHTML = ''; // Clear previous background
  if (song.backgroundVisual) {
    if (song.backgroundVisual.startsWith('bg-gradient')) { // Check if it's a Tailwind gradient class
      fullscreenBackground.className = `absolute inset-0 w-full h-full z-[-1] overflow-hidden ${song.backgroundVisual}`;
    } else if (song.backgroundVisual.match(/\.(jpeg|jpg|gif|png)$/i) != null) { // Image URL
      fullscreenBackground.className = `absolute inset-0 w-full h-full z-[-1] overflow-hidden bg-cover bg-center`;
      fullscreenBackground.style.backgroundImage = `url('${song.backgroundVisual}')`;
    } else if (song.backgroundVisual.match(/\.(mp4|webm|ogg)$/i) != null) { // Video URL
      fullscreenBackground.className = `absolute inset-0 w-full h-full z-[-1] overflow-hidden`;
      const videoEl = document.createElement('video');
      videoEl.src = song.backgroundVisual;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true; // Important for autoplay policy
      videoEl.className = 'w-full h-full object-cover';
      fullscreenBackground.appendChild(videoEl);
    } else { // Fallback
      fullscreenBackground.className = `absolute inset-0 w-full h-full z-[-1] overflow-hidden bg-gray-800`;
    }
  } else {
    fullscreenBackground.className = `absolute inset-0 w-full h-full z-[-1] overflow-hidden bg-gray-800`;
  }


  fullscreenPlayer.classList.remove('hidden');
  fullscreenPlayer.classList.add('flex'); // Use flex for centering
  // Trigger opacity transition
  setTimeout(() => {
    fullscreenPlayer.style.opacity = '1';
  }, 10);
}

function closeFullscreenPlayer() {
  fullscreenPlayer.style.opacity = '0';
  setTimeout(() => {
    fullscreenPlayer.classList.add('hidden');
    fullscreenPlayer.classList.remove('flex');
    fullscreenBackground.style.backgroundImage = ''; // Clear style
    fullscreenBackground.innerHTML = ''; // Clear any video
  }, 500); // Match transition duration
}

closeFullscreenButton.addEventListener('click', closeFullscreenPlayer);

// Modify existing card click to open fullscreen view
// Option 1: Make the whole card open fullscreen (and play if not playing)
// For renderFeaturedSongs:
// card.addEventListener('click', () => {
//   boolean songWasPlaying = mainPlayer.currentTime > 0 && !mainPlayer.paused && currentIndex === songIndex;
//   currentIndex = songIndex;
//   if(!songWasPlaying) playSongFromCurrentPlaylist(); // Play if not already playing this song
//   openFullscreenPlayer();
// });
// For renderSongs (search):
// card.addEventListener('click', () => {
//   boolean songWasPlaying = mainPlayer.currentTime > 0 && !mainPlayer.paused && currentIndex === songIndex;
//   currentIndex = songIndex;
//   if(!songWasPlaying) playSongFromCurrentPlaylist();
//   openFullscreenPlayer();
// });

// Option 2: Add a dedicated button or use album art in player bar
// For now, let's make the album art in the main player bar trigger fullscreen
playerAlbumArt.addEventListener('click', () => {
  if (mainPlayer.src) { // Only open if a song is loaded/playing
    openFullscreenPlayer();
  }
});

// Ensure playSongFromCurrentPlaylist also prepares for fullscreen if called directly
// (already does by setting currentIndex and song details)

// Update playSong to ensure song details are available for fullscreen
// The current playSongFromCurrentPlaylist should already handle setting song details.
// We just need to make sure that when a song starts playing, its data is ready.
// The current structure where cards set `currentIndex` and call `playSongFromCurrentPlaylist` is good.
