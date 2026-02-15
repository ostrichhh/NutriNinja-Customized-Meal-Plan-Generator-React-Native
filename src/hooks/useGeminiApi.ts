/**
 * Custom hook for Gemini API interactions
 * Manages state for meal plan generation
 */

import { useState, useCallback } from 'react';
import { generateMealPlan } from '../services/geminiService';
import { MealPlanParams } from '../types';

export const useGeminiApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    /**
     * Generate a meal plan using Gemini API
     */
    const generate = useCallback(async (params: MealPlanParams): Promise<string> => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const mealPlanText = await generateMealPlan(params);
            setResult(mealPlanText);
            return mealPlanText;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate meal plan';
            setError(errorMessage);
            console.error('Error generating meal plan:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Reset the state
     */
    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setResult(null);
    }, []);

    return {
        generate,
        loading,
        error,
        result,
        reset,
    };
};
