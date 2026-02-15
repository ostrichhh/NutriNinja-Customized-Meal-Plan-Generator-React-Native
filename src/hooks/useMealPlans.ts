/**
 * Custom hook for managing meal plans
 * Encapsulates meal plan state and operations
 */

import { useState, useCallback } from 'react';
import {
    getMealPlans,
    saveMealPlan,
    deleteMealPlan as deleteMealPlanService,
    clearAllMealPlans,
} from '../services/storageService';
import { MealPlan } from '../types';

export const useMealPlans = () => {
    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch all meal plans from storage
     */
    const fetchMealPlans = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const plans = await getMealPlans();
            setMealPlans(plans);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load meal plans';
            setError(errorMessage);
            console.error('Error fetching meal plans:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Save a new meal plan
     */
    const savePlan = useCallback(async (mealPlan: MealPlan) => {
        setError(null);
        try {
            await saveMealPlan(mealPlan);
            // Refresh the list
            await fetchMealPlans();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to save meal plan';
            setError(errorMessage);
            console.error('Error saving meal plan:', err);
            throw err; // Re-throw so caller can handle
        }
    }, [fetchMealPlans]);

    /**
     * Delete a meal plan at a specific index
     */
    const deletePlan = useCallback(async (index: number) => {
        setError(null);
        try {
            const updatedPlans = await deleteMealPlanService(index);
            setMealPlans(updatedPlans);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete meal plan';
            setError(errorMessage);
            console.error('Error deleting meal plan:', err);
            throw err;
        }
    }, []);

    /**
     * Clear all meal plans
     */
    const clearAll = useCallback(async () => {
        setError(null);
        try {
            await clearAllMealPlans();
            setMealPlans([]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to clear meal plans';
            setError(errorMessage);
            console.error('Error clearing meal plans:', err);
            throw err;
        }
    }, []);

    return {
        mealPlans,
        loading,
        error,
        fetchMealPlans,
        savePlan,
        deletePlan,
        clearAll,
    };
};
