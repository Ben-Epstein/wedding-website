# Wedding Website - Asset Guide

This directory contains all media assets for the wedding website.

## Directory Structure

```
assets/
├── photos/
│   └── main-photo.jpg                      # Main landing page background photo
├── videos/
│   ├── the-wedding-film.mp4                # Button 1: The Wedding Film
│   ├── morning-prep-first-look.mp4         # Button 2: Morning Prep + First Look
│   ├── ketubah-sign.mp4                    # Button 3: Ketubah Sign
│   ├── ceremony-part-1.mp4                 # Button 4: Ceremony Part 1
│   ├── ceremony-part-2.mp4                 # Button 5: Ceremony Part 2
│   ├── picture-session.mp4                 # Button 6: Picture Session
│   ├── cocktail-hour.mp4                   # Button 7: Cocktail Hour
│   ├── reception-part-1.mp4                # Button 8: Reception Part 1
│   ├── reception-part-2.mp4                # Button 9: Reception Part 2
│   ├── reception-part-3.mp4                # Button 10: Reception Part 3
│   └── reception-part-4.mp4                # Button 11: Reception Part 4
└── audios/
    ├── the-wedding-film.mp3                # Audio for The Wedding Film
    ├── morning-prep-first-look.mp3         # Audio for Morning Prep + First Look
    ├── ketubah-sign.mp3                    # Audio for Ketubah Sign
    ├── ceremony-part-1.mp3                 # Audio for Ceremony Part 1
    ├── ceremony-part-2.mp3                 # Audio for Ceremony Part 2
    ├── picture-session.mp3                 # Audio for Picture Session
    ├── cocktail-hour.mp3                   # Audio for Cocktail Hour
    ├── reception-part-1.mp3                # Audio for Reception Part 1
    ├── reception-part-2.mp3                # Audio for Reception Part 2
    ├── reception-part-3.mp3                # Audio for Reception Part 3
    └── reception-part-4.mp3                # Audio for Reception Part 4
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
