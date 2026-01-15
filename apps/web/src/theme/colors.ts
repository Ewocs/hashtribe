// Premium monochromatic color palette - Black, Charcoal, Grey, White
export const colors = {
    // Pure blacks and whites
    black: '#000000',
    white: '#ffffff',

    // Charcoal - Deep blacks with slight warmth
    charcoal: {
        50: '#f7f7f7',
        100: '#e3e3e3',
        200: '#c8c8c8',
        300: '#a4a4a4',
        400: '#818181',
        500: '#666666',
        600: '#515151',
        700: '#434343',
        800: '#383838',
        900: '#1a1a1a',
        950: '#0a0a0a',
    },

    // Grey - Neutral grays
    grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0d0d0d',
    },

    // Background colors
    background: {
        primary: '#000000',      // Pure black
        secondary: '#0a0a0a',    // Near black
        tertiary: '#1a1a1a',     // Charcoal
        elevated: '#262626',     // Lighter charcoal
        card: '#171717',         // Card background
    },

    // Text colors
    text: {
        primary: '#ffffff',      // Pure white
        secondary: '#e5e5e5',    // Light grey
        tertiary: '#a3a3a3',     // Medium grey
        disabled: '#737373',     // Muted grey
        inverse: '#000000',      // Black (for light backgrounds)
    },

    // Border colors
    border: {
        light: '#404040',
        DEFAULT: '#262626',
        dark: '#1a1a1a',
        subtle: '#171717',
    },

    // Interactive states (monochromatic)
    interactive: {
        hover: '#ffffff',
        active: '#e5e5e5',
        focus: '#d4d4d4',
        disabled: '#525252',
    },

    // Semantic colors (monochromatic variants)
    success: {
        light: '#e5e5e5',
        DEFAULT: '#a3a3a3',
        dark: '#737373',
    },

    warning: {
        light: '#e5e5e5',
        DEFAULT: '#a3a3a3',
        dark: '#737373',
    },

    error: {
        light: '#e5e5e5',
        DEFAULT: '#a3a3a3',
        dark: '#737373',
    },

    info: {
        light: '#e5e5e5',
        DEFAULT: '#a3a3a3',
        dark: '#737373',
    },
} as const;

export type ColorToken = typeof colors;
