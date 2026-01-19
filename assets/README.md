# Wedding Website - Asset Guide

This directory contains all media assets for the wedding website.

## Directory Structure

```
assets/
├── photos/
│   └── main-photo.jpg       # Main landing page background photo
├── videos/
│   ├── ceremony.mp4         # Button 1: Ceremony video
│   ├── reception.mp4        # Button 2: Reception video
│   ├── first-dance.mp4      # Button 3: First Dance video
│   ├── speeches.mp4         # Button 4: Speeches video
│   ├── vows.mp4            # Button 5: Vows video
│   ├── highlights.mp4       # Button 6: Highlights video
│   └── thank-you.mp4        # Button 7: Thank You video
└── audios/
    ├── ceremony.mp3         # Audio for ceremony video
    ├── reception.mp3        # Audio for reception video
    ├── first-dance.mp3      # Audio for first dance video
    ├── speeches.mp3         # Audio for speeches video
    ├── vows.mp3            # Audio for vows video
    ├── highlights.mp3       # Audio for highlights video
    └── thank-you.mp3        # Audio for thank you video
```

## Adding Your Media Files

### Step 1: Download Media from Original Site
Visit the original website and download all videos, audios, and the main photo.

### Step 2: Name Your Files
Rename your downloaded files to match the names above.

### Step 3: Add Files to Repository
Place each file in its corresponding directory:
- Main background photo → `photos/`
- All video files → `videos/`
- All audio files → `audios/`

### Step 4: Commit with Git LFS
```bash
git add assets/
git commit -m "Add wedding media assets"
git push
```

Git LFS is already configured to handle these large files automatically.

## Notes
- All media files are tracked with Git LFS (configured in `.gitattributes`)
- Video format: MP4 recommended
- Audio format: MP3 recommended
- Photo format: JPG/PNG recommended
- The website will automatically load these files when buttons are clicked
