// Theme Presets for the site
export interface ThemeConfig {
  preset: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    base100: string;
    base200: string;
    base300: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    glowPink: string;
    glowCyan: string;
    glowWhite: string;
    glowIntensity: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      base: string;
      small: string;
      large: string;
    };
    headingFamily: string;
  };
  effects: {
    animations: boolean;
    glowEffects: boolean;
    gradients: boolean;
    blur: boolean;
    transitions: boolean;
    neonBorders: boolean;
    scanlines: boolean;
  };
  components: {
    avatar: {
      show: boolean;
      showRing: boolean;
      glowEffect: boolean;
    };
    cards: {
      glassmorphism: boolean;
      borderGlow: boolean;
      hoverEffects: boolean;
    };
    buttons: {
      glowOnHover: boolean;
      pulseAnimation: boolean;
    };
    navigation: {
      sticky: boolean;
      blur: boolean;
      transparentOnScroll: boolean;
    };
  };
  features: {
    blog: boolean;
    projects: boolean;
    guides: boolean;
    resources: boolean;
    about: boolean;
    contact: boolean;
    profileSection: boolean;
    experienceSection: boolean;
    skillsSection: boolean;
    educationSection: boolean;
    certificationsSection: boolean;
    awardsSection: boolean;
    achievementsSection: boolean;
    search: boolean;
    darkModeToggle: boolean;
    analytics: boolean;
    newsletter: boolean;
    comments: boolean;
  };
  layout: {
    maxWidth: string;
    sidebarPosition: 'left' | 'right';
    contentLayout: 'default' | 'centered' | 'wide';
    spacing: 'compact' | 'normal' | 'spacious';
  };
  animations: {
    pageTransitions: boolean;
    scrollAnimations: boolean;
    hoverAnimations: boolean;
    loadingAnimations: boolean;
    duration: string;
    easing: string;
  };
  customCSS: {
    variables: Record<string, string>;
  };
}

