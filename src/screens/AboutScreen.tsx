import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AboutScreen = ({ navigation }: any) => {
  const [feedback, setFeedback] = useState(''); 

  const handleSubmitFeedback = () => {
    if (feedback.trim() === '') {
      Alert.alert('Empty Feedback', 'Please type your feedback before submitting.');
      return;
    }
   
    console.log('Feedback Submitted:', feedback);
    Alert.alert(
      'Feedback Received!',
      'Thank you for your feedback. We appreciate you helping us improve NutriNinja.',
      [{ text: 'OK', onPress: () => setFeedback('') }] 
    );
    Keyboard.dismiss(); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>About NutriNinja</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Welcome to NutriNinja!</Text>
        <Text style={styles.paragraph}>
          Embark on a transformative journey towards better health and peak fitness with NutriNinja, your intelligent and personal
          nutrition ally. We believe that understanding and managing your diet shouldn't be complicated. NutriNinja is designed to
          simplify nutrition, making healthy eating achievable and tailored specifically to you.
        </Text>

        <Text style={styles.sectionTitle}>Our Story: The Birth of NutriNinja</Text>
        <Text style={styles.paragraph}>
          NutriNinja was sparked by a desire to make personalized nutrition truly accessible, especially within diverse communities. Our
          founders, a team passionate about both wellness and technology, observed a common challenge: many individuals, including those
          in regions like the Philippines where varied local languages are spoken, often lacked access to tailored dietary advice that
          resonated with their specific needs, body types (metabolisms), fitness goals, and even language preferences for instructions.
        </Text>
        <Text style={styles.paragraph}>
          Generic, one-size-fits-all meal plans often fell short. This realization, beginning in early 2024, fueled the creation of
          NutriNinja. After months of dedicated research, development, and harnessing the power of Google's cutting-edge Generative AI,
          NutriNinja was proudly launched in May 2025. Our aim from day one has been to be your intelligent, multilingual companion for
          a healthier lifestyle, starting with comprehensive support for English, Tagalog, and Ilocano.
        </Text>

        <Text style={styles.sectionTitle}>What is NutriNinja? A Description</Text>
        <Text style={styles.paragraph}>
          NutriNinja is an innovative mobile application that acts as your personal AI nutritionist. It empowers you to take control of
          your dietary habits by generating customized meal plans based on your unique physiological profile, fitness objectives (such as
          cutting, bulking, or weight maintenance), and dietary restrictions. We go beyond just planning by providing clear meal
          preparation instructions and valuable per-meal insights, all delivered in your chosen language.
        </Text>

        <Text style={styles.sectionTitle}>How NutriNinja Works for You</Text>
        <Text style={styles.paragraph}>
          1. <Text style={styles.boldText}>Profile Yourself:</Text> Share key details like your metabolism type (Endomorph, Mesomorph,
          Ectomorph), specific fitness goal, age, height, weight, and gender.
        </Text>
        <Text style={styles.paragraph}>
          2. <Text style={styles.boldText}>Specify Preferences:</Text> Select your preferred language for the meal plan and its
          instructions.
        </Text>
        <Text style={styles.paragraph}>
          3. <Text style={styles.boldText}>Define Restrictions:</Text> Inform the app about any dietary limitations, including options
          like Vegetarian or Pescatarian, or add custom needs such as allergies or personal/religious dietary practices.
        </Text>
        <Text style={styles.paragraph}>
          4. <Text style={styles.boldText}>Receive Your Plan:</Text> NutriNinja’s AI then crafts a personalized and actionable meal
          plan designed to help you achieve your targets.
        </Text>

        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.paragraph}>
          To be a leading global platform that empowers individuals from all walks of life to achieve optimal health and sustainable
          wellness through accessible, personalized, and AI-driven nutritional guidance.
        </Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          To provide an intuitive, intelligent, and supportive tool that crafts customized meal plans, simplifies the journey of
          healthy eating, and helps users confidently navigate their nutrition to meet their unique health and fitness aspirations.
        </Text>

        <Text style={styles.sectionTitle}>Our Core Values</Text>
        <Text style={styles.listItemText}>• Personalization: We champion the uniqueness of every individual; your nutrition plan should reflect that.</Text>
        <Text style={styles.listItemText}>• Accessibility: Committed to making high-quality nutritional guidance available to a diverse global audience, including robust multi-language support.</Text>
        <Text style={styles.listItemText}>• Empowerment: Equipping you with the knowledge, tools, and confidence to take charge of your health.</Text>
        <Text style={styles.listItemText}>• Innovation: Continuously leveraging the latest in AI and technology to deliver superior user experiences and effective outcomes.</Text>
        <Text style={styles.listItemText}>• Integrity & Trust: Promoting responsible health practices, ensuring transparency, and building a trustworthy relationship with our users.</Text>

        <Text style={styles.sectionTitle}>Key Features at a Glance</Text>
        <Text style={styles.listItemText}>• Deeply Personalized Plans: Tailored to your metabolism, goals, and complete physical profile.</Text>
        <Text style={styles.listItemText}>• Flexible Diet Management: Accommodates a wide array of dietary restrictions and preferences.</Text>
        <Text style={styles.listItemText}>• Multilingual Support: Meal plans and instructions in English, Tagalog, and Ilocano.</Text>
        <Text style={styles.listItemText}>• Actionable Meal Guidance: Clear preparation instructions and helpful per-meal nutritional counts.</Text>
        <Text style={styles.listItemText}>• Plan History: Save and revisit your generated meal plans anytime within the app.</Text>

        <Text style={styles.sectionTitle}>Powered by Innovation</Text>
        <Text style={styles.paragraph}>
          NutriNinja utilizes Google's advanced Generative AI (specifically the Gemini 1.5 Flash model) to intelligently interpret your
          unique inputs. This allows us to create meal plans that are not only deeply tailored but also practical and comprehensive,
          supporting you every step of the way.
        </Text>

        <Text style={styles.sectionTitle}>We Value Your Feedback!</Text>
        <View style={styles.feedbackContainer}>
          <Text style={styles.paragraph}>
            Have suggestions, questions, or found a bug? Let us know how we can improve NutriNinja. Your insights are crucial for our
            growth.
          </Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={5}
            placeholder="Type your feedback here..."
            placeholderTextColor="#555555" 
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical="top" 
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.disclaimerSection}>
          <Text style={styles.disclaimerTitle}>An Important Note on Your Health</Text>
          <Text style={styles.paragraph}>
            The meal plans and information generated by NutriNinja are created by an Artificial Intelligence model and are intended
            for informational, guidance, and motivational purposes only. While we are dedicated to providing accurate and helpful
            suggestions, these do not substitute professional medical or nutritional advice from qualified experts.
          </Text>
          <Text style={styles.paragraph}>
            Always consult with a qualified healthcare provider, doctor, or registered dietitian before making any significant
            changes to your diet, starting a new fitness regimen, or if you have any underlying health conditions or concerns. Your
            health is your most important asset, and professional consultation is paramount for ensuring your dietary choices are
            safe, appropriate, and effective for your individual circumstances.
          </Text>
        </View>

        <Text style={styles.footerText}>
          Thank You for Choosing NutriNinja! We're thrilled to be part of your path to a healthier, happier you.
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
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  backButton: {
     padding: 5,
    minWidth: 30,
    alignItems: 'center'
  },
  mainTitle: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 25, 
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    marginBottom: 12,
    textAlign: 'left',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 5,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    marginRight: 8,
    fontWeight: 'bold',
  },
  listItemText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    flex: 1,
  },
  disclaimerSection: {
    marginTop: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
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
  footerText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333333',
    textAlign: 'center',
    marginTop: 20, 
    fontStyle: 'italic',
    marginBottom: 20, 
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  
  feedbackContainer: {
    marginTop: 10, 
    marginBottom: 25, 
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDDDDD', 
    borderRadius: 8,
    backgroundColor: '#FFFFFF', 
  },
  textInput: {
    backgroundColor: '#FFFFFF', 
    color: '#000000', 
    borderWidth: 1,
    borderColor: '#000000', 
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10, 
    fontSize: 15,
    minHeight: 100, 
    marginBottom: 15, 
  },
  submitButton: {
    backgroundColor: '#000000', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
