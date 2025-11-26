# EI EMS Company Logo Files

## Logo Variations

This directory contains the official EI EMS company logos in multiple variations and formats.

### Files

#### Main Logo (Horizontal Layout)
- `logo-horizontal.svg` - Primary logo for light backgrounds (Icon + Text)
- `logo-horizontal-dark.svg` - Version for dark backgrounds

#### Icon Only
- `logo-icon.svg` - Icon only version for light backgrounds
- `logo-icon-dark.svg` - Icon only version for dark backgrounds

#### Square Layout
- `logo-square.svg` - Square format with stacked text (200x200px)

## Design Specifications

### Color Palette
- **Electric Blue**: `#0061FF` - Primary brand color
- **Dark Navy**: `#001F3F` - Secondary brand color
- **White**: `#FFFFFF` - For dark backgrounds

### Typography
- Font Family: Arial Black, Helvetica Neue, Arial (bold, minimal, professional)
- Font Weight: 900 (extra bold)
- Letter Spacing: -1px (tight, modern)

### Icon Design
- Circuit board theme with PCB traces
- Clean, minimal line work
- Technology-focused symbolism
- Circular background for icon versions

## Usage Guidelines

### Light Backgrounds
Use `logo-horizontal.svg` or `logo-icon.svg` on:
- White backgrounds
- Light gray backgrounds
- Light colored pages

### Dark Backgrounds
Use `logo-horizontal-dark.svg` or `logo-icon-dark.svg` on:
- Dark backgrounds
- Navy/black sections
- Dark theme mode

### Responsive Sizing
- Desktop: 60px height (max-width: 220px)
- Tablet (≤768px): 50px height (max-width: 180px)
- Mobile (≤480px): 44px height (max-width: 150px)

### When to Use Each Version

**Horizontal Logo** (`logo-horizontal.svg`)
- Primary website header/navigation
- Email signatures
- Marketing materials
- Business cards (horizontal orientation)

**Icon Only** (`logo-icon.svg`)
- Favicons
- App icons
- Social media profile pictures
- Small space applications
- Loading screens

**Square Logo** (`logo-square.svg`)
- Social media posts
- App stores
- Square format requirements
- Print materials (square format)

## Technical Details

### File Format
All logos are provided in SVG (Scalable Vector Graphics) format for:
- Infinite scalability without quality loss
- Small file sizes
- Web optimization
- Print-ready at any size

### Browser Support
SVG format is supported by all modern browsers:
- Chrome, Firefox, Safari, Edge
- IE 9+ (with basic support)
- All mobile browsers

## Brand Identity

The EI EMS logo represents:
- **Technology**: Circuit board design symbolizes electronics expertise
- **Precision**: Clean lines represent manufacturing precision
- **Innovation**: Modern styling reflects cutting-edge solutions
- **Trust**: Professional design builds customer confidence

## Implementation

The website automatically switches between light and dark logo versions based on the theme using CSS:

```css
.logo-light { display: block; }
.logo-dark { display: none; }

[data-theme="dark"] .logo-light { display: none; }
[data-theme="dark"] .logo-dark { display: block; }
```

## Questions?

For logo usage questions or to request additional formats, contact: sales@eiems.in
