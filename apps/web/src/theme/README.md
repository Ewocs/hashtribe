# 🎨 HashTribe - Premium Monochromatic Theme

## Overview

HashTribe now features a **premium monochromatic design** using only black, charcoal, grey, and white colors. This creates a sophisticated, minimalist aesthetic perfect for a developer-focused platform.

## Color Palette

### Pure Colors
- **Black**: `#000000` - Pure black backgrounds
- **White**: `#ffffff` - Pure white text and accents

### Charcoal Scale (Deep Blacks)
```
50:  #f7f7f7  (Lightest charcoal)
100: #e3e3e3
200: #c8c8c8
300: #a4a4a4
400: #818181
500: #666666  (Mid charcoal)
600: #515151
700: #434343
800: #383838
900: #1a1a1a  (Dark charcoal)
950: #0a0a0a  (Near black)
```

### Grey Scale (Neutral Grays)
```
50:  #fafafa  (Lightest grey)
100: #f5f5f5
200: #e5e5e5
300: #d4d4d4
400: #a3a3a3
500: #737373  (Mid grey)
600: #525252
700: #404040
800: #262626
900: #171717  (Dark grey)
950: #0d0d0d  (Near black)
```

## Usage Guidelines

### Backgrounds
- **Primary**: Pure black (#000000)
- **Secondary**: Near black (#0a0a0a)
- **Tertiary**: Charcoal (#1a1a1a)
- **Elevated**: Lighter charcoal (#262626)
- **Cards**: Dark grey (#171717)

### Text
- **Primary**: Pure white (#ffffff)
- **Secondary**: Light grey (#e5e5e5)
- **Tertiary**: Medium grey (#a3a3a3)
- **Disabled**: Muted grey (#737373)

### Borders
- **Light**: #404040
- **Default**: #262626
- **Dark**: #1a1a1a
- **Subtle**: #171717

### Interactive States
- **Hover**: White (#ffffff)
- **Active**: Light grey (#e5e5e5)
- **Focus**: Medium-light grey (#d4d4d4)
- **Disabled**: Medium grey (#525252)

## Components

### Login Page
- **Background**: Pure black with subtle white gradient overlays
- **Logo**: White circle with black # symbol
- **Title**: Pure white text
- **Cards**: Charcoal-900/80 with backdrop blur
- **Primary Button**: White background, black text
- **Borders**: Grey-800
- **Text**: White, grey-300, grey-400

### Globe Component
- **Particles**: White with varying opacity
- **Connections**: White with very low opacity (0.05-0.2)
- **Background**: Transparent (shows through black background)

## Shadows

### Elevation (Black Shadows)
- `sm`: Subtle drop shadow
- `md`: Medium elevation
- `lg`: High elevation
- `xl`: Very high elevation
- `2xl`: Maximum elevation

### Glow Effects (White Glow)
- `glowSm`: Subtle white glow (0.1 opacity)
- `glow`: Medium white glow (0.15 opacity)
- `glowLg`: Strong white glow (0.2 opacity)
- `glowXl`: Maximum white glow (0.25 opacity)

## Design Principles

### 1. **Contrast is King**
- Use pure black and pure white for maximum contrast
- Reserve mid-tones (greys) for secondary elements
- Ensure text is always readable

### 2. **Subtle Depth**
- Use subtle gradients and shadows
- Employ backdrop blur for glassmorphism
- Layer elements with varying opacity

### 3. **Minimalism**
- Remove all unnecessary colors
- Focus on typography and spacing
- Let content breathe

### 4. **Premium Feel**
- Use high-quality shadows and glows
- Smooth transitions and animations
- Refined hover states

## Tailwind Classes

### Backgrounds
```tsx
bg-black          // Pure black
bg-charcoal-950   // Near black
bg-charcoal-900   // Dark charcoal
bg-grey-900       // Dark grey
bg-white          // Pure white
```

### Text
```tsx
text-white        // Pure white
text-grey-200     // Light grey
text-grey-300     // Medium-light grey
text-grey-400     // Medium grey
text-grey-500     // Mid grey
```

### Borders
```tsx
border-grey-800   // Dark border
border-grey-700   // Medium-dark border
border-grey-600   // Medium border
```

### Shadows
```tsx
shadow-glow-sm    // Subtle white glow
shadow-glow       // Medium white glow
shadow-glow-lg    // Strong white glow
```

## Examples

### Card Component
```tsx
<div className="bg-charcoal-900/80 backdrop-blur-xl border border-grey-800 rounded-2xl p-8 shadow-2xl">
  <h2 className="text-white text-2xl font-semibold mb-2">Title</h2>
  <p className="text-grey-400">Description text</p>
</div>
```

### Button Component
```tsx
<button className="bg-white hover:bg-grey-100 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-glow">
  Click me
</button>
```

### Text Hierarchy
```tsx
<h1 className="text-white text-5xl font-bold">Main Heading</h1>
<h2 className="text-white text-2xl font-semibold">Subheading</h2>
<p className="text-grey-300">Body text</p>
<span className="text-grey-500">Muted text</span>
```

## Accessibility

### Contrast Ratios
- **White on Black**: 21:1 (AAA)
- **Grey-200 on Black**: 16:1 (AAA)
- **Grey-300 on Black**: 12:1 (AAA)
- **Grey-400 on Black**: 8:1 (AAA)

All combinations meet WCAG AAA standards for normal text.

## Future Considerations

When adding accent colors in the future:
1. Use them sparingly (5% or less of the design)
2. Ensure they work with the monochromatic base
3. Consider using desaturated versions
4. Maintain the premium, minimal aesthetic

---

**Theme Version**: 2.0.0 (Monochromatic)
**Last Updated**: January 15, 2026
**Status**: ✅ Production Ready
