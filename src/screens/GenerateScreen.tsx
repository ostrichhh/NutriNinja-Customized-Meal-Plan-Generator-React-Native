import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader, ChipGroup, LoadingSpinner, ErrorMessage } from '../components';
import { useGeminiApi } from '../hooks/useGeminiApi';
import { useMealPlans } from '../hooks/useMealPlans';
import { MealPlanParams } from '../types';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const GenerateScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { width: viewportWidth } = Dimensions.get('window');

  // Use custom hooks
  const { generate, loading, error, result, reset } = useGeminiApi();
  const { savePlan } = useMealPlans();

  // Form state
  const [metabolism, setMetabolism] = useState('');
  const [goal, setGoal] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [showRestrictions, setShowRestrictions] = useState(false);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [customRestriction, setCustomRestriction] = useState('');
  const [text, setText] = useState('');

  const metabolisms = [
    { type: 'Endomorph', image: require('../assets/images/endo.png') },
    { type: 'Mesomorph', image: require('../assets/images/meso.png') },
    { type: 'Ectomorph', image: require('../assets/images/ecto.png') },
  ];

  const restrictionOptions = ['Vegetarian', 'Pescatarian'];

  const toggleRestriction = (item: string) => {
    setRestrictions((prev: string[]) =>
      prev.includes(item) ? prev.filter((r: string) => r !== item) : [...prev, item]
    );
  };

  const handleGenerativeMealPlan = async () => {
    const params: MealPlanParams = {
      metabolism,
      goal,
      height,
      age,
      weight,
      gender,
      language,
      restrictions,
      customRestriction,
    };

    try {
      const geminiText = await generate(params);

      // Save to storage
      const title = `${gender} | ${goal} | ${metabolism} | Age: ${age}, W: ${weight}kg, H: ${height}cm`;
      await savePlan({ title, mealPlan: geminiText });
      setText(geminiText);
    } catch (e) {
      console.error('Error generating meal plan:', e);
    }
  };

  const handleGenerateAgain = () => {
    setMetabolism('');
    setGoal('');
    setHeight('');
    setAge('');
    setWeight('');
    setGender('');
    setLanguage('');
    setRestrictions([]);
    setCustomRestriction('');
    setText('');
    reset();
  };

  const renderFormattedText = (input: string) => {
    return input.split('\n').map((line, index) => {
      const boldMatch = line.match(/^\s*\*\*(.+?)\*\*\s*$/);
      if (boldMatch) return <Text key={index} style={styles.boldText}>{boldMatch[1].trim()}</Text>;
      const bulletMatch = line.match(/^\*\s(.+)/);
      if (bulletMatch) return <Text key={index} style={styles.bulletText}>• {bulletMatch[1].trim()}</Text>;
      return <Text key={index} style={styles.regularText}>{line.trim()}</Text>;
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <ScreenHeader
        title="Generate"
        rightIcon="help-circle-outline"
        onRightPress={() => navigation.navigate('Help')}
      />

      <ScrollView
        style={{ backgroundColor: colors.white }}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.title, { color: theme.colors.onSurfaceVariant }]}>Metabolism</Text>
        <View style={styles.imageContainer}>
          {metabolisms.map((item) => (
            <TouchableOpacity
              key={item.type}
              onPress={() => setMetabolism(item.type)}
              style={[
                styles.imageItem,
                { borderColor: theme.colors.outline },
                metabolism === item.type && {
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.primaryContainer || theme.colors.surfaceVariant,
                },
              ]}
            >
              <Image source={item.image} style={styles.metabolismImage} />
              <Text
                style={[
                  styles.imageText,
                  {
                    color:
                      metabolism === item.type
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                {item.type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.title, { color: theme.colors.onSurfaceVariant }]}>Goal</Text>
        <ChipGroup
          options={['Cutting', 'Bulking', 'Maintain Weight']}
          selectedValue={goal}
          onSelect={setGoal}
        />

        <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Height (cm)</Text>
        <TextInput
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Enter height"
          style={styles.input}
          underlineColor={theme.colors.outline}
          activeUnderlineColor={theme.colors.primary}
          placeholderTextColor={theme.colors.onSurfaceDisabled}
        />

        <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Age</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter age"
          style={styles.input}
          underlineColor={theme.colors.outline}
          activeUnderlineColor={theme.colors.primary}
          placeholderTextColor={theme.colors.onSurfaceDisabled}
        />

        <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
          Current Weight (KG)
        </Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Enter weight"
          style={styles.input}
          underlineColor={theme.colors.outline}
          activeUnderlineColor={theme.colors.primary}
          placeholderTextColor={theme.colors.onSurfaceDisabled}
        />

        <Text style={[styles.title, { color: theme.colors.onSurfaceVariant }]}>Gender</Text>
        <ChipGroup options={['Male', 'Female']} selectedValue={gender} onSelect={setGender} />

        <Text style={[styles.title, { color: theme.colors.onSurfaceVariant }]}>Language</Text>
        <ChipGroup
          options={['English', 'Tagalog', 'Ilocano']}
          selectedValue={language}
          onSelect={setLanguage}
        />

        <Button
          mode="text"
          onPress={() => setShowRestrictions(!showRestrictions)}
          icon={showRestrictions ? 'chevron-up' : 'chevron-down'}
          style={styles.toggleButton}
          labelStyle={styles.toggleButtonLabel}
          uppercase={false}
        >
          Meal Restrictions
        </Button>

        {showRestrictions && (
          <View style={{ marginTop: spacing.sm }}>
            <ChipGroup
              options={restrictionOptions}
              selectedValue={restrictions}
              onSelect={toggleRestriction}
              multiSelect
            />
            <TextInput
              value={customRestriction}
              onChangeText={setCustomRestriction}
              placeholder="e.g. Allergies, Religious, or Personal Restrictions"
              style={styles.input}
              underlineColor={theme.colors.outline}
              activeUnderlineColor={theme.colors.primary}
              placeholderTextColor={theme.colors.onSurfaceDisabled}
            />
          </View>
        )}

        <Button
          mode="contained"
          onPress={handleGenerativeMealPlan}
          style={styles.generateButton}
          labelStyle={styles.generateButtonLabel}
          loading={loading}
          disabled={loading}
          uppercase={false}
        >
          Generate Meal Plan
        </Button>

        {loading && !text && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && text && (
          <>
            <View
              style={[
                styles.generatedContainer,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              {renderFormattedText(text.replace(/\*\*/g, ''))}
            </View>
            <Button
              mode="outlined"
              onPress={handleGenerateAgain}
              style={styles.generateAgainButton}
              labelStyle={{ fontSize: typography.fontSize.md }}
              uppercase={false}
            >
              Generate Again
            </Button>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.base,
  },
  chip: {
    margin: spacing.xs,
  },
  input: {
    marginVertical: spacing.sm,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: typography.fontSize.md,
    marginBottom: 2,
  },
  toggleButton: {
    marginVertical: spacing.md,
    alignSelf: 'flex-start',
  },
  toggleButtonLabel: {
    fontSize: typography.fontSize.md,
    marginLeft: -8,
  },
  generateButton: {
    paddingVertical: spacing.sm,
    marginVertical: spacing.lg,
    borderRadius: 8,
  },
  generateButtonLabel: {
    color: colors.white,
    fontSize: typography.fontSize.md,
  },
  generatedContainer: {
    marginVertical: spacing.lg,
    padding: spacing.base,
    borderRadius: 8,
  },
  regularText: {
    fontSize: typography.fontSize.base,
    marginBottom: spacing.md,
    lineHeight: typography.lineHeight.normal,
  },
  boldText: {
    fontSize: typography.fontSize.lg - 1,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  bulletText: {
    fontSize: typography.fontSize.base,
    marginLeft: spacing.md,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeight.normal,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  imageItem: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
  },
  metabolismImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: spacing.sm,
  },
  imageText: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    fontWeight: typography.fontWeight.medium,
  },
  generateAgainButton: {
    marginTop: spacing.md,
  },
});

export default GenerateScreen;
