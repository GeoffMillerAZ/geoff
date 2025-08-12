# Image Assets Directory

This directory contains all image assets for the site, organized by purpose.

## Directory Structure

```
images/
├── profile/           # Profile pictures and headshots
│   ├── *-thumb.*     # 128x128 - Small avatars
│   ├── *-small.*     # 256x256 - Medium avatars  
│   ├── *-medium.*    # 512x512 - Large avatars
│   ├── *-large.*     # 1024x1024 - Full profile views
│   └── *-original.*  # Original source files
├── blog/             # Blog post images
├── projects/         # Project showcase images
└── README.md         # This file
```

## Image Formats

- **WebP**: Primary format for modern browsers (85% quality)
- **JPEG**: Fallback format for older browsers (90% quality, progressive)
- All images are square cropped and centered for consistency

## Git LFS

All images are tracked with Git LFS to keep the repository size manageable:
- `.jpg`, `.jpeg`, `.png`, `.webp` files are automatically tracked
- Run `git lfs status` to verify LFS tracking

## Adding New Images

1. Place original images in the appropriate directory
2. Run the optimization script: `node scripts/optimize-images.js`
3. The script will:
   - Generate multiple sizes
   - Create WebP and JPEG versions
   - Preserve the original for future use

## Using Images in Components

The `Avatar` component automatically handles:
- Responsive image loading
- WebP with JPEG fallback
- Proper lazy loading
- Size optimization

Example:
```astro
import Avatar from '@/components/ui/Avatar.astro';

<Avatar size="medium" showRing={true} />
```

## Performance

- All images are optimized for web delivery
- Multiple sizes ensure appropriate resolution for each use case
- WebP format reduces file size by ~30% compared to JPEG
- Lazy loading prevents unnecessary bandwidth usage