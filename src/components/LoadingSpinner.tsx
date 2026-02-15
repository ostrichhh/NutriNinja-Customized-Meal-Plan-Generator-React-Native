/**
 * Reusable Loading Spinner Component
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LoadingSpinnerProps } from '../types';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'large',
    color,
    style,
}) => {
    const theme = useTheme();
    const spinnerColor = color || theme.colors.primary;

    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size={size} color={spinnerColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
});
