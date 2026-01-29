# 💕 Romantic Reconciliation Website

A beautiful, animated website for expressing heartfelt apologies and love.

## Tech Stack

- **Vite** + **React** + **TypeScript** - Modern build tooling
- **Tailwind CSS** - Utility-first styling with custom romantic palette
- **Framer Motion** - Smooth, professional animations
- **React Icons** - Beautiful icon library
- **React Intersection Observer** - Scroll-triggered animations

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── sections/     # Page sections (Hero, Letter, Reasons, etc.)
│   └── ui/           # Reusable UI components
├── assets/
│   └── images/       # Images and graphics
├── data/             # Content data (reasons, letters, timeline)
├── utils/            # Helper functions and utilities
├── App.tsx           # Main application component
├── main.tsx          # React entry point
└── index.css         # Global styles with Tailwind
```

## Custom Design System

### Color Palette

| Category | Colors |
|----------|--------|
| **Primary (Blush Pinks)** | `#FFE9EF`, `#FFBCCD`, `#FC809F` |
| **Secondary (Earthy Warm)** | `#F5F0EC`, `#E4D7CF`, `#8A6B52` |
| **Accent (Sage Green)** | `#B0C4B1`, `#DED7B1`, `#A26769` |

### Fonts

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Animations

Pre-built animations include:
- `animate-fade-in` / `animate-fade-in-up` / `animate-fade-in-down`
- `animate-slide-in-left` / `animate-slide-in-right`
- `animate-scale-in`
- `animate-float`
- `animate-heartbeat`
- `animate-pulse-soft`

### Custom Utilities

- `.glass-effect` - Glassmorphism styling
- `.romantic-shadow` / `.romantic-shadow-lg` - Soft romantic shadows
- `.text-gradient-romantic` - Gradient text effect
- `.bg-gradient-romantic` - Background gradient

## Adding Content

Edit `src/data/content.ts` to customize:
- Reasons for love
- Personal letters
- Timeline events

---

Made with 💕