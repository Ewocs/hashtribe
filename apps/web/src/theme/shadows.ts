// Shadow system for depth and elevation (monochromatic)
export const shadows = {
    // Elevation shadows
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

    // Inner shadows
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    innerLg: 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)',

    // White glow effects (for dark backgrounds)
    glowSm: '0 0 10px rgba(255, 255, 255, 0.1)',
    glow: '0 0 20px rgba(255, 255, 255, 0.15)',
    glowLg: '0 0 30px rgba(255, 255, 255, 0.2)',
    glowXl: '0 0 40px rgba(255, 255, 255, 0.25)',
} as const;

export type ShadowToken = typeof shadows;
