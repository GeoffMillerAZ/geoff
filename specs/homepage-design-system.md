# Homepage Design System Specification

## Goal
Define the design system, component architecture, and visual patterns for the Geoff Miller Cloud Platform homepage, maintaining the synthwave theme and professional portfolio layout.

## Context
The homepage serves as a personal brand showcase and professional portfolio, featuring a distinctive synthwave '84 aesthetic inspired by VS Code themes. The design combines modern glassmorphic elements with retro-futuristic colors and effects to create a memorable first impression while maintaining professional credibility.

## Design System

### Color Palette (Synthwave '84 Theme)
```css
:root {
  --synth-bg: #2a2139;           /* Primary background */
  --synth-pink: #f92aad;         /* Accent pink for highlights */
  --synth-cyan: #25b0bc;         /* Secondary cyan for badges */
  --synth-card-bg: rgba(20, 10, 30, 0.5);  /* Glassmorphic card background */
  --synth-border: rgba(37, 176, 188, 0.3);  /* Subtle borders */
  --synth-text: #e5e5e5;         /* Primary text color */
  --synth-glow-text: #ffffff;    /* Glowing text color */
}
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Hierarchy**:
  - H1: 3xl-4xl, bold, text-glow effect
  - H2: 2xl-4xl, bold, white color
  - H3: lg-2xl, semibold, white color
  - Body: base-lg, regular, gray-300
  - Small: sm-xs, regular, gray-400/500

### Background Pattern
- **Grid Effect**: Subtle 40px x 40px grid overlay using CSS gradients
- **Colors**: rgba(37, 176, 188, 0.1) for grid lines
- **Purpose**: Creates retro-futuristic depth without distraction

## Component Architecture

### Layout Components

#### Card Component
```css
.card {
  background-color: var(--synth-card-bg);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid var(--synth-border);
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
}
```

**Usage**: Primary container for all content sections
**Variants**: Standard padding (p-6), content-specific sizing

#### Grid Layout System
- **Desktop (lg+)**: 12-column grid with 4-8-0 or 3-6-3 distribution
- **Mobile**: Single column with stacked sections
- **Responsive Breakpoints**: Following Tailwind CSS standards

### Interactive Components

#### Skill Badge
```css
.skill-badge {
  background-color: rgba(37, 176, 188, 0.1);
  color: var(--synth-cyan);
  border: 1px solid rgba(37, 176, 188, 0.4);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.skill-badge:hover {
  background-color: var(--synth-cyan);
  color: var(--synth-bg);
  box-shadow: 0 0 10px var(--synth-cyan);
  transform: translateY(-2px);
}
```

**Purpose**: Display technical skills with interactive hover effects
**Behavior**: Glow and lift animation on hover

#### Toggle Button
```css
.toggle-button {
  background: none;
  border: none;
  color: var(--synth-cyan);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}
```

**Purpose**: Expand/collapse functionality for job details
**States**: Open/closed with arrow rotation animation

### Content Sections

#### Profile Card
**Location**: Left sidebar (desktop) / Top (mobile)
**Content**: Name, title, location, contact links
**Special Effects**: 
- Name with text-glow effect
- Accent color for job title
- Hover transitions on social links

#### Experience Timeline
**Visual Pattern**: Left border line with circular markers
**Job Markers**: Pink circles with glow effect positioned at -20px left
**Content Structure**: Title, company, dates, bullet points, expandable details

#### Skills Section
**Organization**: Primary skills and Languages/Frameworks subsections
**Display**: Flexbox wrapped skill badges with hover effects
**Categories**: Semantic grouping with section headers

#### Achievements Grid
**Layout**: 2x2 grid on desktop, single column on mobile
**Content**: Title + description pairs with accent colors
**Typography**: Semibold titles with accent color, body text in gray-300

## Responsive Design

### Breakpoint Strategy
- **Mobile**: Single column, stacked cards, touch-friendly interactions
- **Tablet (lg)**: 2-column layout with sidebar
- **Desktop (2xl)**: 3-column layout with additional right sidebar
- **Wide Desktop**: Maximum content width with centered layout

### Mobile Adaptations
- Sticky profile information moves to top
- Education/certifications integrate into main flow
- Touch targets minimum 44px for accessibility
- Reduced motion preferences respected

## Accessibility Features

### Keyboard Navigation
- All interactive elements focusable with Tab key
- Visible focus indicators with outline
- Toggle buttons operable with Enter/Space keys
- Skip links for main content areas

### Screen Reader Support
- Semantic HTML structure with proper heading hierarchy
- ARIA labels for interactive elements
- Alt text for decorative elements where needed
- Meaningful link text for external resources

### Color Contrast
- Text colors meet WCAG AA standards against background
- Interactive elements maintain contrast in all states
- Secondary text (gray-400/500) passes contrast requirements

## Performance Considerations

### CSS Optimization
- Custom properties for consistent theming
- Minimal custom CSS leveraging Tailwind utilities
- Efficient animations using transform/opacity
- Critical CSS inlined for above-fold content

### JavaScript Interactions
- Progressive enhancement for toggle functionality
- Minimal JavaScript footprint
- Event delegation for efficiency
- Graceful degradation if JS disabled

## Implementation Notes

### Tailwind CSS Integration
- Custom CSS variables work seamlessly with Tailwind
- Utility classes for spacing, typography, and layout
- Custom components only where necessary
- Responsive design using Tailwind breakpoint system

### Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Backdrop-filter with webkit prefix for broader support
- Graceful fallbacks for older browsers
- Progressive enhancement approach

## Maintenance Guidelines

### Color System
- All colors defined as CSS custom properties
- Easy theme switching capability built-in
- Consistent application across all components
- Documentation of color purpose and usage

### Component Updates
- Maintain design system consistency
- Document changes to component specifications
- Test responsive behavior across all breakpoints
- Validate accessibility requirements with each change