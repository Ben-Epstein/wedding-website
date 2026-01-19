#!/bin/bash

# Media Download Script for Wedding Website
# This script helps organize downloaded media files into the correct structure

set -e

echo "===== Wedding Website Media Setup ====="
echo ""
echo "This script will help you organize your downloaded media files."
echo ""

# Create asset directories if they don't exist
mkdir -p assets/photos assets/videos assets/audios

# Function to check if a file exists
check_file() {
    if [ -f "$1" ]; then
        echo "✓ Found: $1"
        return 0
    else
        echo "✗ Missing: $1"
        return 1
    fi
}

echo "Step 1: Download media from the original website"
echo "Visit the original wedding website in your browser"
echo ""
echo "Instructions:"
echo "1. Open the website in your browser"
echo "2. Open Developer Tools (F12)"
echo "3. Go to the Network tab"
echo "4. Click each navigation button to load videos"
echo "5. Right-click on media files in Network tab and download them"
echo "6. Save the main background photo"
echo ""
read -p "Have you downloaded all the files? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please download the files first, then run this script again."
    exit 1
fi

echo ""
echo "Step 2: Place your downloaded files in a temporary location"
echo "Create a folder called 'downloaded_media' and put all your files there"
echo ""
read -p "Have you created the 'downloaded_media' folder with your files? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please organize your files first."
    exit 1
fi

echo ""
echo "Step 3: Let's identify and move your files"
echo ""
echo "Please provide the original filename for each asset:"
echo ""

# Main photo
read -p "Main background photo filename (press Enter to skip): " main_photo
if [ ! -z "$main_photo" ] && [ -f "downloaded_media/$main_photo" ]; then
    cp "downloaded_media/$main_photo" "assets/photos/main-photo.jpg"
    echo "✓ Copied main photo"
fi

# Videos
video_names=("ceremony" "reception" "first-dance" "speeches" "vows" "highlights" "thank-you")
echo ""
echo "Now for the videos (press Enter to skip any):"
for video in "${video_names[@]}"; do
    read -p "$video video filename: " filename
    if [ ! -z "$filename" ] && [ -f "downloaded_media/$filename" ]; then
        cp "downloaded_media/$filename" "assets/videos/${video}.mp4"
        echo "✓ Copied ${video} video"
    fi
done

# Audios
echo ""
echo "Now for the audio files (press Enter to skip any):"
for video in "${video_names[@]}"; do
    read -p "$video audio filename: " filename
    if [ ! -z "$filename" ] && [ -f "downloaded_media/$filename" ]; then
        cp "downloaded_media/$filename" "assets/audios/${video}.mp3"
        echo "✓ Copied ${video} audio"
    fi
done

echo ""
echo "===== File Check ====="
echo ""
echo "Photos:"
check_file "assets/photos/main-photo.jpg"
echo ""
echo "Videos:"
for video in "${video_names[@]}"; do
    check_file "assets/videos/${video}.mp4"
done
echo ""
echo "Audios:"
for video in "${video_names[@]}"; do
    check_file "assets/audios/${video}.mp3"
done

echo ""
echo "===== Next Steps ====="
echo ""
echo "1. Review the files in the assets/ directory"
echo "2. If videos already contain audio, you may not need separate audio files"
echo "3. Add and commit the files:"
echo "   git add assets/"
echo "   git commit -m 'Add wedding media files'"
echo "   git push"
echo ""
echo "4. Enable GitHub Pages:"
echo "   - Go to repository Settings"
echo "   - Navigate to Pages section"
echo "   - Select your branch as the source"
echo ""
echo "Done!"
