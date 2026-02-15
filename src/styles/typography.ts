/**
 * Typography constants for consistent text styling
 */

import { TextStyle } from 'react-native';

export const typography = {
    // Font Sizes
    fontSize: {
        xs: 12,
        sm: 14,
        base: 15,
        md: 16,
        lg: 18,
        xl: 22,
        xxl: 24,
        xxxl: 30,
        huge: 32,
        mega: 38,
    },

    // Font Weights
    fontWeight: {
        normal: '400' as TextStyle['fontWeight'],
        medium: '500' as TextStyle['fontWeight'],
        semibold: '600' as TextStyle['fontWeight'],
        bold: 'bold' as TextStyle['fontWeight'],
    },

    // Line Heights
    lineHeight: {
        tight: 20,
        normal: 22,
        relaxed: 26,
    },
} as const;
