// Get DOM elements
const navButtons = document.querySelectorAll('.nav-button');
const videoSection = document.getElementById('videoSection');
const videoPlayer = document.getElementById('videoPlayer');
const audioPlayer = document.getElementById('audioPlayer');
const videoSource = document.getElementById('videoSource');
const audioSource = document.getElementById('audioSource');
const closeButton = document.getElementById('closeButton');

// Video and audio file mappings
const mediaFiles = {
    videos: {
        1: 'assets/videos/the-wedding-film.mp4',
        2: 'assets/videos/morning-prep-first-look.mp4',
        3: 'assets/videos/ketubah-sign.mp4',
        4: 'assets/videos/ceremony-part-1.mp4',
        5: 'assets/videos/ceremony-part-2.mp4',
        6: 'assets/videos/picture-session.mp4',
        7: 'assets/videos/cocktail-hour.mp4',
        8: 'assets/videos/reception-part-1.mp4',
        9: 'assets/videos/reception-part-2.mp4',
        10: 'assets/videos/reception-part-3.mp4',
        11: 'assets/videos/reception-part-4.mp4'
    },
    audios: {
        1: 'assets/audios/the-wedding-film.mp3',
        2: 'assets/audios/morning-prep-first-look.mp3',
        3: 'assets/audios/ketubah-sign.mp3',
        4: 'assets/audios/ceremony-part-1.mp3',
        5: 'assets/audios/ceremony-part-2.mp3',
        6: 'assets/audios/picture-session.mp3',
        7: 'assets/audios/cocktail-hour.mp3',
        8: 'assets/audios/reception-part-1.mp3',
        9: 'assets/audios/reception-part-2.mp3',
        10: 'assets/audios/reception-part-3.mp3',
        11: 'assets/audios/reception-part-4.mp3'
    }
};

// Add click event listeners to navigation buttons
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const videoId = button.getAttribute('data-video');
        const audioId = button.getAttribute('data-audio');
        
        // Load video and audio
        loadMedia(videoId, audioId);
        
        // Show video section with animation
        showVideoSection();
    });
});

// Function to load media files
function loadMedia(videoId, audioId) {
    // Set video source
    const videoPath = mediaFiles.videos[videoId];
    videoSource.src = videoPath;
    videoPlayer.load();
    
    // Set audio source if available
    const audioPath = mediaFiles.audios[audioId];
    if (audioPath) {
        audioSource.src = audioPath;
        audioPlayer.load();
    }
}

// Function to show video section
function showVideoSection() {
    videoSection.classList.add('active');
    
    // Play video and audio when ready
    videoPlayer.addEventListener('loadeddata', () => {
        // Handle autoplay promises to prevent uncaught errors
        const playPromise = videoPlayer.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Video autoplay prevented:', error);
            });
        }
        
        if (audioSource.src) {
            const audioPromise = audioPlayer.play();
            if (audioPromise !== undefined) {
                audioPromise.catch(error => {
                    console.log('Audio autoplay prevented:', error);
                });
            }
        }
    }, { once: true });
    
    // Sync audio with video
    videoPlayer.addEventListener('play', () => {
        if (audioSource.src) {
            const audioPromise = audioPlayer.play();
            if (audioPromise !== undefined) {
                audioPromise.catch(error => {
                    console.log('Audio sync prevented:', error);
                });
            }
        }
    });
    
    videoPlayer.addEventListener('pause', () => {
        audioPlayer.pause();
    });
    
    videoPlayer.addEventListener('seeked', () => {
        audioPlayer.currentTime = videoPlayer.currentTime;
    });
}

// Function to hide video section
function hideVideoSection() {
    videoSection.classList.remove('active');
    
    // Stop video and audio
    videoPlayer.pause();
    audioPlayer.pause();
    
    // Reset to beginning
    videoPlayer.currentTime = 0;
    audioPlayer.currentTime = 0;
    
    // Clear sources
    videoSource.src = '';
    audioSource.src = '';
}

// Close button event listener
closeButton.addEventListener('click', hideVideoSection);

// Close video section when clicking outside the video
videoSection.addEventListener('click', (e) => {
    if (e.target === videoSection) {
        hideVideoSection();
    }
});

// Close video section with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoSection.classList.contains('active')) {
        hideVideoSection();
    }
});

// Smooth scroll animation for page load
const PAGE_LOAD_FADE_DELAY = 100; // milliseconds

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, PAGE_LOAD_FADE_DELAY);
});

// Handle video end
videoPlayer.addEventListener('ended', () => {
    // Optionally auto-close after video ends
    // hideVideoSection();
});
