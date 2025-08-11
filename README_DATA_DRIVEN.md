# Data-Driven Portfolio Site

This site is now fully data-driven and can be easily customized for any professional by editing a single YAML file!

## 🚀 Quick Start - Make It Yours

### 1. Edit Your Profile Data
All site content is controlled by a single file: `src/data/site.yaml`

```yaml
# Personal Information
profile:
  name: "Your Name"
  title: "Your Professional Title"
  initials: "YN"
  location: "Your City, State"
  email: "your@email.com"
  
  # Professional Summary
  summary:
    brief: "Your brief professional summary..."
    extended: "Your extended summary with more details..."

  # Social Links
  social:
    github:
      username: "yourusername"
      url: "https://github.com/yourusername"
    linkedin:
      username: "your-linkedin"
      url: "https://linkedin.com/in/your-linkedin"
```

### 2. Update Your Skills
```yaml
skills:
  core:
    title: "Core Skills"
    items:
      - "Your Skill 1"
      - "Your Skill 2"
  
  technical:
    title: "Technical Skills"
    items:
      - "Technology 1"
      - "Technology 2"
```

### 3. Add Your Achievements
```yaml
achievements:
  - title: "Annual Savings"
    value: "$1M+"
    description: "Through process optimization"
    icon: "currency"
```

### 4. Customize Navigation
```yaml
navigation:
  - name: "Home"
    href: "/"
  - name: "About"
    href: "/about"
  - name: "Portfolio"
    href: "/portfolio"
```

## 📁 Content Collections (Markdown Files)

### Experience Entries
Create files in `src/content/resume/experience/`:

```markdown
---
type: "experience"
position: "Your Job Title"
company: "Company Name"
location: "City, State"
startDate: 2020-01-01
endDate: 2023-12-31
current: false
showInMainSection: true
order: 1
highlights:
  - "Achievement 1"
  - "Achievement 2"
technologies:
  - "Tech 1"
  - "Tech 2"
---

Description of your role...
```

### Education Entries
Create files in `src/content/resume/education/`:

```markdown
---
type: "education"
degree: "Your Degree"
institution: "University Name"
location: "City, State"
graduationDate: 2020-05-15
gpa: "3.8"
honors:
  - "Honor 1"
order: 1
---

Education description...
```

### Certifications
Create files in `src/content/resume/certifications/`:

```markdown
---
type: "certification"
name: "Certification Name"
issuer: "Issuing Organization"
issueDate: 2020-01-01
expirationDate: 2025-01-01
credentialId: "ABC123"
order: 1
---

Certification description...
```

### Awards
Create files in `src/content/resume/awards/`:

```markdown
---
type: "award"
title: "Award Name"
organization: "Organization"
description: "Award description"
date: 2020-01-01
order: 1
---

Award details...
```

## 🎨 Customization Options

### Theme Colors
The site uses the Synthwave '84 theme by default. Colors can be customized in `src/styles/global.css`:

```css
:root {
  --synth-bg: #241b2f;  /* Background */
  --synth-pink: #f92aad;  /* Accent color */
  --synth-cyan: #72f1b8;  /* Secondary color */
}
```

### Components
All components automatically pull from the YAML data:
- `ProfileCard.astro` - Your profile information
- `SkillsSection.astro` - Skills from YAML
- `AchievementsSection.astro` - Achievements from YAML
- `ExperienceTimelineNew.astro` - Experience from markdown files
- `EducationSection.astro` - Education from markdown files
- `CertificationsSection.astro` - Certifications from markdown files
- `AwardsSection.astro` - Awards from markdown files
- `Header.astro` - Navigation from YAML
- `Footer.astro` - Footer info from YAML

## 🚀 Deployment

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Deploy to GitHub Pages, Vercel, or Netlify

## 📝 Adding New Sections

To add a new section:

1. Add the data structure to `src/data/site.yaml`
2. Create a new component in `src/components/`
3. Import `getSiteConfig()` to access your data
4. Use the data in your component

Example:
```astro
---
import { getSiteConfig } from '@/utils/siteData';

const siteConfig = getSiteConfig();
const { yourNewSection } = siteConfig;
---

<div>
  {yourNewSection.items.map(item => (
    <div>{item.name}</div>
  ))}
</div>
```

## 🔧 Advanced Configuration

### Multiple Profiles
You can create multiple YAML files for different profiles:
- `site-professional.yaml`
- `site-creative.yaml`
- `site-minimal.yaml`

Then update `siteData.ts` to load the appropriate profile based on environment variables.

### Dynamic Content
The site supports:
- Blog posts in `src/content/blog/`
- Projects in `src/content/projects/`
- Guides in `src/content/guides/`
- Resources in `src/content/resources/`

Each with their own schema and templates.

## 📦 Tech Stack
- **Astro** - Static site generator
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **YAML** - Data configuration
- **MDX** - Rich content

## 🤝 Contributing
Feel free to fork this repository and customize it for your own use! The entire site is designed to be reusable and maintainable through data files only.

## 📄 License
Open source - use it however you like!

---

**Note**: After changing any data in `site.yaml` or markdown files, restart the dev server to see changes.