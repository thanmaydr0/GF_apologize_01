/**
 * Theme Configuration for Romantic Reconciliation Website
 * A warm, sincere design system with gentle aesthetics
 */

// ============================================
// COLOR PALETTE
// ============================================

export const colors = {
    // Primary: Soft Blush Pinks
    primary: {
        50: '#FFF5F7',
        100: '#FFE9EF',
        200: '#FFBCCD',
        300: '#FC809F',
        400: '#F85C86',
        500: '#E91E63',
        600: '#C2185B',
    },

    // Secondary: Earthy Warm Tones
    secondary: {
        50: '#FAF8F6',
        100: '#F5F0EC',
        200: '#E4D7CF',
        300: '#D1C1B5',
        400: '#BBAB9B',
        500: '#8A6B52',
        600: '#6B5241',
    },

    // Accent: Sage Green (growth, renewal)
    accent: {
        50: '#F4F7F4',
        100: '#E8EFE9',
        200: '#DED7B1',
        300: '#B0C4B1',
        400: '#98B499',
        500: '#6B9369',
        rose: '#A26769',
    },

    // Neutral Backgrounds
    background: {
        cream: '#FDF8F5',
        blush: '#FFF5F7',
        warm: '#FAF7F5',
        paper: '#FFFCFA',
    },

    // Text Colors
    text: {
        primary: '#3D3028',
        secondary: '#6B5D52',
        muted: '#9A8B7F',
        light: '#C4B8AE',
        inverse: '#FFFCFA',
    },

    // Semantic Colors
    semantic: {
        love: '#E91E63',
        hope: '#B0C4B1',
        warmth: '#F5B963',
        trust: '#7BA3C4',
    },
} as const

// ============================================
// TYPOGRAPHY SCALE
// ============================================

export const typography = {
    fonts: {
        serif: '"Playfair Display", Georgia, "Times New Roman", serif',
        sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    },

    // Heading Sizes (mobile-first)
    headings: {
        h1: {
            size: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
            lineHeight: 1.1,
            weight: 600,
            letterSpacing: '-0.02em',
        },
        h2: {
            size: 'clamp(2rem, 4vw + 0.5rem, 3.5rem)',
            lineHeight: 1.15,
            weight: 600,
            letterSpacing: '-0.01em',
        },
        h3: {
            size: 'clamp(1.5rem, 3vw + 0.25rem, 2.25rem)',
            lineHeight: 1.2,
            weight: 500,
            letterSpacing: '0',
        },
        h4: {
            size: 'clamp(1.25rem, 2vw + 0.25rem, 1.75rem)',
            lineHeight: 1.3,
            weight: 500,
            letterSpacing: '0',
        },
        h5: {
            size: '1.25rem',
            lineHeight: 1.4,
            weight: 500,
            letterSpacing: '0.01em',
        },
    },

    // Body Text
    body: {
        xl: { size: '1.25rem', lineHeight: 1.7 },
        lg: { size: '1.125rem', lineHeight: 1.7 },
        md: { size: '1rem', lineHeight: 1.7 },
        sm: { size: '0.875rem', lineHeight: 1.6 },
        xs: { size: '0.75rem', lineHeight: 1.5 },
    },

    // Special Text Styles
    special: {
        quote: {
            size: 'clamp(1.25rem, 2vw + 0.5rem, 1.75rem)',
            lineHeight: 1.6,
            weight: 400,
            style: 'italic',
        },
        caption: {
            size: '0.875rem',
            lineHeight: 1.5,
            weight: 400,
            letterSpacing: '0.02em',
        },
    },
} as const

// ============================================
// SPACING SCALE
// ============================================

export const spacing = {
    px: '1px',
    0: '0',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    8: '2rem',         // 32px
    10: '2.5rem',      // 40px
    12: '3rem',        // 48px
    14: '3.5rem',       // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px

    // Section spacing
    section: {
        sm: 'clamp(3rem, 8vw, 5rem)',
        md: 'clamp(4rem, 10vw, 7rem)',
        lg: 'clamp(5rem, 12vw, 9rem)',
    },
} as const

// ============================================
// ANIMATION PRESETS
// ============================================

export const animations = {
    // Timing Functions
    easing: {
        gentle: 'cubic-bezier(0.4, 0, 0.2, 1)',
        softBounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',
        smoothIn: 'cubic-bezier(0.4, 0, 1, 1)',
        romantic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },

    // Duration presets
    duration: {
        instant: 0.1,
        fast: 0.2,
        normal: 0.3,
        slow: 0.5,
        gentle: 0.7,
        slow2: 1,
    },

    // Framer Motion Variants
    variants: {
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
        fadeInUp: {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -12 },
        },
        fadeInDown: {
            initial: { opacity: 0, y: -24 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 12 },
        },
        scaleIn: {
            initial: { opacity: 0, scale: 0.92 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
        },
        slideInLeft: {
            initial: { opacity: 0, x: -32 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -16 },
        },
        slideInRight: {
            initial: { opacity: 0, x: 32 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 16 },
        },
    },

    // Transition presets for Framer Motion
    transitions: {
        gentle: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
        },
        softBounce: {
            type: 'spring',
            stiffness: 200,
            damping: 20,
        },
        stagger: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
        hover: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
        },
    },
} as const

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
    none: '0',
    sm: '0.25rem',     // 4px
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
    '2xl': '1.5rem',   // 24px
    '3xl': '2rem',     // 32px
    '4xl': '2.5rem',   // 40px
    full: '9999px',

    // Semantic
    button: '9999px',  // Pill-shaped buttons
    card: '1.5rem',    // Soft card corners
    input: '0.75rem',  // Input fields
    modal: '2rem',     // Modal dialogs
} as const

// ============================================
// SHADOWS
// ============================================

export const shadows = {
    none: 'none',
    sm: '0 1px 2px rgba(61, 48, 40, 0.04)',
    md: '0 4px 12px rgba(61, 48, 40, 0.06)',
    lg: '0 8px 24px rgba(61, 48, 40, 0.08)',
    xl: '0 16px 40px rgba(61, 48, 40, 0.1)',

    // Romantic shadows with pink tint
    romantic: {
        sm: '0 2px 8px rgba(252, 128, 159, 0.1)',
        md: '0 4px 16px rgba(252, 128, 159, 0.12)',
        lg: '0 8px 32px rgba(252, 128, 159, 0.15)',
        xl: '0 16px 48px rgba(252, 128, 159, 0.18)',
    },

    // Glow effects
    glow: {
        pink: '0 0 20px rgba(252, 128, 159, 0.3)',
        warm: '0 0 20px rgba(245, 185, 99, 0.25)',
        sage: '0 0 20px rgba(176, 196, 177, 0.3)',
    },
} as const

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
} as const

// ============================================
// THEME OBJECT (Combined)
// ============================================

export const theme = {
    colors,
    typography,
    spacing,
    animations,
    borderRadius,
    shadows,
    breakpoints,
    zIndex,
} as const

export type Theme = typeof theme
export default theme