export const themePresets: Record<string, ThemeConfig> = {
  synthwave84: {
    preset: "synthwave84",
    colors: {
      primary: "#f92aad",
      secondary: "#16fbff",
      accent: "#fee77b",
      neutral: "#2a2139",
      base100: "#241b2f",
      base200: "#262c49",
      base300: "#2a2139",
      info: "#00d9ff",
      success: "#00ff88",
      warning: "#ffaa00",
      error: "#ff0055",
      textPrimary: "#ffffff",
      textSecondary: "#f72f84",
      textAccent: "#16fbff",
      glowPink: "#f92aad",
      glowCyan: "#16fbff",
      glowWhite: "#ffffff",
      glowIntensity: "10px"
    },
    typography: {
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: {
        base: "16px",
        small: "14px",
        large: "18px"
      },
      headingFamily: "'Orbitron', 'JetBrains Mono', monospace"
    },
    effects: {
      animations: true,
      glowEffects: true,
      gradients: true,
      blur: true,
      transitions: true,
      neonBorders: true,
      scanlines: false
    },
    components: {
      avatar: {
        show: true,
        showRing: true,
        glowEffect: true
      },
      cards: {
        glassmorphism: true,
        borderGlow: true,
        hoverEffects: true
      },
      buttons: {
        glowOnHover: true,
        pulseAnimation: false
      },
      navigation: {
        sticky: true,
        blur: true,
        transparentOnScroll: false
      }
    },
    features: {
      blog: true,
      projects: true,
      guides: true,
      resources: true,
      about: true,
      contact: true,
      profileSection: true,
      experienceSection: true,
      skillsSection: true,
      educationSection: true,
      certificationsSection: true,
      awardsSection: true,
      achievementsSection: true,
      search: true,
      darkModeToggle: false,
      analytics: true,
      newsletter: false,
      comments: false
    },
    layout: {
      maxWidth: "1600px",
      sidebarPosition: "left",
      contentLayout: "default",
      spacing: "normal"
    },
    animations: {
      pageTransitions: true,
      scrollAnimations: true,
      hoverAnimations: true,
      loadingAnimations: true,
      duration: "300ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    customCSS: {
      variables: {
        "--gradient-1": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "--gradient-2": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "--border-radius": "0.5rem",
        "--shadow-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "--shadow-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }
    }
  },
  
  cyberpunk: {
    preset: "cyberpunk",
    colors: {
      primary: "#fcee09",
      secondary: "#00ff41",
      accent: "#ff003c",
      neutral: "#1a1a1a",
      base100: "#000000",
      base200: "#1a1a1a",
      base300: "#2a2a2a",
      info: "#00d4ff",
      success: "#00ff41",
      warning: "#ffc82c",
      error: "#ff003c",
      textPrimary: "#ffffff",
      textSecondary: "#fcee09",
      textAccent: "#00ff41",
      glowPink: "#ff003c",
      glowCyan: "#00d4ff",
      glowWhite: "#ffffff",
      glowIntensity: "15px"
    },
    typography: {
      fontFamily: "'Share Tech Mono', 'Courier New', monospace",
      fontSize: {
        base: "16px",
        small: "14px",
        large: "18px"
      },
      headingFamily: "'Audiowide', 'Share Tech Mono', monospace"
    },
    effects: {
      animations: true,
      glowEffects: true,
      gradients: false,
      blur: false,
      transitions: true,
      neonBorders: true,
      scanlines: true
    },
    components: {
      avatar: {
        show: true,
        showRing: true,
        glowEffect: true
      },
      cards: {
        glassmorphism: false,
        borderGlow: true,
        hoverEffects: true
      },
      buttons: {
        glowOnHover: true,
        pulseAnimation: true
      },
      navigation: {
        sticky: true,
        blur: false,
        transparentOnScroll: false
      }
    },
    features: {
      blog: true,
      projects: true,
      guides: true,
      resources: true,
      about: true,
      contact: true,
      profileSection: true,
      experienceSection: true,
      skillsSection: true,
      educationSection: true,
      certificationsSection: true,
      awardsSection: true,
      achievementsSection: true,
      search: true,
      darkModeToggle: false,
      analytics: true,
      newsletter: false,
      comments: false
    },
    layout: {
      maxWidth: "1600px",
      sidebarPosition: "left",
      contentLayout: "default",
      spacing: "normal"
    },
    animations: {
      pageTransitions: true,
      scrollAnimations: true,
      hoverAnimations: true,
      loadingAnimations: true,
      duration: "200ms",
      easing: "linear"
    },
    customCSS: {
      variables: {
        "--gradient-1": "linear-gradient(135deg, #fcee09 0%, #ff003c 100%)",
        "--gradient-2": "linear-gradient(135deg, #00ff41 0%, #00d4ff 100%)",
        "--border-radius": "0",
        "--shadow-sm": "0 0 5px rgba(252, 238, 9, 0.5)",
        "--shadow-lg": "0 0 20px rgba(252, 238, 9, 0.8)"
      }
    }
  },
  
  matrix: {
    preset: "matrix",
    colors: {
      primary: "#00ff00",
      secondary: "#008f11",
      accent: "#00ff00",
      neutral: "#0d0208",
      base100: "#000000",
      base200: "#0d0208",
      base300: "#003b00",
      info: "#00ff00",
      success: "#00ff00",
      warning: "#ffff00",
      error: "#ff0000",
      textPrimary: "#00ff00",
      textSecondary: "#008f11",
      textAccent: "#00ff00",
      glowPink: "#00ff00",
      glowCyan: "#00ff00",
      glowWhite: "#00ff00",
      glowIntensity: "20px"
    },
    typography: {
      fontFamily: "'Source Code Pro', 'Courier New', monospace",
      fontSize: {
        base: "14px",
        small: "12px",
        large: "16px"
      },
      headingFamily: "'Source Code Pro', monospace"
    },
    effects: {
      animations: true,
      glowEffects: true,
      gradients: false,
      blur: false,
      transitions: true,
      neonBorders: false,
      scanlines: true
    },
    components: {
      avatar: {
        show: false,
        showRing: false,
        glowEffect: false
      },
      cards: {
        glassmorphism: false,
        borderGlow: false,
        hoverEffects: true
      },
      buttons: {
        glowOnHover: false,
        pulseAnimation: false
      },
      navigation: {
        sticky: true,
        blur: false,
        transparentOnScroll: false
      }
    },
    features: {
      blog: true,
      projects: true,
      guides: true,
      resources: true,
      about: true,
      contact: true,
      profileSection: true,
      experienceSection: true,
      skillsSection: true,
      educationSection: true,
      certificationsSection: true,
      awardsSection: true,
      achievementsSection: true,
      search: true,
      darkModeToggle: false,
      analytics: true,
      newsletter: false,
      comments: false
    },
    layout: {
      maxWidth: "1200px",
      sidebarPosition: "left",
      contentLayout: "default",
      spacing: "compact"
    },
    animations: {
      pageTransitions: false,
      scrollAnimations: false,
      hoverAnimations: true,
      loadingAnimations: true,
      duration: "100ms",
      easing: "linear"
    },
    customCSS: {
      variables: {
        "--gradient-1": "none",
        "--gradient-2": "none",
        "--border-radius": "0",
        "--shadow-sm": "none",
        "--shadow-lg": "0 0 30px rgba(0, 255, 0, 0.5)"
      }
    }
  },
  
  minimal: {
    preset: "minimal",
    colors: {
      primary: "#000000",
      secondary: "#666666",
      accent: "#0066cc",
      neutral: "#f5f5f5",
      base100: "#ffffff",
      base200: "#f5f5f5",
      base300: "#e5e5e5",
      info: "#0066cc",
      success: "#00aa00",
      warning: "#ff9900",
      error: "#cc0000",
      textPrimary: "#000000",
      textSecondary: "#666666",
      textAccent: "#0066cc",
      glowPink: "#000000",
      glowCyan: "#0066cc",
      glowWhite: "#ffffff",
      glowIntensity: "0px"
    },
    typography: {
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      fontSize: {
        base: "16px",
        small: "14px",
        large: "18px"
      },
      headingFamily: "'Inter', sans-serif"
    },
    effects: {
      animations: false,
      glowEffects: false,
      gradients: false,
      blur: false,
      transitions: true,
      neonBorders: false,
      scanlines: false
    },
    components: {
      avatar: {
        show: true,
        showRing: false,
        glowEffect: false
      },
      cards: {
        glassmorphism: false,
        borderGlow: false,
        hoverEffects: false
      },
      buttons: {
        glowOnHover: false,
        pulseAnimation: false
      },
      navigation: {
        sticky: true,
        blur: false,
        transparentOnScroll: false
      }
    },
    features: {
      blog: true,
      projects: true,
      guides: true,
      resources: true,
      about: true,
      contact: true,
      profileSection: true,
      experienceSection: true,
      skillsSection: true,
      educationSection: true,
      certificationsSection: true,
      awardsSection: true,
      achievementsSection: true,
      search: true,
      darkModeToggle: true,
      analytics: true,
      newsletter: false,
      comments: false
    },
    layout: {
      maxWidth: "1200px",
      sidebarPosition: "left",
      contentLayout: "centered",
      spacing: "spacious"
    },
    animations: {
      pageTransitions: false,
      scrollAnimations: false,
      hoverAnimations: false,
      loadingAnimations: false,
      duration: "150ms",
      easing: "ease"
    },
    customCSS: {
      variables: {
        "--gradient-1": "none",
        "--gradient-2": "none",
        "--border-radius": "0.25rem",
        "--shadow-sm": "0 1px 3px rgba(0, 0, 0, 0.12)",
        "--shadow-lg": "0 10px 40px rgba(0, 0, 0, 0.15)"
      }
    }
  },

  corporate: {
    preset: "corporate",
    colors: {
      primary: "#1e40af",
      secondary: "#64748b",
      accent: "#0891b2",
      neutral: "#f8fafc",
      base100: "#ffffff",
      base200: "#f1f5f9",
      base300: "#e2e8f0",
      info: "#3b82f6",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      textAccent: "#0891b2",
      glowPink: "#1e40af",
      glowCyan: "#0891b2",
      glowWhite: "#1e40af",
      glowIntensity: "0px"
    },
    typography: {
      fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
      fontSize: {
        base: "16px",
        small: "14px",
        large: "18px"
      },
      headingFamily: "'IBM Plex Sans', sans-serif"
    },
    effects: {
      animations: true,
      glowEffects: false,
      gradients: true,
      blur: true,
      transitions: true,
      neonBorders: false,
      scanlines: false
    },
    components: {
      avatar: {
        show: true,
        showRing: true,
        glowEffect: false
      },
      cards: {
        glassmorphism: false,
        borderGlow: false,
        hoverEffects: true
      },
      buttons: {
        glowOnHover: false,
        pulseAnimation: false
      },
      navigation: {
        sticky: true,
        blur: true,
        transparentOnScroll: false
      }
    },
    features: {
      blog: true,
      projects: true,
      guides: true,
      resources: true,
      about: true,
      contact: true,
      profileSection: true,
      experienceSection: true,
      skillsSection: true,
      educationSection: true,
      certificationsSection: true,
      awardsSection: true,
      achievementsSection: true,
      search: true,
      darkModeToggle: true,
      analytics: true,
      newsletter: true,
      comments: false
    },
    layout: {
      maxWidth: "1400px",
      sidebarPosition: "left",
      contentLayout: "default",
      spacing: "normal"
    },
    animations: {
      pageTransitions: true,
      scrollAnimations: false,
      hoverAnimations: true,
      loadingAnimations: true,
      duration: "200ms",
      easing: "ease-in-out"
    },
    customCSS: {
      variables: {
        "--gradient-1": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "--gradient-2": "linear-gradient(135deg, #3b82f6 0%, #0891b2 100%)",
        "--border-radius": "0.375rem",
        "--shadow-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "--shadow-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }
    }
  },

  ocean: {
    preset: "ocean",
    colors: {
      primary: "#006994",
      secondary: "#00a8cc",
      accent: "#0093b7",
      neutral: "#1a2238",
      base100: "#0f172a",
      base200: "#1e293b",
      base300: "#334155",
      info: "#38bdf8",
      success: "#4ade80",
      warning: "#fbbf24",
      error: "#f87171",
      textPrimary: "#f1f5f9",
      textSecondary: "#94a3b8",
      textAccent: "#38bdf8",
      glowPink: "#00a8cc",
      glowCyan: "#38bdf8",
      glowWhite: "#f1f5f9",
      glowIntensity: "8px"
    },
    typography: {
      fontFamily: "'Raleway', 'Helvetica Neue', sans-serif",
      fontSize: {
        base: "16px",
        small: "14px",
        large: "18px"
      },
      headingFamily: "'Montserrat', sans-serif"
    },
    effects: {
      animations: true,
      glowEffects: true,
      gradients: true,
      blur: true,
      transitions: true,
      neonBorders: false,
      scanlines: false
    },
    components: {
      avatar: {
        show: true,
        showRing: true,
        glowEffect: true
      },
      cards: {
        glassmorphism: true,
        borderGlow: true,
        hoverEffects: true
      },
      buttons: {
        glowOnHover: true,
        pulseAnimation: false
      },
      navigation: {
        sticky: true,
        blur: true,
        transparentOnScroll: false
      }
    },
    features: {
      blog: true,
      projects: true,
      guides: true,
      resources: true,
      about: true,
      contact: true,
      profileSection: true,
      experienceSection: true,
      skillsSection: true,
      educationSection: true,
      certificationsSection: true,
      awardsSection: true,
      achievementsSection: true,
      search: true,
      darkModeToggle: false,
      analytics: true,
      newsletter: false,
      comments: false
    },
    layout: {
      maxWidth: "1600px",
      sidebarPosition: "left",
      contentLayout: "default",
      spacing: "normal"
    },
    animations: {
      pageTransitions: true,
      scrollAnimations: true,
      hoverAnimations: true,
      loadingAnimations: true,
      duration: "300ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    customCSS: {
      variables: {
        "--gradient-1": "linear-gradient(135deg, #006994 0%, #00a8cc 100%)",
        "--gradient-2": "linear-gradient(135deg, #0093b7 0%, #38bdf8 100%)",
        "--border-radius": "0.5rem",
        "--shadow-sm": "0 1px 3px rgba(0, 0, 0, 0.12)",
        "--shadow-lg": "0 10px 40px rgba(0, 0, 0, 0.15)"
      }
    }
  },

  forest: {
    preset: "forest",
    colors: {
      primary: "#2d5016",
      secondary: "#5a7c2e",
      accent: "#8b9e3e",
      neutral: "#1f2518",
      base100: "#0f1409",
      base200: "#1a1f13",
      base300: "#252b1c",
      info: "#6ea8fe",
      success: "#75b798",
      warning: "#ffc107",
      error: "#dc3545",
      textPrimary: "#e8f5e9",
      textSecondary: "#a5d6a7",
      textAccent: "#c5e1a5",
      glowPink: "#8b9e3e",
      glowCyan: "#75b798",
      glowWhite: "#e8f5e9",
      glowIntensity: "6px"
    },
    typography: {
      fontFamily: "'Merriweather', Georgia, serif",
      fontSize: {
        base: "17px",
        small: "15px",
        large: "19px"
      },
      headingFamily: "'Playfair Display', serif"
    },
    effects: {
      animations: true,
      glowEffects: true,
      gradients: true,
      blur: true,
      transitions: true,
      neonBorders: false,
      scanlines: false
    },
    components: {
      avatar: {
        show: true,
        showRing: true,
        glowEffect: false
      },
      cards: {
        glassmorphism: true,
        borderGlow: false,
        hoverEffects: true
      },
      buttons: {
        glowOnHover: false,
        pulseAnimation: false
      },
      navigation: {
        sticky: true,
        blur: true,
        transparentOnScroll: false
      }
    },
    features: {
      blog: true,
      projects: true,
      guides: true,
      resources: true,
      about: true,
      contact: true,
      profileSection: true,
      experienceSection: true,
      skillsSection: true,
      educationSection: true,
      certificationsSection: true,
      awardsSection: true,
      achievementsSection: true,
      search: true,
      darkModeToggle: false,
      analytics: true,
      newsletter: false,
      comments: false
    },
    layout: {
      maxWidth: "1400px",
      sidebarPosition: "left",
      contentLayout: "default",
      spacing: "spacious"
    },
    animations: {
      pageTransitions: true,
      scrollAnimations: true,
      hoverAnimations: true,
      loadingAnimations: true,
      duration: "400ms",
      easing: "ease-out"
    },
    customCSS: {
      variables: {
        "--gradient-1": "linear-gradient(135deg, #2d5016 0%, #5a7c2e 100%)",
        "--gradient-2": "linear-gradient(135deg, #5a7c2e 0%, #8b9e3e 100%)",
        "--border-radius": "0.625rem",
        "--shadow-sm": "0 2px 4px rgba(0, 0, 0, 0.15)",
        "--shadow-lg": "0 12px 24px rgba(0, 0, 0, 0.2)"
      }
    }
  },

  sunset: {
    preset: "sunset",
    colors: {
      primary: "#ff6b6b",
      secondary: "#4ecdc4",
      accent: "#ffe66d",
      neutral: "#2b2d42",
      base100: "#1a1b26",
      base200: "#2b2d42",
      base300: "#3d3f54",
      info: "#4cc9f0",
      success: "#06ffa5",
      warning: "#ffbe0b",
      error: "#fb5607",
      textPrimary: "#f7fff7",
      textSecondary: "#ffd6ba",
      textAccent: "#ffe66d",
      glowPink: "#ff6b6b",
      glowCyan: "#4ecdc4",
      glowWhite: "#f7fff7",
      glowIntensity: "12px"
    },
    typography: {
      fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      fontSize: {
        base: "16px",
        small: "14px",
        large: "18px"
      },
      headingFamily: "'Bebas Neue', sans-serif"
    },
    effects: {
      animations: true,
      glowEffects: true,
      gradients: true,
      blur: true,
      transitions: true,
      neonBorders: true,
      scanlines: false
    },
    components: {
      avatar: {
        show: true,
        showRing: true,
        glowEffect: true
      },
      cards: {
        glassmorphism: true,
        borderGlow: true,
        hoverEffects: true
      },
      buttons: {
        glowOnHover: true,
        pulseAnimation: true
      },
      navigation: {
        sticky: true,
        blur: true,
        transparentOnScroll: false
      }
    },
    features: {
      blog: true,
      projects: true,
      guides: true,
      resources: true,
      about: true,
      contact: true,
      profileSection: true,
      experienceSection: true,
      skillsSection: true,
      educationSection: true,
      certificationsSection: true,
      awardsSection: true,
      achievementsSection: true,
      search: true,
      darkModeToggle: false,
      analytics: true,
      newsletter: false,
      comments: false
    },
    layout: {
      maxWidth: "1600px",
      sidebarPosition: "left",
      contentLayout: "default",
      spacing: "normal"
    },
    animations: {
      pageTransitions: true,
      scrollAnimations: true,
      hoverAnimations: true,
      loadingAnimations: true,
      duration: "350ms",
      easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    },
    customCSS: {
      variables: {
        "--gradient-1": "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
        "--gradient-2": "linear-gradient(135deg, #ffe66d 0%, #ff6b6b 100%)",
        "--border-radius": "0.75rem",
        "--shadow-sm": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "--shadow-lg": "0 15px 35px rgba(0, 0, 0, 0.2)"
      }
    }
  }
};