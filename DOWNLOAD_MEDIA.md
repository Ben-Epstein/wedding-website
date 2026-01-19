# How to Download Media Files from Original Website

Since the original website at `https://clients.visiproductions.com/mail/link/b97e72cbdb671e29f1f31051` is server-side rendered, here's how to download all the media files:

## Method 1: Using Browser Developer Tools

1. **Visit the original website** in Chrome or Firefox
2. **Open Developer Tools** (F12 or Right-click → Inspect)
3. **Go to the Network tab**
4. **Filter by Media** (or look for .mp4, .mp3, .jpg files)
5. **Click on each navigation button** to trigger the video loads
6. **For each loaded media file:**
   - Right-click on the file in the Network tab
   - Select "Open in new tab" or "Copy link address"
   - Download or save the file

## Method 2: Using Browser's Save Feature

1. **Visit the original website**
2. **For the background photo:**
   - Right-click on the main background image
   - Select "Save Image As..."
   - Save as `main-photo.jpg`

3. **For each video:**
   - Click the navigation button to load the video
   - Right-click on the playing video
   - Select "Save Video As..." 
   - Name according to the asset guide

4. **For audio files:**
   - Check the Network tab to find the audio URLs
   - Download directly from there

## Method 3: Using Command Line (if URLs are known)

```bash
# Example if you have direct URLs:
cd assets/photos
wget -O main-photo.jpg "https://example.com/photo.jpg"

cd ../videos
wget -O ceremony.mp4 "https://example.com/video1.mp4"
# ... repeat for all videos

cd ../audios
wget -O ceremony.mp3 "https://example.com/audio1.mp3"
# ... repeat for all audios
```

## After Downloading

Once you have all the media files:

1. **Rename them** according to this structure:
   ```
   assets/
   ├── photos/main-photo.jpg
   ├── videos/
   │   ├── ceremony.mp4
   │   ├── reception.mp4
   │   ├── first-dance.mp4
   │   ├── speeches.mp4
   │   ├── vows.mp4
   │   ├── highlights.mp4
   │   └── thank-you.mp4
   └── audios/
       ├── ceremony.mp3
       ├── reception.mp3
       ├── first-dance.mp3
       ├── speeches.mp3
       ├── vows.mp3
       ├── highlights.mp3
       └── thank-you.mp3
   ```

2. **Replace the placeholder files** in this repository

3. **Commit and push:**
   ```bash
   git add assets/
   git commit -m "Add actual wedding media files"
   git push
   ```

Git LFS will automatically handle the large files!

## Button Labels

If the original website has different button labels than "Ceremony", "Reception", etc., update the button text in `index.html` to match the original.

## Notes

- The original website may have the videos and audio files combined in one file. If that's the case, you may not need separate audio files.
- If videos already contain audio, you can skip the separate audio files and remove the audio synchronization code from `script.js`.
- Make sure to check the video format - if they're not MP4, you may need to convert them or update the HTML video source type.
