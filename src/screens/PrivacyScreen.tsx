
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Alert, SafeAreaView } from 'react-native';
import { useTheme, List, Divider, Appbar } from 'react-native-paper';



const privacyPolicyContent = [
  {
    id: 'intro',
    text: `Welcome to NutriNinja! This Privacy Policy explains how NutriNinja ("we," "us," or "our") collects, uses, shares, and protects your information when you use our NutriNinja mobile application (the "App" or "Service"). Your privacy is important to us, and we are committed to protecting your personal data in compliance with applicable laws, including the Data Privacy Act of 2012 (RA 10173) of the Philippines.\nPlease read this Privacy Policy carefully. By using the NutriNinja App, you agree to the collection and use of information in accordance with this policy.`,
  },
  {
    id: '1',
    heading: '1. Information We Collect',
    sections: [
      {
        subheading: 'a. Information You Provide Directly:',
        points: [
          `Account Information (If you create an account): This may include your full name, username (if applicable), email address, phone number (optional), a hashed version of your password (we never store your plain text password), and profile picture if you choose to upload one.`,
          `Profile Information for Meal Plan Generation: To personalize your meal plans, you may provide us with: Physical characteristics (metabolism type, height, age, current weight, gender); Fitness goals (e.g., cutting, bulking, maintaining weight); Preferences (preferred language for meal plans e.g., English, Tagalog, Ilocano); Dietary Information (meal restrictions, including predefined options like Vegetarian, Pescatarian, and custom restrictions you provide e.g., allergies, specific food intolerances).`,
          `Feedback and Communications: If you contact us for support or provide feedback, we will collect the information you include in your communications.`,
        ],
      },
      {
        subheading: 'b. Information Collected Automatically (Usage Data):',
        points: [
            `When you use the App, we may collect certain information automatically about your device and how you interact with our App. This may include: Device Information (Device type, operating system and version, unique device identifiers (if any), and IP address); Usage Details (Features you use, pages viewed, actions taken within the App, dates and times of access, error logs, and other diagnostic data).`,
            `Note: We will specify if we use analytics tools like Google Analytics for Firebase or similar services to collect this data. (Developer: Specify if you use such tools).`
        ],
      },
      {
        subheading: 'c. Information Stored Locally on Your Device:',
        points: [
          `Meal Plan History: Generated meal plans (including titles and content) are stored locally on your device using AsyncStorage or similar technology to allow you to access your history.`,
          `User Preferences: Certain user preferences and profile information for meal generation may also be stored locally to enhance your experience.`,
        ],
      },
    ],
  },
  {
    id: '2',
    heading: '2. How We Use Your Information',
    text: 'We use the information we collect for various purposes, including:',
    points: [
      'To Provide and Maintain Our Service: To operate the App, generate personalized meal plans based on your inputs, and provide you with its features.',
      'To Manage Your Account: To create and manage your user account, verify your identity, and allow you to update your profile (if account features are used).',
      'To Personalize Your Experience: To tailor meal plans and content to your specific needs and preferences.',
      'To Communicate With You: To respond to your inquiries, provide customer support, send you service-related notices, updates, security alerts, and administrative messages. With your consent, we may also send you promotional communications (you can opt-out of these).',
      'To Improve Our Service: To understand how users interact with our App, analyze usage patterns, troubleshoot issues, conduct research and analysis for product development, and improve the functionality and user experience of NutriNinja.',
      'For Security Purposes: To detect, prevent, and address fraud, security breaches, or other potentially prohibited or illegal activities.',
      'To Comply with Legal Obligations: To comply with applicable laws, regulations, legal processes, or governmental requests.',
    ],
  },
  {
    id: '3',
    heading: '3. How We Share Your Information',
    text: 'We do not sell your personal information. We may share your information in the following limited circumstances:',
    sections: [
        {
            subheading: 'With Service Providers:',
            points: [
                `AI Service Provider (Google's Generative AI service (Gemini model)): To generate your personalized meal plans, the specific input parameters you provide for meal generation (such as your physical characteristics, goals, dietary restrictions, and preferences, but typically not your direct identifiers like name or email unless you include them in custom fields) are sent to Google's Generative AI service (Gemini model). This provider processes this data according to their API terms and privacy policies. We encourage you to review their policies to understand how they handle data submitted via their API. (Developer: Please research and add the correct link: [Link to relevant Google AI API policies, e.g., Google API Services User Data Policy])`,
                `Other Service Providers: We may share your information with third-party vendors and service providers who perform services on our behalf, such as cloud hosting (if applicable for account data), analytics providers, customer support tools, and error reporting services. These providers are contractually obligated to protect your information and use it only for the services they provide to us.`
            ]
        },
        {
            subheading: 'For Legal Reasons:',
            text: `We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to: Comply with a legal obligation or government request (e.g., a court order or subpoena); Protect and defend our rights or property; Prevent or investigate possible wrongdoing in connection with the Service; Protect the personal safety of users of the Service or the public.`
        },
        {
            subheading: 'Business Transfers:',
            text: `If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy, receivership, sale of company assets, or transition of service to another provider, your information may be sold or transferred as part of such a transaction as permitted by law and/or contract.`
        },
        {
            subheading: 'With Your Consent:',
            text: `We may share your information for other purposes with your explicit consent.`
        },
        {
            subheading: 'Aggregated or De-identified Data:',
            text: `We may share aggregated or de-identified information, which cannot reasonably be used to identify you, for research, analysis, or other purposes.`
        }
    ]
  },
  {
    id: '4',
    heading: '4. Data Storage, Security, and Retention',
    points: [
        `Local Storage: As mentioned, your meal plan history and certain profile settings are stored locally on your device via AsyncStorage. You are responsible for the security of your device.`,
        `Server-Side Storage (If applicable for Account Data): If you create an account, your account information (e.g., name, email, hashed password, profile picture reference) may be stored on secure servers. We implement reasonable administrative, technical, and physical security measures designed to protect your information from unauthorized access, use, alteration, and disclosure.`,
        `Security Disclaimer: While we strive to use commercially acceptable means to protect your Personal Information, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.`,
        `Data Retention: We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, or as required by applicable laws. When your information is no longer needed, we will take reasonable steps to securely delete or anonymize it. Information stored locally on your device remains there until you clear the app's data, uninstall the app, or use in-app features to delete it (like "Clear History").`
    ]
  },
  {
    id: '5',
    heading: '5. Your Data Rights and Choices (In line with the Data Privacy Act of 2012 - RA 10173)',
    text: 'As a data subject in the Philippines, you have the following rights regarding your personal information:',
    points: [
        `The Right to be Informed: You have the right to be informed whether personal data pertaining to you shall be, are being, or have been processed.`,
        `The Right to Access: You have the right to request access to the personal information we hold about you.`,
        `The Right to Rectification: You have the right to request correction of any inaccurate or incomplete personal information we hold about you. You can update most of your profile information directly within the "Edit Profile" or "Account Settings" section of the App.`,
        `The Right to Erasure or Blocking (Deletion): You have the right to suspend, withdraw, or order the blocking, removal, or destruction of your personal information from our filing system. You can delete specific meal plans or clear your entire meal plan history within the App. For account deletion (if applicable), please refer to the App's settings or contact us.`,
        `The Right to Object: You have the right to object to the processing of your personal data, including processing for direct marketing, automated processing, or profiling.`,
        `The Right to Data Portability: Where technically feasible, you have the right to obtain a copy of your personal data which we process by electronic means and in a structured or commonly used format.`,
        `The Right to Damages: You may claim compensation if you suffered damages due to inaccurate, incomplete, outdated, false, unlawfully obtained, or unauthorized use of personal data.`,
        `The Right to File a Complaint: If you believe your privacy rights have been violated, you have the right to file a complaint with the National Privacy Commission (NPC) of the Philippines.`,
        `To exercise any of these rights (other than those directly manageable within the App), please contact us using the contact details provided below. We may need to verify your identity before processing your request.`
    ]
  },
  {
    id: '6',
    heading: '6. International Data Transfers',
    text: `Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction (e.g., data processed by Google's Generative AI service (Gemini model)). If you are located in the Philippines and use our Service, you consent to the processing and transfer of your information as described in this policy. We will take appropriate steps to ensure that your data is treated securely and in accordance with this Privacy Policy.`
  },
  {
    id: '7',
    heading: '7. Children\'s Privacy',
    text: `NutriNinja is not intended for use by individuals under the age of [Specify Age, e.g., 18, or 13 with parental consent provisions - Developer: Update this placeholder]. We do not knowingly collect personally identifiable information from children under this age. If you are a parent or guardian and you are aware that your child has provided us with Personal Information without your consent, please contact us. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers and/or local storage.`
  },
  {
    id: '8',
    heading: '8. Changes to This Privacy Policy',
    text: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy within the App and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted. Your continued use of the Service after the effective date of the revised Privacy Policy constitutes your acceptance of the new terms.`
  },
  {
    id: '9',
    heading: '9. Contact Us',
    text: `If you have any questions about this Privacy Policy, wish to exercise your data privacy rights, or have any concerns, please contact us:\n• By Email: nutrininja@gmail.com]`,
  },
];


const TextWithLinks = ({ text, theme }: { text: string, theme: any }) => {
  
  const parts = text.split(/(\bhttps?:\/\/\S+\b)|(\b\S+@\S+\.\S+\b)/g).filter(Boolean);

  return (
    <Text style={[styles.paragraph, { color: theme.colors.onSurfaceVariant }]}>
      {parts.map((part, index) => {
        const isUrl = part.match(/^https?:\/\/\S+$/);
        const isEmail = part.match(/^\S+@\S+\.\S+$/);

        if (isUrl || isEmail) {
          const urlToOpen = isEmail ? `mailto:${part}` : part;
          return (
            <Text
              key={index}
              style={[styles.linkText, { color: theme.colors.primary }]}
              onPress={() => Linking.openURL(urlToOpen).catch(err => Alert.alert("Error", "Could not open link: " + urlToOpen))}
            >
              {part}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};


const PrivacyScreen = ({ navigation }: { navigation: any }) => {
  const theme = useTheme();
  const DATE_OF_LAST_REVISION = "May 15, 2025"; 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Appbar.Header
            style={{ backgroundColor: theme.colors.surface }}
            statusBarHeight={0}
        >
            <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.primary} />
            <Appbar.Content title="Privacy Policy" titleStyle={{ color: theme.colors.primary, fontWeight: 'bold' }} />
        </Appbar.Header>
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={[styles.disclaimerBox, {borderColor: theme.colors.outline}]}>
                <Text style={[styles.disclaimerTitle, { color: theme.colors.error }]}>Important Legal Notice:</Text>
                <Text style={[styles.disclaimerText, { color: theme.colors.onSurfaceVariant }]}>
                    Your privacy matters to us. NutriNinja collects and uses personal data solely to provide and improve our services. By using this app, you agree to our Privacy Policy. We do not share your data with third parties without consent. For full details, please review our complete Privacy Policy.
                </Text>
            </View>

            <Text style={[styles.mainContentTitle, { color: theme.colors.onSurface }]}>Privacy Policy for NutriNinja</Text>
            <Text style={[styles.lastRevisedText, { color: theme.colors.onSurfaceVariant }]}>Last Updated: {DATE_OF_LAST_REVISION}</Text>

            {privacyPolicyContent.map((section) => (
            <View key={section.id} style={styles.sectionContainer}>
                {section.heading && <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>{section.heading}</Text>}
                {section.text && !section.points && !section.sections && (
                    <TextWithLinks text={section.text} theme={theme} />
                )}
                {section.sections && section.sections.map((subSection, ssIndex) => (
                    <View key={ssIndex} style={{marginBottom: 10}}>
                        {subSection.subheading && <Text style={[styles.subSectionTitle, {color: theme.colors.onSurface, fontWeight: '600'}]}>{subSection.subheading}</Text>}
                        {subSection.text && <TextWithLinks text={subSection.text} theme={theme} />}
                        {subSection.points && subSection.points.map((point, pIndex) => (
                             <List.Item
                                key={pIndex}
                                title={point}
                                titleNumberOfLines={10}
                                titleStyle={[styles.listItem, { color: theme.colors.onSurfaceVariant }]}
                                left={props => <List.Icon {...props} icon="circle-small" color={theme.colors.onSurfaceVariant} style={{marginTop: 6}} />}
                            />
                        ))}
                    </View>
                ))}
                {section.points && !section.sections && section.points.map((point, pIndex) => (
                    <List.Item
                        key={pIndex}
                        title={point}
                        titleNumberOfLines={10}
                        titleStyle={[styles.listItem, { color: theme.colors.onSurfaceVariant }]}
                        left={props => <List.Icon {...props} icon="circle-small" color={theme.colors.onSurfaceVariant} style={{marginTop: 6}}/>}
                    />
                ))}
            </View>
            ))}
            <Divider style={{ backgroundColor: theme.colors.outline, marginTop: 20, marginBottom: 10 }} />
            <View style={styles.footer}>
                <Text style={[styles.copyrightText, { color: theme.colors.onSurfaceVariant }]}>
                    © {new Date().getFullYear()} NutriNinja. All rights reserved.
                </Text>
                <Text style={[styles.copyrightText, { color: theme.colors.onSurfaceVariant, marginTop: 5 }]}>
                    Please review this policy carefully.
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  disclaimerBox: {
    padding: 15,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  mainContentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 10,
    textAlign: 'center',
  },
  lastRevisedText: {
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 16,
    
    marginTop: 8,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'justify',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'justify',
    paddingLeft: 0,
  },
  linkText: {
    
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  copyrightText: {
    fontSize: 12,
  }
});

export default PrivacyScreen;