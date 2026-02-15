/**
 * TypeScript type definitions for the NutriNinja app
 */

// Navigation Types
export type BottomTabParamList = {
    Home: undefined;
    Generate: undefined;
    History: undefined;
    Settings: undefined;
};

// Meal Plan Types
export type MealPlan = {
    title: string;
    mealPlan: string;
    createdAt?: string;
};

export type MealPlanParams = {
    metabolism: string;
    goal: string;
    height: string;
    age: string;
    weight: string;
    gender: string;
    language: string;
    restrictions: string[];
    customRestriction?: string;
};

// Component Props Types
export type ScreenHeaderProps = {
    title: string;
    onBackPress?: () => void;
    rightIcon?: string;
    onRightPress?: () => void;
    backgroundColor?: string;
};

export type CustomButtonProps = {
    mode?: 'contained' | 'outlined' | 'text';
    onPress: () => void;
    children: string;
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
    style?: any;
    labelStyle?: any;
    buttonColor?: string;
    textColor?: string;
};

export type CustomTextInputProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    secureTextEntry?: boolean;
    left?: React.ReactNode;
    right?: React.ReactNode;
    style?: any;
    error?: boolean;
    errorText?: string;
};

export type ChipGroupProps = {
    options: string[];
    selectedValue: string | string[];
    onSelect: (value: string) => void;
    multiSelect?: boolean;
    style?: any;
};

export type LoadingSpinnerProps = {
    size?: 'small' | 'large';
    color?: string;
    style?: any;
};

export type ErrorMessageProps = {
    message: string;
    style?: any;
    onRetry?: () => void;
};
