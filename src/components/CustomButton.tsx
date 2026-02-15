/**
 * Reusable Custom Button Component
 * Wrapper around react-native-paper Button with consistent styling
 */

import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { CustomButtonProps } from '../types';

export const CustomButton: React.FC<CustomButtonProps> = ({
    mode = 'contained',
    onPress,
    children,
    icon,
    loading = false,
    disabled = false,
    style,
    labelStyle,
    buttonColor,
    textColor,
}) => {
    return (
        <PaperButton
            mode={mode}
            onPress={onPress}
            icon={icon}
            loading={loading}
            disabled={disabled || loading}
            style={style}
            labelStyle={labelStyle}
            buttonColor={buttonColor}
            textColor={textColor}
        >
            {children}
        </PaperButton>
    );
};
