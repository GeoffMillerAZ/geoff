import { parse } from 'yaml';
import fs from 'fs';
import path from 'path';
import type { ThemeConfig } from '@/data/theme-presets';
import { themePresets } from '@/data/theme-presets';

// Load and parse the theme configuration
export function getThemeConfig(): ThemeConfig {
  try {
    const yamlPath = path.join(process.cwd(), 'src', 'data', 'theme.yaml');
    const yamlContent = fs.readFileSync(yamlPath, 'utf8');
    return parse(yamlContent) as ThemeConfig;
  } catch (error) {
    console.error('Error loading theme configuration:', error);
    // Return default synthwave84 theme as fallback
    return themePresets.synthwave84;
  }
}

// Get a specific preset
export function getPreset(presetName: string): ThemeConfig | undefined {
  return themePresets[presetName];
}

// Get all available presets
export function getAllPresets(): string[] {
  return Object.keys(themePresets);
}

// Apply theme configuration to CSS variables
export function generateThemeCSS(theme: ThemeConfig): string {
  return `
    :root {
      /* Primary Colors */
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-accent: ${theme.colors.accent};
      --color-neutral: ${theme.colors.neutral};
      
      /* Base Colors */
      --color-base-100: ${theme.colors.base100};
      --color-base-200: ${theme.colors.base200};
      --color-base-300: ${theme.colors.base300};
      
      /* Status Colors */
      --color-info: ${theme.colors.info};
      --color-success: ${theme.colors.success};
      --color-warning: ${theme.colors.warning};
      --color-error: ${theme.colors.error};
      
      /* Text Colors */
      --color-text-primary: ${theme.colors.textPrimary};
      --color-text-secondary: ${theme.colors.textSecondary};
      --color-text-accent: ${theme.colors.textAccent};
      
      /* Glow Effects */
      --glow-pink: ${theme.colors.glowPink};
      --glow-cyan: ${theme.colors.glowCyan};
      --glow-white: ${theme.colors.glowWhite};
      --glow-intensity: ${theme.colors.glowIntensity};
      
      /* Typography */
      --font-family: ${theme.typography.fontFamily};
      --font-family-heading: ${theme.typography.headingFamily};
      --font-size-base: ${theme.typography.fontSize.base};
      --font-size-small: ${theme.typography.fontSize.small};
      --font-size-large: ${theme.typography.fontSize.large};
      
      /* Animations */
      --animation-duration: ${theme.animations.duration};
      --animation-easing: ${theme.animations.easing};
      
      /* Layout */
      --max-width: ${theme.layout.maxWidth};
      
      /* Custom CSS Variables */
      ${Object.entries(theme.customCSS.variables)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n      ')}
    }
    
    /* Apply effects based on configuration */
    ${!theme.effects.animations ? `
    * {
      animation: none !important;
      transition: none !important;
    }` : ''}
    
    ${!theme.effects.glowEffects ? `
    .text-glow-pink,
    .text-glow-cyan,
    .text-glow-white {
      text-shadow: none !important;
    }` : ''}
    
    ${theme.effects.scanlines ? `
    body::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
      );
      pointer-events: none;
      z-index: 9999;
    }` : ''}
  `;
}

// Check if features are enabled
export function isFeatureEnabled(theme: ThemeConfig, feature: keyof ThemeConfig['features']): boolean {
  return theme.features[feature] ?? true;
}

// Export theme configuration as YAML string
export function exportThemeAsYAML(theme: ThemeConfig): string {
  const yaml = require('yaml');
  return yaml.stringify(theme, { indent: 2 });
}

// Export theme configuration as JSON string
export function exportThemeAsJSON(theme: ThemeConfig): string {
  return JSON.stringify(theme, null, 2);
}