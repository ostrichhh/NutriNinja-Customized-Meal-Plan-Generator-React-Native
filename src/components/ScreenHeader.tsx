/**
 * Reusable Screen Header Component
 * Used across multiple screens for consistent header styling
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeaderProps } from '../types';
import { commonStyles } from '../styles/commonStyles';
import { colors } from '../styles/colors';

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    title,
    onBackPress,
    rightIcon,
    onRightPress,
    backgroundColor,
}) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={[commonStyles.header, backgroundColor && { backgroundColor }]}>
            <TouchableOpacity onPress={handleBackPress} style={commonStyles.headerButton}>
                <Ionicons name="arrow-back-outline" size={32} color={theme.colors.onSurface} />
            </TouchableOpacity>

            <View style={commonStyles.headerCenter}>
                <Text style={[commonStyles.headerTitle, { color: theme.colors.onSurface }]}>
                    {title}
                </Text>
            </View>

            {rightIcon && onRightPress ? (
                <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
                    <Ionicons name={rightIcon as any} size={32} color={theme.colors.onSurface} />
                </TouchableOpacity>
            ) : (
                <View style={styles.rightButtonPlaceholder} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    rightButton: {
        padding: 4,
    },
    rightButtonPlaceholder: {
        width: 40,
    },
});
