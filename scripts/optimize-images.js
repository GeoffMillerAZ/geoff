import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

async function optimizeProfileImage() {
  const inputPath = 'src/assets/geoff-headshot-zoom-small.jpeg';
  const outputDir = 'src/assets/images/profile';
  
  try {
    // Read the original image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Original image: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);
    
    // Create multiple sizes for responsive images
    const sizes = [
      { width: 128, suffix: 'thumb' },  // For small avatars
      { width: 256, suffix: 'small' },  // For medium avatars
      { width: 512, suffix: 'medium' }, // For large avatars
      { width: 1024, suffix: 'large' }  // For full profile views
    ];
    
    for (const size of sizes) {
      // WebP version (best compression)
      await sharp(inputPath)
        .resize(size.width, size.width, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, `geoff-miller-${size.suffix}.webp`));
      
      console.log(`Created: geoff-miller-${size.suffix}.webp`);
      
      // JPEG fallback
      await sharp(inputPath)
        .resize(size.width, size.width, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 90, progressive: true })
        .toFile(path.join(outputDir, `geoff-miller-${size.suffix}.jpg`));
      
      console.log(`Created: geoff-miller-${size.suffix}.jpg`);
    }
    
    // Move original to profile directory as backup
    await fs.rename(inputPath, path.join(outputDir, 'geoff-miller-original.jpeg'));
    console.log('Moved original to profile directory');
    
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeProfileImage();