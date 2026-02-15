import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = () => {
  const navigation = useNavigation();

  const renderParagraphWithTip = (text: string) => {
    const parts = text.split(/(Tip:)/);
    return (
      <Text style={styles.paragraph}>
        {parts.map((part, index) =>
          part === 'Tip:' ? (
            <Text key={index} style={styles.boldText}>{part}</Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back-outline" size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitleText}>Help Center</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainWelcomeTitle}>NutriNinja Help Center</Text>

        <Text style={styles.paragraph}>
          Welcome to the NutriNinja Help Center! We’re here to guide you on how to make the most out of your personalized meal planning experience. If you have any questions, you're in the right place!
        </Text>

        <Text style={styles.sectionTitle}>Getting Started: Generating Your Meal Plan</Text>
        <Text style={styles.paragraph}>
          The "Generate" screen is where NutriNinja crafts a meal plan tailored just for you. Here’s a step-by-step guide to filling out the form:
        </Text>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>1. Select Your Metabolism Type:</Text>
          <Text style={styles.paragraph}>
            Choose your metabolism type from the available options. This helps our AI understand how your body processes food and energy.
          </Text>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>2. Choose Your Fitness Goal:</Text>
          <Text style={styles.paragraph}>
            Select your goal—whether it's weight loss, muscle gain, or maintenance. This allows NutriNinja to create a plan aligned with your objectives.
          </Text>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>3. Enter Your Physical Details:</Text>
          {renderParagraphWithTip(
            `• Height: Input your height in centimeters (cm).\n• Age: Enter your current age in years.\n• Current Weight: Provide your weight in kilograms (KG).\n• Gender: Select either Male or Female.\nTip: Providing accurate information allows our AI to generate a more effective plan for you.`
          )}
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>4. Choose Your Preferred Language:</Text>
          <Text style={styles.paragraph}>
            Select the language you'd like your meal plan in. Options include English, Tagalog, or Ilocano. All content will be displayed in your selected language.
          </Text>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>5. Specify Meal Restrictions (Optional but Recommended):</Text>
          {renderParagraphWithTip(
            `Tap the "Meal Restrictions" button or dropdown to reveal options.\n• Predefined Options: Select from diets like "Vegetarian" or "Pescatarian." Tap again to deselect.\n• Custom Restrictions: Type specific items to avoid (e.g., "no peanuts," "dairy-free"). Separate multiple items with commas.\nTip: The more detailed your restrictions, the better NutriNinja can tailor a safe and effective plan.`
          )}
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>6. Generate Your Meal Plan:</Text>
          <Text style={styles.paragraph}>
            Once your information is complete, tap "Generate Meal Plan." Please be patient while our AI Ninja processes your data. A loading indicator will appear.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Understanding Your Generated Meal Plan</Text>

        <Text style={styles.subHeading}>What to Expect:</Text>
        <Text style={styles.paragraph}>
          Your personalized plan includes:
          {'\n'}• Meal suggestions throughout the day
          {'\n'}• Preparation instructions
          {'\n'}• Nutritional information (e.g., calories, macronutrients)
        </Text>

        <Text style={styles.subHeading}>How It's Displayed:</Text>
        <Text style={styles.paragraph}>
          The plan is formatted for clarity, with bolded titles and bullet points for easy navigation and understanding.
        </Text>

        <Text style={styles.subHeading}>Automatic Saving:</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.boldText}>Good news!</Text> Every plan is saved on your device. You can revisit them anytime in the "History" section (usually found in the bottom navigation).
        </Text>

        <Text style={styles.sectionTitle}>Troubleshooting Common Issues</Text>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Plan Not Generating or Errors:</Text>
          <View style={styles.listItemContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemText}>Ensure all required fields are completed (Metabolism, Goal, Physical Details, Language).</Text>
          </View>
          <View style={styles.listItemContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemText}>Check your internet connection. NutriNinja needs Wi-Fi or mobile data to work.</Text>
          </View>
          <View style={styles.listItemContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemText}>Simplify overly complex restrictions if needed, and try again.</Text>
          </View>
          <View style={styles.listItemContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemText}>Wait a few minutes in case of temporary service interruptions.</Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>App Is Running Slow:</Text>
          <View style={styles.listItemContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemText}>Restart the app.</Text>
          </View>
          <View style={styles.listItemContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemText}>Ensure your device’s OS is updated and there’s enough free storage/memory.</Text>
          </View>
        </View>

        <View style={styles.disclaimerSection}>
          <Text style={styles.disclaimerTitle}>Important Health Disclaimer</Text>
          <Text style={styles.paragraph}>
            NutriNinja is a tool to assist your nutrition journey. Meal plans are for informational purposes and do not replace professional medical advice.
          </Text>
          <Text style={styles.paragraph}>
            Always consult a qualified healthcare provider or dietitian before making dietary changes or starting a new regimen.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Need More Help?</Text>
        <Text style={styles.paragraph}>
          • <Text style={styles.boldText}>About NutriNinja:</Text> Learn more about our app, mission, and team via the "About" section in the Home screen.
        </Text>
        <Text style={styles.paragraph}>
          • <Text style={styles.boldText}>Share Feedback:</Text> Help us improve! Use the feedback section in "About" to share ideas or report issues.
        </Text>
        <Text style={styles.finalParagraph}>
          We hope this guide helps you use NutriNinja with confidence. Wishing you the best on your journey to a healthier you!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15, 
    paddingHorizontal: 15, 
    borderBottomWidth: 1,
    borderBottomColor: '#000000', 
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    width: 30, 
    alignItems: 'center', 
  },
  headerTitleText: {
    fontSize: 22, 
    fontWeight: '600',
    color: '#000000', 
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainWelcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  emojiText: { 
    fontSize: 24, 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 25,
    marginBottom: 15,
    borderTopWidth: 1, 
    borderTopColor: '#000000',
    paddingTop: 15,
  },
  stepContainer: {
    marginBottom: 15,
  },
  stepTitle: { 
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subHeading: { 
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 23, 
    color: '#000000',
    marginBottom: 12,
    textAlign: 'left',
  },
  finalParagraph: {
    fontSize: 15,
    lineHeight: 23,
    color: '#000000',
    marginBottom: 20, 
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 10, 
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 23,
    color: '#000000',
    marginRight: 8,
    fontWeight: 'bold',
  },
  listItemText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#000000',
    flex: 1, 
  },
  disclaimerSection: {
    marginTop: 25,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HelpScreen;
