/**
 * Spacing constants for consistent margins and padding
 */

export const spacing = {
    xs: 4,
    sm: 8,
    md: 10,
    base: 15,
    lg: 20,
    xl: 25,
    xxl: 30,
    xxxl: 40,
} as const;

export type SpacingKey = keyof typeof spacing;
