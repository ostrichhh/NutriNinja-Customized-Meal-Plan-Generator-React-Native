/**
 * Reusable Chip Group Component
 * Displays a group of selectable chips (buttons)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { ChipGroupProps } from '../types';
import { spacing } from '../styles/spacing';

export const ChipGroup: React.FC<ChipGroupProps> = ({
    options,
    selectedValue,
    onSelect,
    multiSelect = false,
    style,
}) => {
    const theme = useTheme();

    const isSelected = (option: string) => {
        if (Array.isArray(selectedValue)) {
            return selectedValue.includes(option);
        }
        return selectedValue === option;
    };

    return (
        <View style={[styles.container, style]}>
            {options.map((option) => (
                <Chip
                    key={option}
                    selected={isSelected(option)}
                    onPress={() => onSelect(option)}
                    style={[
                        styles.chip,
                        {
                            backgroundColor: isSelected(option)
                                ? theme.colors.primary
                                : theme.colors.surfaceVariant,
                        },
                    ]}
                    textStyle={{
                        color: isSelected(option)
                            ? theme.colors.onPrimary || '#FFFFFF'
                            : theme.colors.onSurfaceVariant,
                    }}
                >
                    {option}
                </Chip>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: spacing.base,
    },
    chip: {
        margin: spacing.xs,
    },
});
