# Wedding Website

A beautiful single-page wedding website with video gallery, hosted on GitHub Pages.

## Features

- 📸 Stunning hero section with background photo
- 🎬 7 video sections (Ceremony, Reception, First Dance, Speeches, Vows, Highlights, Thank You)
- 🎵 Synchronized audio playback with videos
- ✨ Smooth CSS animations and transitions
- 📱 Fully responsive design
- 🎯 Single-page application - videos load inline without opening new tabs

## Setup

### 1. Add Your Media Files

This repository is configured with Git LFS to handle large media files. Add your wedding photos, videos, and audio files:

```bash
# Place your files in the assets directories:
# - Main photo: assets/photos/main-photo.jpg
# - Videos: assets/videos/*.mp4
# - Audios: assets/audios/*.mp3

# Commit and push (Git LFS will handle the large files)
git add assets/
git commit -m "Add wedding media"
git push
```

See `assets/README.md` for detailed file naming conventions.

### 2. Enable GitHub Pages

1. Go to your repository Settings
2. Navigate to "Pages" section
3. Under "Source", select the branch (e.g., `main`)
4. Click Save
5. Your site will be available at: `https://[username].github.io/wedding-website/`

## File Structure

```
wedding-website/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Video loading and interaction logic
├── assets/
│   ├── photos/         # Background photos
│   ├── videos/         # Video files
│   └── audios/         # Audio files
├── .gitattributes      # Git LFS configuration
└── README.md
```

## Customization

### Changing Button Labels
Edit the button text in `index.html`:
```html
<button class="nav-button" data-video="1" data-audio="1">
    <span>Your Custom Label</span>
</button>
```

### Changing Colors
Edit the color scheme in `styles.css`:
- Primary accent color: `#d4af37` (gold)
- Change this value throughout the CSS file

### Adding/Removing Buttons
1. Add/remove button elements in `index.html`
2. Update the `mediaFiles` object in `script.js` with corresponding video/audio paths

## Technology Stack

- Pure HTML5, CSS3, and JavaScript (no frameworks required)
- Git LFS for large file storage
- GitHub Pages for hosting

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

Personal use for wedding memories.