let videos = [];

// DOM Elements
const homeView = document.getElementById('home-view');
const videoView = document.getElementById('video-view');
const videoPlayer = document.getElementById('video-player');
const menuItems = document.getElementById('menu-items');
const backBtn = document.getElementById('back-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const progressBar = document.getElementById('progress-bar');
const progressFilled = document.getElementById('progress-filled');
const progressTooltip = document.getElementById('progress-tooltip');
const timeDisplay = document.getElementById('time-display');
const volumeBtn = document.getElementById('volume-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const playPauseBtn = document.getElementById('play-pause-btn');

let hideTimeout = null;
let goHomeTimeout = null;

// Stagger fade-in of menu buttons
function showMenuButtons() {
    const buttons = menuItems.querySelectorAll('.menu-item');
    buttons.forEach((btn, i) => {
        btn.classList.remove('visible');
        setTimeout(() => btn.classList.add('visible'), i * 80);
    });
}

// Load video data and create menu buttons
async function init() {
    const response = await fetch('video-data.json');
    const data = await response.json();
    videos = data.videos.map(v => ({
        name: v.name,
        url: `${data.baseUrl}/${encodeURIComponent(v.file)}`
    }));

    videos.forEach((video, index) => {
        const btn = document.createElement('button');
        btn.className = 'menu-item';
        btn.textContent = video.name;
        btn.addEventListener('click', () => playVideo(index));
        menuItems.appendChild(btn);
    });
    showMenuButtons();
}

// Play a video
function playVideo(index) {
    const video = videos[index];

    // Cancel any pending goHome cleanup
    if (goHomeTimeout) {
        clearTimeout(goHomeTimeout);
        goHomeTimeout = null;
    }

    // Start fade transition
    homeView.classList.add('fade-out');
    videoView.classList.add('active');
    loadingSpinner.classList.add('active');

    // Load and play video
    videoPlayer.src = video.url;
    videoPlayer.load();
    videoPlayer.play().catch(() => {});
}

// Go back to home
function goHome() {
    // Start fade transition
    videoView.classList.remove('active');
    homeView.classList.remove('fade-out');
    showMenuButtons();

    // Stop video after fade completes
    goHomeTimeout = setTimeout(() => {
        videoPlayer.pause();
        videoPlayer.src = '';
        progressFilled.style.width = '0%';
        timeDisplay.textContent = '0:00 / 0:00';
        goHomeTimeout = null;
    }, 2000);

    clearTimeout(hideTimeout);
    videoView.classList.remove('show-controls');
}

// Show controls on mouse move
let controlsHovered = false;

function showControls() {
    videoView.classList.add('show-controls');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        if (!controlsHovered) {
            videoView.classList.remove('show-controls');
        }
    }, 500);
}

// Format time as m:ss or h:mm:ss
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// Update progress bar
function updateProgress() {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    timeDisplay.textContent = `${formatTime(videoPlayer.currentTime)} / ${formatTime(videoPlayer.duration)}`;
}

// Seek/scrub on progress bar
let isScrubbing = false;

function seekTo(e) {
    const rect = progressBar.getBoundingClientRect();
    let clientX;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
    } else {
        clientX = e.clientX;
    }
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    if (!isNaN(videoPlayer.duration)) {
        const targetTime = percent * videoPlayer.duration;

        // Check if target is within seekable range
        const seekable = videoPlayer.seekable;
        if (seekable.length > 0) {
            let canSeek = false;
            for (let i = 0; i < seekable.length; i++) {
                if (targetTime >= seekable.start(i) && targetTime <= seekable.end(i)) {
                    canSeek = true;
                    break;
                }
            }
            // If not seekable, clamp to nearest seekable end
            if (!canSeek) {
                const lastEnd = seekable.end(seekable.length - 1);
                videoPlayer.currentTime = Math.min(targetTime, lastEnd);
                return;
            }
        }
        videoPlayer.currentTime = targetTime;
    }
}

function startScrub(e) {
    e.preventDefault();
    e.stopPropagation();
    isScrubbing = true;
    seekTo(e);
    document.addEventListener('mousemove', scrub);
    document.addEventListener('mouseup', stopScrub);
    document.addEventListener('touchmove', scrub, { passive: false });
    document.addEventListener('touchend', stopScrub);
}

function scrub(e) {
    if (isScrubbing) {
        e.preventDefault();
        seekTo(e);
    }
}

function stopScrub() {
    isScrubbing = false;
    document.removeEventListener('mousemove', scrub);
    document.removeEventListener('mouseup', stopScrub);
    document.removeEventListener('touchmove', scrub);
    document.removeEventListener('touchend', stopScrub);
}

// Toggle play/pause
function togglePlayPause() {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

// Update play/pause button state
function updatePlayPauseState() {
    playPauseBtn.classList.toggle('playing', !videoPlayer.paused);
}

// Toggle mute
function toggleMute() {
    videoPlayer.muted = !videoPlayer.muted;
    volumeBtn.classList.toggle('muted', videoPlayer.muted);
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (videoView.requestFullscreen) {
            videoView.requestFullscreen();
        } else if (videoView.webkitRequestFullscreen) {
            videoView.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

// Update fullscreen state
function updateFullscreenState() {
    const isFs = document.fullscreenElement || document.webkitFullscreenElement;
    videoView.classList.toggle('is-fullscreen', !!isFs);
}

// Event listeners
backBtn.addEventListener('click', goHome);
videoView.addEventListener('mousemove', showControls);
videoView.addEventListener('touchstart', showControls);

// Click on video to play/pause
videoPlayer.addEventListener('click', togglePlayPause);

// Keep controls visible when hovering over them
const videoControls = document.getElementById('video-controls');
videoControls.addEventListener('mouseenter', () => {
    controlsHovered = true;
    clearTimeout(hideTimeout);
});
videoControls.addEventListener('mouseleave', () => {
    controlsHovered = false;
    showControls();
});

videoPlayer.addEventListener('timeupdate', updateProgress);
videoPlayer.addEventListener('loadstart', () => loadingSpinner.classList.add('active'));
videoPlayer.addEventListener('canplay', () => loadingSpinner.classList.remove('active'));
videoPlayer.addEventListener('waiting', () => loadingSpinner.classList.add('active'));
videoPlayer.addEventListener('playing', () => loadingSpinner.classList.remove('active'));
videoPlayer.addEventListener('ended', () => setTimeout(goHome, 500));

progressBar.addEventListener('mousedown', startScrub);
progressBar.addEventListener('touchstart', startScrub, { passive: false });
progressBar.addEventListener('click', (e) => {
    e.stopPropagation();
    seekTo(e);
});
progressBar.addEventListener('mousemove', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const time = percent * videoPlayer.duration;
    if (!isNaN(time)) {
        progressTooltip.textContent = formatTime(time);
        progressTooltip.style.left = `${percent * 100}%`;
    }
});
playPauseBtn.addEventListener('click', togglePlayPause);
volumeBtn.addEventListener('click', toggleMute);
fullscreenBtn.addEventListener('click', toggleFullscreen);

videoPlayer.addEventListener('play', updatePlayPauseState);
videoPlayer.addEventListener('pause', updatePlayPauseState);

document.addEventListener('fullscreenchange', updateFullscreenState);
document.addEventListener('webkitfullscreenchange', updateFullscreenState);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!videoView.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            goHome();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
        case 'm':
        case 'M':
            toggleMute();
            break;
        case ' ':
            e.preventDefault();
            togglePlayPause();
            break;
    }
});

document.addEventListener('DOMContentLoaded', init);
