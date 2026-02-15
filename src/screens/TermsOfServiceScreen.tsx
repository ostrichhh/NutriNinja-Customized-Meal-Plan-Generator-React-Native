import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const termsOfService = [
  {
    heading: '1. Introduction',
    text: 'Welcome to NutriNinja, your personal nutrition assistant. By accessing our app, you agree to these Terms of Service.',
  },
  {
    heading: '2. Use of the App',
    text: 'You agree to use NutriNinja only for lawful purposes. You must not use it in any way that breaches any applicable local, national, or international law or regulation.',
  },
  {
    heading: '3. User Data',
    text: 'We collect data to personalize your experience. This includes health and dietary preferences which are handled with strict confidentiality. Please refer to our Privacy Policy for more details.',
  },
  {
    heading: '4. Intellectual Property',
    text: 'All content, including but not limited to logos, icons, and software, is the property of NutriNinja and protected by intellectual property laws.',
  },
  {
    heading: '5. Termination',
    text: 'We reserve the right to terminate or suspend your access to NutriNinja immediately, without prior notice or liability, for any reason.',
  },
  {
    heading: '6. Changes to Terms',
    text: 'We may update our Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page.',
  },
  {
    heading: '7. Contact Us',
    text: 'If you have any questions about these Terms, please contact us at support@nutrininja.com.',
  },
];

const TermsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.placeholder} />
      </View>
     
      <ScrollView contentContainerStyle={styles.scrollView}>
        {termsOfService.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            <Text style={styles.text}>{section.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
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
  headerTitle: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },

  placeholder: {
    width: 40, 
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
});

export default TermsScreen;
