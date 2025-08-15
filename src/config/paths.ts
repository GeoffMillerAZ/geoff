/**
 * Path configuration for the application
 * Uses absolute paths to avoid relative path confusion
 */

// Base directories
export const PATHS = {
  // Source directories
  components: '@/components',
  layouts: '@/layouts',
  pages: '@/pages',
  styles: '@/styles',
  utils: '@/utils',
  content: '@/content',
  config: '@/config',
  
  // Component subdirectories
  navigation: '@/components/navigation',
  home: '@/components/home',
  ui: '@/components/ui',
  
  // Asset paths
  images: '@/assets/images',
  
  // Build output
  dist: 'dist',
} as const;

// Helper function to resolve paths
export function resolvePath(path: keyof typeof PATHS): string {
  return PATHS[path];
}