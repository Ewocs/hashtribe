// Typography system
export const fonts = {
    // Font families
    family: {
        sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", "Fira Code", Consolas, Monaco, monospace',
        display: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    },

    // Font sizes
    size: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
    },

    // Font weights
    weight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
    },

    // Line heights
    lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
    },

    // Letter spacing
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
} as const;

// Text styles (combinations of font properties)
export const textStyles = {
    // Display styles
    displayLarge: {
        fontSize: fonts.size['6xl'],
        fontWeight: fonts.weight.bold,
        lineHeight: fonts.lineHeight.tight,
        letterSpacing: fonts.letterSpacing.tight,
    },
    displayMedium: {
        fontSize: fonts.size['5xl'],
        fontWeight: fonts.weight.bold,
        lineHeight: fonts.lineHeight.tight,
        letterSpacing: fonts.letterSpacing.tight,
    },
    displaySmall: {
        fontSize: fonts.size['4xl'],
        fontWeight: fonts.weight.bold,
        lineHeight: fonts.lineHeight.snug,
    },

    // Heading styles
    h1: {
        fontSize: fonts.size['3xl'],
        fontWeight: fonts.weight.bold,
        lineHeight: fonts.lineHeight.tight,
    },
    h2: {
        fontSize: fonts.size['2xl'],
        fontWeight: fonts.weight.semibold,
        lineHeight: fonts.lineHeight.snug,
    },
    h3: {
        fontSize: fonts.size.xl,
        fontWeight: fonts.weight.semibold,
        lineHeight: fonts.lineHeight.snug,
    },
    h4: {
        fontSize: fonts.size.lg,
        fontWeight: fonts.weight.medium,
        lineHeight: fonts.lineHeight.normal,
    },

    // Body styles
    bodyLarge: {
        fontSize: fonts.size.lg,
        fontWeight: fonts.weight.normal,
        lineHeight: fonts.lineHeight.relaxed,
    },
    body: {
        fontSize: fonts.size.base,
        fontWeight: fonts.weight.normal,
        lineHeight: fonts.lineHeight.normal,
    },
    bodySmall: {
        fontSize: fonts.size.sm,
        fontWeight: fonts.weight.normal,
        lineHeight: fonts.lineHeight.normal,
    },

    // Label styles
    label: {
        fontSize: fonts.size.sm,
        fontWeight: fonts.weight.medium,
        lineHeight: fonts.lineHeight.normal,
    },
    labelSmall: {
        fontSize: fonts.size.xs,
        fontWeight: fonts.weight.medium,
        lineHeight: fonts.lineHeight.normal,
        letterSpacing: fonts.letterSpacing.wide,
    },

    // Code styles
    code: {
        fontFamily: fonts.family.mono,
        fontSize: fonts.size.sm,
        fontWeight: fonts.weight.normal,
        lineHeight: fonts.lineHeight.normal,
    },
    codeInline: {
        fontFamily: fonts.family.mono,
        fontSize: '0.9em',
        fontWeight: fonts.weight.normal,
    },
} as const;

export type FontToken = typeof fonts;
export type TextStyleToken = typeof textStyles;
