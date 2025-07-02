document.addEventListener('DOMContentLoaded', () => {
    const defaultBgVideoUrl = 'https://www.youtube.com/embed/ShseBIkoe3w?autoplay=1&mute=1&loop=1&playlist=ShseBIkoe3w&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&disablekb=1';
    // Note: YouTube URL parameters for perfect seamless looping and no branding are limited.
    // playlist=VIDEO_ID is a common trick for looping.
    // controls=0, showinfo=0, modestbranding=1, iv_load_policy=3 help reduce YouTube UI.

    const songData = [
        {
            id: "consume",
            title: "Consume",
            artist: "Chase Atlantic",
            lyrics: `Alright, alright, woah
Why you pointing at me with that knife?
I've been cutting corners all my life, girl
The terror doesn't blossom overnight, no
She's running through the city in a rampage
Pressing on her fingers 'til the bones break
There's blood all in her nose from the propane
But a needle to the skin will make the pain fade (Yeah)

Yeah, ah-ah
This is what I do, ah-ah
Take another bite, ah-ah
Big enough to chew

She said, "Careful, or you'll lose it"
But, girl, I'm only human
And I know there's a blade where your heart is
And you know how to use it
And you can take my flesh if you want, girl
But, baby, don't abuse it
These voices in my head screaming, "Run now"
I'm praying that they're human

Rollin', rollin', rolling back your eyes to your mind like
Oh, woah, the pressure in the gland's tight
Yeah, woah, yeah, it's either kill or be killed like
Oh, woah, the blood is either poured or it’s spilt like

Yeah, ah-ah
This is what I do, ah-ah
Take another bite, ah-ah
Big enough to chew

She said, "Careful, or you'll lose it"
But, girl, I'm only human
And I know there's a blade where your heart is
And you know how to use it
And you can take my flesh if you want, girl
But, baby, don't abuse it
These voices in my head screaming, "Run now"
I'm praying that they're human

Alright, alright, woah
Love you, but you cannot spend the night, nah
I've been alone almost all my life, girl
And shit like that don't change up overnight, sweet
I let you sleep in my tee
Tell me the things that you don’t normally tweet
Acid and LSD and smokin' blunts on the beach
69 down 69, so we can both get a piece, yeah
I’ve been cutting corners like my whole life
Backstabbing bitches tryna' kill me with the whole knife
Day I die'll be the only day a nigga ghostwrite
When I go, they'll treat me like a god if this shit goes right

She said, "Careful, or you'll lose it"
But, girl, I'm only human
And I know there's a blade where your heart is
And you know how to use it
And you can take my flesh if you want, girl
But, baby, don't abuse it (Calm down)
These voices in my head screaming, "Run now" (Don't run)
I'm praying that they're human

Please understand that I'm trying my hardest
My head's a mess, but I'm trying regardless
Anxiety is one hell of a problem
She's latching onto me, I can't resolve it
It's not right, it's not fair, it's not fair
It's not fair, it's not fair, it's not fair
Oh, no, no, no (Don't run)
Don't run, don't run`,
            youtubeAudioUrl: 'https://www.youtube.com/embed/oCdXuomafSU', // Using /embed/ for iframe
            youtubeHoverBgUrl: 'https://www.youtube.com/embed/ShseBIkoe3w?autoplay=1&mute=1&loop=1&playlist=ShseBIkoe3w&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&disablekb=1'
        },
        {
            id: "birds",
            title: "Birds of a Feather",
            artist: "Billie Eilish",
            lyrics: `[Intro]
(I want you to stay)

[Verse 1]
I want you to stay
'Til I'm in the grave
'Til I rot away, dead and buried
'Til I'm in the casket you carry
If you go, I'm goin' too, uh
'Cause it was always you (Alright)
And if I'm turnin' blue, please don't save me
Nothin' left to lose without my baby

[Refrain]
Birds of a feather, we should stick together, I know
I said I'd never think I wasn't better alone
Can't change the weather, might not be forever
But if it's forever, it's even better

[Pre-Chorus]
And I don't know what I'm cryin' for
I don't think I could love you more
It might not be long, but baby, I

[Chorus]
I'll love you 'til the day that I die
'Til the day that I die
'Til the light leaves my eyes
'Til the day that I die

[Verse 2]
I want you to see, hmm
How you look to me, hmm
You wouldn't believe if I told ya
You would keep the compliments I throw ya
But you're so full of shit, uh
Tell me it's a bit, oh
Say you don't see it, your mind's polluted
Say you wanna quit, don't be stupid

[Pre-Chorus]
And I don't know what I'm cryin' for
I don't think I could love you more
Might not be long, but baby, I
Don't wanna say goodbye

[Chorus]
Birds of a feather, we should stick together, I know ('Til the day that I die)
I said I'd never think I wasn't better alone ('Til the light leaves my eyes)
Can't change the weather, might not be forever ('Til the day that I die)
But if it's forever, it's even better

[Post-Chorus]
I knew you in another life
You had that same look in your eyes
I love you, don't act so surprised `,
            youtubeAudioUrl: 'https://www.youtube.com/embed/V9PVRfjEBTI',
            youtubeHoverBgUrl: 'https://www.youtube.com/embed/3AipTSIVegs?autoplay=1&mute=1&loop=1&playlist=3AipTSIVegs&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&disablekb=1'
        },
        {
            id: "fireflies",
            title: "Fireflies",
            artist: "Owl City",
            lyrics: `You would not believe your eyes
If ten million fireflies
Lit up the world as I fell asleep
'Cause they'd fill the open air
And leave teardrops everywhere
You'd think me rude
But I would just stand and stare

I'd like to make myself believe
That planet Earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
'Cause everything is never as it seems

'Cause I'd get a thousand hugs
From ten thousand lightning bugs
As they tried to teach me how to dance
A foxtrot above my head
A sock hop beneath my bed
A disco ball is just hanging by a thread
(Thread, thread...)

I'd like to make myself believe
That planet Earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
'Cause everything is never as it seems
(When I fall asleep)

Leave my door open just a crack
(Please take me away from here)
'Cause I feel like such an insomniac
(Please take me away from here)
Why do I tire of counting sheep?
(Please take me away from here)
When I'm far too tired to fall asleep
(Ha-ha)

To ten million fireflies
I'm weird 'cause I hate goodbyes
I got misty eyes as they said farewell
(Said farewell)
But I'll know where several are
If my dreams get real bizarre
'Cause I saved a few and I keep them in a jar
(Jar, jar, jar...)

I'd like to make myself believe
That planet Earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
'Cause everything is never as it seems (when I fall asleep)

I'd like to make myself believe
That planet Earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
'Cause everything is never as it seems (when I fall asleep)

I'd like to make myself believe
That planet Earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
Because my dreams are bursting at the seams`,
            youtubeAudioUrl: 'https://www.youtube.com/embed/psuRGfAaju4',
            youtubeHoverBgUrl: 'https://www.youtube.com/embed/DxBQtBGTvkk?autoplay=1&mute=1&loop=1&playlist=DxBQtBGTvkk&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&disablekb=1'
        },
        {
            id: "somewhere",
            title: "Somewhere Only We Know",
            artist: "Keane",
            lyrics: `I walked across an empty land
I knew the pathway like the back of my hand
I felt the earth beneath my feet
Sat by the river, and it made me complete

[Pre-Chorus]
Oh, simple thing, where have you gone?
I'm getting old and I need something to rely on
So tell me when you're gonna let me in
I'm getting tired and I need somewhere to begin

[Verse 2]
I came across a fallen tree
I felt the branches of it looking at me
Is this the place we used to love?
Is this the place that I've been dreaming of?

[Pre-Chorus]
Oh, simple thing, where have you gone?
I'm getting old and I need something to rely on
So tell me when you're gonna let me in
I'm getting tired and I need somewhere to begin

[Chorus]
And if you have a minute, why don't we go
Talk about it somewhere only we know?
This could be the end of everything
So why don't we go
Somewhere only we know?
Somewhere only we know?

[Pre-Chorus]
Oh, simple thing, where have you gone?
I'm getting old and I need something to rely on
So tell me when you're gonna let me in
I'm getting tired and I need somewhere to begin

[Chorus]
And if you have a minute, why don't we go
Talk about it somewhere only we know?
This could be the end of everything
So why don't we go?
So why don't we go?
Ooh-aah, oh

[Outro]
This could be the end of everything
So why don't we go
Somewhere only we know?
Somewhere only we know
Somewhere only we know `,
            youtubeAudioUrl: 'https://www.youtube.com/embed/Oextk-If8HQ',
            youtubeHoverBgUrl: 'https://www.youtube.com/embed/5jgBLnTHKR8?autoplay=1&mute=1&loop=1&playlist=5jgBLnTHKR8&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&disablekb=1'
        }
    ];

    // DOM Elements for Page 1
    const backgroundPlayer = document.getElementById('background-video-player');
    const songSuggestionsContainer = document.getElementById('song-suggestions');
    const activeSongDisplay = document.getElementById('active-song-display');
    const lyricsText = document.getElementById('lyrics-text');
    const activeSongYouTubePlayer = document.getElementById('active-song-youtube-player');
    const appLogo = document.getElementById('app-logo'); // For potential interaction or just reference

    // Navigation Elements
    const navButtons = document.querySelectorAll('#bottom-navigation .nav-button');
    const page1Content = document.getElementById('page1-content');
    const page2Content = document.getElementById('page2-content'); // Main container for other views
    const searchView = document.getElementById('search-view');
    const libraryView = document.getElementById('library-view');

    // Store all top-level views that can be switched
    const allViews = [page1Content, searchView, libraryView];


    // Initial Setup
    function initializeApp() {
        // Set default background video
        if (backgroundPlayer) {
            backgroundPlayer.src = defaultBgVideoUrl;
        }
        populateSongSuggestions();
    }

    function populateSongSuggestions() {
        if (!songSuggestionsContainer) return;
        songSuggestionsContainer.innerHTML = ''; // Clear any existing content

        songData.forEach(song => {
            const card = document.createElement('div');
            card.className = 'song-suggestion-card';
            card.dataset.songId = song.id; // Store song id for event listeners

            const titleEl = document.createElement('h3');
            titleEl.className = 'song-title';
            titleEl.textContent = song.title;
            card.appendChild(titleEl);

            const artistEl = document.createElement('p');
            artistEl.className = 'artist-name';
            artistEl.textContent = song.artist;
            card.appendChild(artistEl);

            songSuggestionsContainer.appendChild(card);

            // Add event listeners
            card.addEventListener('mouseover', () => handleSongHover(song));
            card.addEventListener('mouseout', handleSongMouseOut);
            card.addEventListener('click', () => handleSongClick(song));
        });
    }

    function handleSongHover(song) {
        if (backgroundPlayer && song.youtubeHoverBgUrl) {
            // Check if the src is already the one we want to set, to avoid unnecessary reloads if possible
            if (backgroundPlayer.src !== song.youtubeHoverBgUrl) {
                 backgroundPlayer.src = song.youtubeHoverBgUrl;
            }
        }
    }

    function handleSongMouseOut() {
        if (backgroundPlayer) {
            // Avoid resetting if another hover event quickly changed it to a different song's bg
            // This simple version will always revert to default. More complex logic could check current song.
            if (backgroundPlayer.src !== defaultBgVideoUrl) {
                backgroundPlayer.src = defaultBgVideoUrl;
            }
        }
    }

    function handleSongClick(song) {
        if (lyricsText) {
            lyricsText.textContent = song.lyrics;
        }
        if (activeSongYouTubePlayer && song.youtubeAudioUrl) {
            // Add autoplay=1 to the YouTube audio URL for the player
            const audioPlayUrl = song.youtubeAudioUrl.includes('?') ?
                                 `${song.youtubeAudioUrl}&autoplay=1` :
                                 `${song.youtubeAudioUrl}?autoplay=1`;
            activeSongYouTubePlayer.src = audioPlayUrl;
        }
        if (activeSongDisplay) {
            activeSongDisplay.classList.remove('hidden');
        }
        // Optionally, also set the main background to this song's hover video
        if (backgroundPlayer && song.youtubeHoverBgUrl) {
            if (backgroundPlayer.src !== song.youtubeHoverBgUrl) {
                 backgroundPlayer.src = song.youtubeHoverBgUrl;
            }
        }
    }

    function setupNavigation() {
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetViewId = button.dataset.target;
                showView(targetViewId);

                // Update active state for buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    function showView(viewId) {
        // If switching to search or library, ensure page2-content is visible
        // and page1-content is hidden.
        // If switching to page1-content, ensure it's visible and page2-content's specific views are hidden.

        allViews.forEach(view => {
            if (view) { // Check if view element exists
                if (view.id === viewId) {
                    view.classList.remove('hidden');
                    // If the target is searchView or libraryView, make sure their container (page2Content) is also visible.
                    if (viewId === 'search-view' || viewId === 'library-view') {
                        if(page2Content) page2Content.classList.remove('hidden');
                        if(page1Content) page1Content.classList.add('hidden'); // Hide page 1 explicitly
                    } else if (viewId === 'page1-content') {
                        if(page2Content) page2Content.classList.add('hidden'); // Hide page 2 container
                    }
                } else {
                    view.classList.add('hidden');
                }
            }
        });
         // Special handling for page2Content container visibility
        if (viewId === 'search-view' || viewId === 'library-view') {
            if(page2Content) page2Content.classList.remove('hidden');
            if(page1Content) page1Content.classList.add('hidden');
        } else if (viewId === 'page1-content') {
            if(page1Content) page1Content.classList.remove('hidden');
            if(page2Content) page2Content.classList.add('hidden');
        }


        // When switching views, hide the active song display on Page 1 if it's not the Home view
        if (viewId !== 'page1-content' && activeSongDisplay) {
            activeSongDisplay.classList.add('hidden');
            // Optionally stop the YouTube player
            if (activeSongYouTubePlayer) {
                activeSongYouTubePlayer.src = ''; // Clearing src stops video
            }
        }
    }


    // Adjust initializeApp to call setupNavigation and show initial view
    function initializeApp() {
        if (backgroundPlayer) {
            backgroundPlayer.src = defaultBgVideoUrl;
        }
        populateSongSuggestions();
        setupNavigation();
        showView('page1-content'); // Show home page by default
    }

    initializeApp();
});
