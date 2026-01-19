# Wedding Website - Quick Start Guide

## What Was Created

This repository now contains a complete static wedding website ready for GitHub Pages deployment. The site replicates the functionality of the original server-side rendered website at the provided URL.

## Features

✨ **Single-Page Application**
- Beautiful hero section with full-screen background photo
- 7 navigation buttons: Ceremony, Reception, First Dance, Speeches, Vows, Highlights, Thank You
- Videos play inline in a modal overlay (no new tabs)
- Synchronized audio playback with videos
- Smooth CSS animations and transitions

📱 **Responsive Design**
- Desktop: Vertical button navigation on the right side
- Mobile: Horizontal button navigation at the bottom
- Optimized for all screen sizes

🎬 **Media Management**
- Git LFS configured for large file storage
- Organized asset structure (photos, videos, audios)
- Placeholder files ready to be replaced

🚀 **Automated Deployment**
- GitHub Actions workflow included
- Deploys automatically when changes are pushed to main branch

## Getting Started

### Step 1: Add Your Media Files

You have two options:

**Option A: Use the Setup Script (Recommended)**
```bash
# 1. Download all media from the original website
# 2. Create a folder called 'downloaded_media' and put all files there
# 3. Run the setup script:
./setup_media.sh
```

**Option B: Manual Setup**
Place your files directly in the asset directories:
- `assets/photos/main-photo.jpg` - Main background photo
- `assets/videos/*.mp4` - 7 video files (see assets/README.md for names)
- `assets/audios/*.mp3` - 7 audio files (optional if videos contain audio)

See `DOWNLOAD_MEDIA.md` for detailed download instructions.

### Step 2: Commit and Push Media Files

```bash
git add assets/
git commit -m "Add wedding media files"
git push
```

Git LFS will automatically handle the large files!

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select the branch (e.g., `main` or this PR branch)
4. Click "Save"
5. Your site will be live at: `https://ben-epstein.github.io/wedding-website/`

## File Structure

```
wedding-website/
├── index.html              # Main HTML structure
├── styles.css              # All styling and animations
├── script.js               # Video loading and interaction logic
├── assets/
│   ├── photos/            # Background photo(s)
│   ├── videos/            # Video files (*.mp4)
│   └── audios/            # Audio files (*.mp3)
├── .gitattributes         # Git LFS configuration
├── .github/workflows/     # GitHub Actions for deployment
├── DOWNLOAD_MEDIA.md      # Guide for downloading media
├── setup_media.sh         # Script to organize downloaded files
└── README.md              # Full documentation
```

## Customization

### Change Button Labels
Edit the button text in `index.html`:
```html
<button class="nav-button" data-video="1" data-audio="1">
    <span>Your Custom Label</span>
</button>
```

### Change Colors
The primary accent color is gold (`#d4af37`). Search and replace this value in `styles.css` to change the theme color.

### Add/Remove Buttons
1. Add/remove button elements in `index.html`
2. Update the `mediaFiles` object in `script.js`
3. Add corresponding video/audio files in the assets folder

### Change Title and Text
- Edit `<title>` in `index.html` for browser tab title
- Edit `<h1>` and subtitle text in the hero section

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## Troubleshooting

**Videos not loading?**
- Check that video files are named correctly (e.g., `ceremony.mp4`)
- Verify files are in the correct directories
- Check browser console for error messages

**Autoplay not working?**
- This is normal browser behavior for autoplay policies
- Users may need to click the play button
- The code handles this gracefully with error catching

**GitHub Pages not showing changes?**
- GitHub Pages can take a few minutes to update
- Clear your browser cache
- Check the Actions tab for deployment status

## Support

For questions or issues:
1. Check the `README.md` for detailed documentation
2. Review `DOWNLOAD_MEDIA.md` for media file help
3. Check the `assets/README.md` for file naming conventions

## Credits

Built as a simple, elegant static site with:
- Pure HTML5, CSS3, and JavaScript
- No frameworks or dependencies
- Optimized for performance and simplicity

Enjoy your beautiful wedding website! 💍✨
