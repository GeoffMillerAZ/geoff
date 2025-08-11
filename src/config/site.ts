/**
 * Site Configuration
 * Centralized configuration for site-wide settings
 */

export const siteConfig = {
  // Profile settings
  profile: {
    showAvatar: true, // Set to false to hide the profile picture/avatar
    initials: "GM", // Initials to display in the avatar
    name: "Geoffrey Miller",
    title: "Infrastructure Director & Principal Cloud Architect",
    location: "Phoenix, AZ",
    
    // Social links
    social: {
      github: "GeoffMillerAZ",
      linkedin: "geoff-e-miller",
    },
    
    // Resume download link
    resumePath: "/resume/Geoffrey_Miller_Resume_cv20250723a.pdf",
  },
  
  // Theme settings
  theme: {
    // Synthwave '84 color scheme
    colors: {
      background: "#241b2f",
      pink: "#f92aad",
      cyan: "#72f1b8",
      yellow: "#fede5d",
      blue: "#36f9f6",
      purple: "#ff7edb",
    },
    
    // Animation settings
    animations: {
      subtlePulse: true, // Enable/disable subtle pulse animation on name
      glowIntensity: "subtle", // Options: "none", "subtle", "medium", "strong"
    },
  },
  
  // SEO settings
  seo: {
    title: "Geoffrey Miller - Platform Engineering & Cloud Architecture",
    description: "Infrastructure Director and Principal Cloud Architect specializing in Kubernetes, Platform Engineering, and Cloud Infrastructure",
    keywords: ["Platform Engineering", "Cloud Architecture", "Kubernetes", "DevOps", "Infrastructure"],
  },
};

export type SiteConfig = typeof siteConfig;