/**
 * Storage Service
 * Handles all AsyncStorage operations for meal plans and user data
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { MealPlan } from '../types';

const MEAL_PLANS_KEY = 'mealPlans';

/**
 * Save a new meal plan to storage
 * Prepends the new plan to the existing list
 */
export const saveMealPlan = async (mealPlan: MealPlan): Promise<void> => {
    try {
        const existingPlansJSON = await AsyncStorage.getItem(MEAL_PLANS_KEY);
        const existingPlans: MealPlan[] = existingPlansJSON
            ? JSON.parse(existingPlansJSON)
            : [];

        // Add timestamp if not present
        const planWithTimestamp = {
            ...mealPlan,
            createdAt: mealPlan.createdAt || new Date().toISOString(),
        };

        const updatedPlans = [planWithTimestamp, ...existingPlans];
        await AsyncStorage.setItem(MEAL_PLANS_KEY, JSON.stringify(updatedPlans));
    } catch (error) {
        console.error('Error saving meal plan:', error);
        throw new Error('Failed to save meal plan. Please try again.');
    }
};

/**
 * Get all meal plans from storage
 */
export const getMealPlans = async (): Promise<MealPlan[]> => {
    try {
        const mealPlansData = await AsyncStorage.getItem(MEAL_PLANS_KEY);
        if (mealPlansData) {
            return JSON.parse(mealPlansData);
        }
        return [];
    } catch (error) {
        console.error('Error fetching meal plans:', error);
        throw new Error('Failed to load meal plans. Data might be corrupted.');
    }
};

/**
 * Delete a meal plan at a specific index
 */
export const deleteMealPlan = async (index: number): Promise<MealPlan[]> => {
    try {
        const mealPlans = await getMealPlans();
        const updatedPlans = mealPlans.filter((_, i) => i !== index);
        await AsyncStorage.setItem(MEAL_PLANS_KEY, JSON.stringify(updatedPlans));
        return updatedPlans;
    } catch (error) {
        console.error('Error deleting meal plan:', error);
        throw new Error('Failed to delete meal plan. Please try again.');
    }
};

/**
 * Clear all meal plans from storage
 */
export const clearAllMealPlans = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(MEAL_PLANS_KEY);
    } catch (error) {
        console.error('Error clearing meal plans:', error);
        throw new Error('Failed to clear meal plans. Please try again.');
    }
};
