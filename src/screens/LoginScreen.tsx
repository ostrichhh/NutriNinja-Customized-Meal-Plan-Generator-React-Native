import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button as PaperButton, TextInput, Text, useTheme, Card } from 'react-native-paper';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const navigation = useNavigation<any>();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt with:', { email, password });
    onLogin();
  };

  const handleSignUp = () => {
    console.log('Navigate to Sign Up Screen');
  };

  const handleForgotPassword = () => {
    console.log('Navigate to Forgot Password Screen');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}

        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.appHeaderBar}>
          <Text style={[styles.headerText, { color: theme.colors.onSurface }]}>NutriNinja</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/Nutrininja.png')}
            style={styles.logoImage}
          />
          <Text style={[styles.welcomeText, { color: theme.colors.onSurfaceVariant }]}>
            Welcome Back!
          </Text>
          <Text style={[styles.subtitleText, { color: theme.colors.onSurfaceVariant }]}>
            Log in to continue your journey.
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Email or Username"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="account" color={colors.brandPurple} />}
              theme={{
                colors: { primary: colors.brandPurple, background: theme.colors.surface },
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry={!passwordVisible}
              left={<TextInput.Icon icon="lock" color={colors.brandPurple} />}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? 'eye-off' : 'eye'}
                  color={colors.brandPurple}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              theme={{
                colors: { primary: colors.brandPurple, background: theme.colors.surface },
              }}
            />

            <TouchableOpacity onPress={handleForgotPassword} style={styles.linkContainer}>
              <Text style={[styles.linkText, { color: colors.brandPurple }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <PaperButton
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              buttonColor={colors.brandPurple}
              textColor={theme.colors.onPrimary || colors.white}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              icon={({ size, color }) => (
                <MaterialCommunityIcons name="login-variant" size={size} color={color} />
              )}
            >
              Log In
            </PaperButton>
          </Card.Content>
        </Card>

        <View style={styles.signUpContainer}>
          <Text style={[styles.signUpText, { color: theme.colors.onSurfaceVariant }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.signUpLinkText, { color: colors.brandPurple }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 20,
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  appHeaderBar: {
    paddingVertical: spacing.md,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  headerText: {
    fontSize: typography.fontSize.mega,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoImage: {
    width: 150,
    height: 140,
    resizeMode: 'contain',
    marginBottom: spacing.base,
  },
  welcomeText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    elevation: 4,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: spacing.xl,
    backgroundColor: colors.white,
    padding: spacing.sm,
  },
  input: {
    marginBottom: spacing.lg,
    backgroundColor: 'transparent',
    width: '100%',
    paddingLeft: 48,
    paddingRight: 48,
  },
  linkContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  linkText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  loginButton: {
    borderRadius: 8,
    width: '100%',
    elevation: 2,
  },
  buttonContent: {
    paddingVertical: spacing.md,
    flexDirection: 'row-reverse',
  },
  buttonLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  signUpText: {
    fontSize: typography.fontSize.base,
  },
  signUpLinkText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
});
