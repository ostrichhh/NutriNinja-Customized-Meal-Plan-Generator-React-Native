/**
 * Application configuration and environment variables
 * Centralizes access to environment variables with proper typing
 */

const config = {
    GEMINI_API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '',
    GEMINI_MODEL: 'gemini-1.5-flash',
    APP_VERSION: '1.0.0',
    APP_NAME: 'NutriNinja',
} as const;

// Validate required environment variables
if (!config.GEMINI_API_KEY) {
    console.warn('Warning: EXPO_PUBLIC_GEMINI_API_KEY is not set in environment variables');
}

export default config;
