/**
 * Gemini AI Service
 * Handles all interactions with Google's Generative AI API
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../constants/config';
import { MealPlanParams } from '../types';

// Initialize the Gemini AI instance
let genAI: GoogleGenerativeAI | null = null;

/**
 * Get or create the GoogleGenerativeAI instance
 */
export const getGenAIInstance = (): GoogleGenerativeAI => {
    if (!genAI) {
        if (!config.GEMINI_API_KEY) {
            throw new Error('Gemini API key is not configured. Please check your .env.local file.');
        }
        genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    }
    return genAI;
};

/**
 * Generate a meal plan using Gemini AI
 * @param params - Meal plan parameters (metabolism, goal, height, age, weight, etc.)
 * @returns Generated meal plan text
 */
export const generateMealPlan = async (params: MealPlanParams): Promise<string> => {
    try {
        const {
            metabolism,
            goal,
            height,
            age,
            weight,
            gender,
            language,
            restrictions,
            customRestriction,
        } = params;

        // Separate dietary preferences from strict restrictions
        const preferences = restrictions.filter(
            (r) => ['Vegetarian', 'Pescatarian'].includes(r)
        );

        const strictRestrictions = restrictions.filter(
            (r) => !preferences.includes(r)
        );

        // Add custom restriction if provided
        if (customRestriction?.trim()) {
            strictRestrictions.push(customRestriction.trim());
        }

        // Build the prompt
        const prompt = `Generate a meal plan for a ${gender} with the following details:
Metabolism: ${metabolism}, Goal: ${goal}, Height: ${height} cm, Weight: ${weight} kg, Age: ${age}
Dietary Preferences: ${preferences.length > 0 ? preferences.join(', ') : 'None'}
Strict Restrictions (must not be included in any meal): ${strictRestrictions.length > 0 ? strictRestrictions.join(', ') : 'None'}
Each meal must follow the dietary preferences and strictly exclude all restricted items.
Provide meal preparation instructions and per meal count in ${language}.`;

        // Get the model and generate content
        const ai = getGenAIInstance();
        const model = ai.getGenerativeModel({ model: config.GEMINI_MODEL });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let mealPlanText = await response.text();

        // Clean up the response
        mealPlanText = mealPlanText.replace(/^##\s*/g, '');

        if (!mealPlanText) {
            throw new Error('No text returned from Gemini API.');
        }

        return mealPlanText;
    } catch (error) {
        console.error('Error in generateMealPlan:', error);

        // Provide more specific error messages
        if (error instanceof Error) {
            if (error.message.includes('API key')) {
                throw new Error('Invalid API key. Please check your configuration.');
            }
            throw error;
        }

        throw new Error('Failed to generate meal plan. Please try again.');
    }
};
