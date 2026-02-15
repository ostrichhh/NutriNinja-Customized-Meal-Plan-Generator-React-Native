import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useMealPlans } from '../hooks/useMealPlans';
import { LoadingSpinner, ErrorMessage } from '../components';
import { MealPlan } from '../types';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const HistoryScreen = () => {
  const { mealPlans, loading, error, fetchMealPlans, deletePlan, clearAll } = useMealPlans();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [clearAllDialogVisible, setClearAllDialogVisible] = useState(false);
  const [planToDeleteIndex, setPlanToDeleteIndex] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      fetchMealPlans();
    }, [fetchMealPlans])
  );

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDeleteMealPlan = async () => {
    if (planToDeleteIndex === null) return;
    const indexToDelete = planToDeleteIndex;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    try {
      await deletePlan(indexToDelete);
      if (expandedIndex === indexToDelete) {
        setExpandedIndex(null);
      } else if (expandedIndex !== null && indexToDelete < expandedIndex) {
        setExpandedIndex(expandedIndex - 1);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }

    setDeleteDialogVisible(false);
  };

  const handleClearAllHistory = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(null);

    try {
      await clearAll();
    } catch (err) {
      console.error('Clear all failed:', err);
    }

    setClearAllDialogVisible(false);
  };

  const renderMealPlanItem = ({ item, index }: { item: MealPlan; index: number }) => (
    <View style={styles.mealPlanCard}>
      <TouchableOpacity onPress={() => toggleExpand(index)} activeOpacity={0.7}>
        <Text style={styles.mealPlanTitle}>{item.title}</Text>
      </TouchableOpacity>
      {expandedIndex === index && <Text style={styles.mealPlanContent}>{item.mealPlan}</Text>}
      <View style={styles.cardActionsContainer}>
        <Button
          mode="text"
          onPress={() => toggleExpand(index)}
          style={styles.viewDetailsButton}
          labelStyle={styles.viewDetailsButtonText}
          icon={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
          compact
        >
          {expandedIndex === index ? 'Hide Details' : 'View Details'}
        </Button>
        <Button
          mode="text"
          onPress={() => {
            setPlanToDeleteIndex(index);
            setDeleteDialogVisible(true);
          }}
          icon="trash-can-outline"
          textColor={colors.error}
          style={styles.deleteItemButton}
          labelStyle={styles.deleteItemButtonText}
          compact
        >
          Delete
        </Button>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.loadingText}>Loading meal plans...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredMessageContainer}>
        <ErrorMessage message={error} onRetry={fetchMealPlans} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.headerView}>
        <Text style={styles.headerTitleText}>Meal Plan History</Text>
      </View>

      {mealPlans.length > 0 && (
        <Button
          mode="outlined"
          onPress={() => setClearAllDialogVisible(true)}
          icon="delete-sweep-outline"
          style={styles.clearAllButton}
          textColor={colors.error}
          labelStyle={styles.clearAllButtonText}
        >
          Clear All History
        </Button>
      )}

      {mealPlans.length > 0 ? (
        <FlatList
          data={mealPlans}
          renderItem={renderMealPlanItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <View style={styles.centeredMessageContainer}>
          <Text style={styles.noPlansText}>No meal plans found in your history.</Text>
          <Text style={styles.noPlansSubText}>Generate a new meal plan to see it here!</Text>
        </View>
      )}

      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>Delete Meal Plan</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this meal plan? This action cannot be undone.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleDeleteMealPlan} textColor={colors.error}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={clearAllDialogVisible} onDismiss={() => setClearAllDialogVisible(false)}>
          <Dialog.Title>Clear All History</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete all meal plan history? This action cannot be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setClearAllDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleClearAllHistory} textColor={colors.error}>
              Clear All
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerView: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.base,
    backgroundColor: colors.gray50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  headerTitleText: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray800,
    textAlign: 'center',
  },
  clearAllButton: {
    marginVertical: spacing.md,
    marginHorizontal: spacing.lg,
    borderColor: colors.gray300,
  },
  clearAllButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  listContentContainer: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.lg,
  },
  mealPlanCard: {
    backgroundColor: colors.white,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  mealPlanTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.md,
    color: colors.gray700,
  },
  cardActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.md,
  },
  viewDetailsButton: {},
  viewDetailsButtonText: {
    fontSize: typography.fontSize.sm,
  },
  deleteItemButton: {},
  deleteItemButtonText: {
    fontSize: typography.fontSize.sm,
  },
  mealPlanContent: {
    fontSize: typography.fontSize.base,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    color: colors.gray600,
    lineHeight: typography.lineHeight.normal,
  },
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  loadingText: {
    fontSize: typography.fontSize.lg,
    color: colors.gray500,
  },
  noPlansText: {
    fontSize: typography.fontSize.lg,
    color: colors.gray500,
    marginBottom: 5,
    textAlign: 'center',
  },
  noPlansSubText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray400,
    textAlign: 'center',
  },
});

export default HistoryScreen;
