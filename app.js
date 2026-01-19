// Video data
const videos = [
    {
        id: 1,
        name: "The Wedding Film",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/919793f9-c26e-42ff-bab8-6aa0de0c4411/cmaf_transcoded/o.m3u8",
        thumbnail: "images/01-wedding-film.jpg"
    },
    {
        id: 2,
        name: "Morning Prep + First Look",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/374f5af3-4aa2-4872-8c10-7e2fc4342027/cmaf_transcoded/o.m3u8",
        thumbnail: "images/02-morning-prep.jpg"
    },
    {
        id: 3,
        name: "Ketubah Sign",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/68f706c6-b1e5-4c14-a16f-5e3977ed5e7f/cmaf_transcoded/o.m3u8",
        thumbnail: "images/03-ketubah.jpg"
    },
    {
        id: 4,
        name: "Ceremony Part 1",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/538a148f-d635-4753-b63a-42e7169dcf40/cmaf_transcoded/o.m3u8",
        thumbnail: "images/04-ceremony-1.jpg"
    },
    {
        id: 5,
        name: "Ceremony Part 2",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/6fc0621f-619c-4776-be38-83232718e315/cmaf_transcoded/o.m3u8",
        thumbnail: "images/05-ceremony-2.jpg"
    },
    {
        id: 6,
        name: "Picture Session",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/7c186ff7-de7c-4ca9-959e-1b7803b44a4f/cmaf_transcoded/o.m3u8",
        thumbnail: "images/06-picture-session.jpg"
    },
    {
        id: 7,
        name: "Cocktail Hour",
        videoUrl: null, // Video URL not available
        thumbnail: "images/07-cocktail-hour.jpg"
    },
    {
        id: 8,
        name: "Reception Part 1",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/929633ec-1d67-4893-8a2e-f766987a505b/cmaf_transcoded/o.m3u8",
        thumbnail: "images/08-reception-1.jpg"
    },
    {
        id: 9,
        name: "Reception Part 2",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/d3a8e94d-211e-402e-83e7-6535fc3b15e4/cmaf_transcoded/o.m3u8",
        thumbnail: "images/09-reception-2.jpg"
    },
    {
        id: 10,
        name: "Reception Part 3",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/013874cf-c0ca-4e02-8523-6124460805d4/cmaf_transcoded/o.m3u8",
        thumbnail: "images/10-reception-3.jpg"
    },
    {
        id: 11,
        name: "Reception Part 4",
        videoUrl: "https://videos.prod.mediazilla.com/2/a/3c631f11-cc0e-4258-b8de-235622a2162c/cmaf_transcoded/o.m3u8",
        thumbnail: "images/11-reception-4.jpg"
    }
];

// State
let currentVideoIndex = 0;
let hls = null;

// DOM Elements
const videoPlayer = document.getElementById('video-player');
const menuContainer = document.getElementById('menu-items');
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize the app
function init() {
    createMenuItems();
    loadVideo(0);
}

// Create menu items
function createMenuItems() {
    videos.forEach((video, index) => {
        const button = document.createElement('button');
        button.className = 'menu-item';
        button.textContent = video.name;
        button.dataset.index = index;

        if (!video.videoUrl) {
            button.classList.add('disabled');
            button.title = 'Video not available';
        }

        button.addEventListener('click', () => {
            if (video.videoUrl) {
                loadVideo(index);
            }
        });

        menuContainer.appendChild(button);
    });
}

// Update active menu item
function updateActiveMenuItem(index) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Show/hide loading overlay
function setLoading(isLoading) {
    loadingOverlay.classList.toggle('active', isLoading);
}

// Load video
function loadVideo(index) {
    const video = videos[index];

    if (!video || !video.videoUrl) {
        console.error('Video not available');
        return;
    }

    currentVideoIndex = index;
    updateActiveMenuItem(index);
    setLoading(true);

    // Update poster
    videoPlayer.poster = video.thumbnail;

    // Destroy existing HLS instance
    if (hls) {
        hls.destroy();
        hls = null;
    }

    const videoUrl = video.videoUrl;

    // Check if HLS is supported
    if (Hls.isSupported()) {
        hls = new Hls({
            maxBufferLength: 30,
            maxMaxBufferLength: 60
        });

        hls.loadSource(videoUrl);
        hls.attachMedia(videoPlayer);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setLoading(false);
            videoPlayer.play().catch(() => {
                // Autoplay may be blocked, that's OK
            });
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
            setLoading(false);
            if (data.fatal) {
                console.error('HLS error:', data.type, data.details);
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.log('Network error - trying to recover');
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log('Media error - trying to recover');
                        hls.recoverMediaError();
                        break;
                    default:
                        console.error('Fatal error - cannot recover');
                        hls.destroy();
                        break;
                }
            }
        });
    } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        videoPlayer.src = videoUrl;
        videoPlayer.addEventListener('loadedmetadata', () => {
            setLoading(false);
            videoPlayer.play().catch(() => {});
        }, { once: true });
    } else {
        console.error('HLS is not supported in this browser');
        setLoading(false);
    }
}

// Video event listeners
videoPlayer.addEventListener('waiting', () => setLoading(true));
videoPlayer.addEventListener('playing', () => setLoading(false));
videoPlayer.addEventListener('canplay', () => setLoading(false));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentVideoIndex > 0) {
                const prevIndex = currentVideoIndex - 1;
                if (videos[prevIndex].videoUrl) {
                    loadVideo(prevIndex);
                }
            }
            break;
        case 'ArrowRight':
            if (currentVideoIndex < videos.length - 1) {
                const nextIndex = currentVideoIndex + 1;
                if (videos[nextIndex].videoUrl) {
                    loadVideo(nextIndex);
                }
            }
            break;
        case ' ':
            if (document.activeElement.tagName !== 'BUTTON') {
                e.preventDefault();
                if (videoPlayer.paused) {
                    videoPlayer.play();
                } else {
                    videoPlayer.pause();
                }
            }
            break;
    }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
