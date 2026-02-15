/**
 * Reusable Custom Text Input Component
 * Wrapper around react-native-paper TextInput with consistent styling
 */

import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { CustomTextInputProps } from '../types';
import { StyleSheet } from 'react-native';

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    secureTextEntry = false,
    left,
    right,
    style,
    error = false,
    errorText,
}) => {
    const theme = useTheme();

    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            style={[styles.input, style]}
            left={left}
            right={right}
            error={error}
            theme={{ colors: { primary: theme.colors.primary, background: theme.colors.surface } }}
            placeholderTextColor={theme.colors.onSurfaceDisabled}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
        backgroundColor: 'transparent',
    },
});
