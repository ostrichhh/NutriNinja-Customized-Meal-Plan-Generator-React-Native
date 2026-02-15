/**
 * Reusable Error Message Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { ErrorMessageProps } from '../types';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    style,
    onRetry,
}) => {
    const theme = useTheme();

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.message, { color: theme.colors.error }]}>
                {message}
            </Text>
            {onRetry && (
                <Button mode="outlined" onPress={onRetry} style={styles.retryButton}>
                    Try Again
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
    },
    message: {
        fontSize: typography.fontSize.lg,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    retryButton: {
        marginTop: spacing.md,
    },
});
