import { parse } from 'yaml';
import fs from 'fs';
import path from 'path';

// Site configuration interface
export interface SiteConfig {
  profile: {
    name: string;
    title: string;
    initials: string;
    showAvatar: boolean;
    location: string;
    email: string;
    summary: {
      brief: string;
      extended: string;
    };
    social: {
      github?: {
        username: string;
        url: string;
      };
      linkedin?: {
        username: string;
        url: string;
      };
      twitter?: {
        username: string;
        url: string;
      };
    };
  };
  skills: {
    core: {
      title: string;
      items: string[];
    };
    technical: {
      title: string;
      items: string[];
    };
    compliance: {
      title: string;
      items: string[];
    };
    leadership: {
      title: string;
      items: string[];
    };
  };
  achievements: Array<{
    title: string;
    value: string;
    description: string;
    icon: string;
  }>;
  navigation: Array<{
    name: string;
    href: string;
  }>;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
  };
  footer: {
    copyright: string;
    poweredBy: Array<{
      name: string;
      url: string;
    }>;
    hosting: {
      name: string;
      url: string;
    };
    repository: {
      url: string;
    };
  };
  resume: {
    downloadUrl: string;
    filename: string;
  };
}

// Load and parse the YAML configuration
export function getSiteConfig(): SiteConfig {
  try {
    const yamlPath = path.join(process.cwd(), 'src', 'data', 'site.yaml');
    const yamlContent = fs.readFileSync(yamlPath, 'utf8');
    return parse(yamlContent) as SiteConfig;
  } catch (error) {
    console.error('Error loading site configuration:', error);
    // Return default config as fallback
    return getDefaultConfig();
  }
}

// Default configuration fallback
function getDefaultConfig(): SiteConfig {
  return {
    profile: {
      name: "Your Name",
      title: "Your Title",
      initials: "YN",
      showAvatar: true,
      location: "Your Location",
      email: "your@email.com",
      summary: {
        brief: "Your brief professional summary.",
        extended: "Your extended professional summary with more details about your experience and expertise."
      },
      social: {
        github: {
          username: "yourusername",
          url: "https://github.com/yourusername"
        },
        linkedin: {
          username: "yourusername", 
          url: "https://linkedin.com/in/yourusername"
        }
      }
    },
    skills: {
      core: {
        title: "Core Skills",
        items: ["Skill 1", "Skill 2"]
      },
      technical: {
        title: "Technical Skills",
        items: ["Tech 1", "Tech 2"]
      },
      compliance: {
        title: "Compliance",
        items: ["Compliance 1"]
      },
      leadership: {
        title: "Leadership",
        items: ["Leadership 1"]
      }
    },
    achievements: [
      {
        title: "Achievement",
        value: "100%",
        description: "Description",
        icon: "star"
      }
    ],
    navigation: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" }
    ],
    metadata: {
      title: "Personal Portfolio",
      description: "Professional portfolio website",
      keywords: ["portfolio", "professional"],
      author: "Your Name"
    },
    footer: {
      copyright: "Your Name",
      poweredBy: [
        { name: "Astro", url: "https://astro.build" }
      ],
      hosting: {
        name: "Hosting Provider",
        url: "#"
      },
      repository: {
        url: "#"
      }
    },
    resume: {
      downloadUrl: "/resume.pdf",
      filename: "resume.pdf"
    }
  };
}