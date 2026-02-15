/**
 * Color constants used throughout the NutriNinja app
 */

export const colors = {
    // Brand Colors
    brandPurple: '#6851a4',

    // Neutral Colors
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#f5f5f5',
    gray100: '#f0f0f0',
    gray200: '#EEEEEE',
    gray300: '#DDDDDD',
    gray400: '#adb5bd',
    gray500: '#6c757d',
    gray600: '#495057',
    gray700: '#343a40',
    gray800: '#333333',

    // Semantic Colors
    error: '#E53935',
    errorDark: '#dc3545',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3',

    // Shadows
    shadowColor: '#000',
} as const;

export type ColorName = keyof typeof colors;
