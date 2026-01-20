const videos = [
    { name: "The Wedding Film", url: "audio-videos/The Wedding Film.mp4" },
    { name: "Morning Prep + First Look", url: "audio-videos/Morning Prep + First Look.mp4" },
    { name: "Ketubah Sign", url: "audio-videos/Ketubah Sign.mp4" },
    { name: "Ceremony Part 1", url: "audio-videos/Ceremony Part 1.mp4" },
    { name: "Ceremony Part 2", url: "audio-videos/Ceremony Part 2.mp4" },
    { name: "Picture Session", url: "audio-videos/Picture Session.mp4" },
    { name: "Cocktail Hour", url: "audio-videos/Cocktail Hour.mp4" },
    { name: "Reception Part 1", url: "audio-videos/Reception Part 1.mp4" },
    { name: "Reception Part 2", url: "audio-videos/Reception Part 2.mp4" },
    { name: "Reception Part 3", url: "audio-videos/Reception Part 3.mp4" },
    { name: "Reception Part 4", url: "audio-videos/Reception Part 4.mp4" }
];

// DOM Elements
const homeView = document.getElementById('home-view');
const videoView = document.getElementById('video-view');
const videoPlayer = document.getElementById('video-player');
const menuItems = document.getElementById('menu-items');
const backBtn = document.getElementById('back-btn');
const loadingSpinner = document.getElementById('loading-spinner');

let hideTimeout = null;

// Create menu buttons
function init() {
    videos.forEach((video, index) => {
        const btn = document.createElement('button');
        btn.className = 'menu-item';
        btn.textContent = video.name;
        btn.addEventListener('click', () => playVideo(index));
        menuItems.appendChild(btn);
    });
}

// Play a video
function playVideo(index) {
    const video = videos[index];

    homeView.classList.add('hidden');
    videoView.classList.add('active');
    loadingSpinner.classList.add('active');

    videoPlayer.src = video.url;
    videoPlayer.load();
    videoPlayer.play().catch(() => {});
}

// Go back to home
function goHome() {
    videoPlayer.pause();
    videoPlayer.src = '';
    videoView.classList.remove('active', 'show-controls');
    homeView.classList.remove('hidden');
    clearTimeout(hideTimeout);
}

// Show back button on mouse move
function showControls() {
    videoView.classList.add('show-controls');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        videoView.classList.remove('show-controls');
    }, 2000);
}

// Event listeners
backBtn.addEventListener('click', goHome);

videoView.addEventListener('mousemove', showControls);
videoView.addEventListener('touchstart', showControls);

videoPlayer.addEventListener('loadstart', () => loadingSpinner.classList.add('active'));
videoPlayer.addEventListener('canplay', () => loadingSpinner.classList.remove('active'));
videoPlayer.addEventListener('waiting', () => loadingSpinner.classList.add('active'));
videoPlayer.addEventListener('playing', () => loadingSpinner.classList.remove('active'));

// Keyboard: Escape to go home
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoView.classList.contains('active')) {
        goHome();
    }
});

document.addEventListener('DOMContentLoaded', init);
