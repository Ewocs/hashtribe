// Export all theme tokens
export { colors, type ColorToken } from './colors';
export { fonts, textStyles, type FontToken, type TextStyleToken } from './fonts';
export { shadows, type ShadowToken } from './shadows';
export {
    spacing,
    borderRadius,
    zIndex,
    transitions,
    type SpacingToken,
    type BorderRadiusToken,
    type ZIndexToken,
    type TransitionToken,
} from './spacing';

import { colors } from './colors';
import { fonts, textStyles } from './fonts';
import { shadows } from './shadows';
import { spacing, borderRadius, zIndex, transitions } from './spacing';

// Complete theme object
export const theme = {
    colors: colors,
    fonts: fonts,
    textStyles: textStyles,
    shadows: shadows,
    spacing: spacing,
    borderRadius: borderRadius,
    zIndex: zIndex,
    transitions: transitions,
} as const;

export type Theme = typeof theme;

// Helper function to get theme values
export const getThemeValue = <K extends keyof Theme>(
    category: K,
    path: string
): any => {
    const keys = path.split('.');
    let value: any = theme[category];

    for (const key of keys) {
        value = value?.[key];
    }

    return value;
};

// Export default theme
export default theme;
