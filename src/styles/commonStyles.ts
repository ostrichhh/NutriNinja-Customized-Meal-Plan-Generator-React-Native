/**
 * Common style objects shared across multiple screens
 */

import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const commonStyles = StyleSheet.create({
    // Header Styles
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.gray50,
        width: '100%',
        marginBottom: spacing.md,
        position: 'relative',
    },

    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.bold,
    },

    headerButton: {},

    // Card Styles
    card: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: spacing.base,
        marginBottom: spacing.base,
        borderWidth: 1,
        borderColor: colors.gray200,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },

    // Container Styles
    container: {
        flex: 1,
    },

    scrollContentContainer: {
        padding: spacing.lg,
        paddingBottom: spacing.xxxl,
    },

    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
    },
});
