import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Text,
  TextInput,
  Button,
  Snackbar,
  useTheme,
} from 'react-native-paper';

const Header = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={28}
        color="#000000"
        onPress={() => navigation.goBack()}
        style={styles.headerButton}
      />
      <Text style={styles.headerTitle} variant="titleLarge">
        {title}
      </Text>
      <View style={styles.headerButton} />
    </View>
  );
};

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleChangePassword = () => {
    setError('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('All fields must be filled out.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation must match.');
      return;
    }

    // Simulate password change success
    setSnackbarVisible(true);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Change Password" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.infoText} variant="bodyMedium" selectable={false}>
            To change your password, enter your current password and the new one twice to confirm.
          </Text>

          <TextInput
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Type current password"
            secureTextEntry
            style={styles.input}
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
          />
          <TextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Type new password"
            secureTextEntry
            style={styles.input}
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
          />
          <TextInput
            label="Confirm New Password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholder="Repeat new password"
            secureTextEntry
            style={styles.input}
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
          />

          {error ? (
            <Text style={[styles.errorText, { color: theme.colors.error }]} variant="bodyMedium">
              {error}
            </Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleChangePassword}
            style={styles.submitButton}
            contentStyle={{ paddingVertical: 12 }}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
          >
            Change Password
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>

     
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false);
            navigation.goBack();
          },
        }}
        style={{ backgroundColor: theme.colors.primary }}
      >
        <Text style={{ color: theme.colors.onPrimary }}>
          Password changed successfully.
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  headerButton: {
    padding: 5,
    minWidth: 30,
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  infoText: {
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
    color: '#000',
  },
  input: {
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 10,
  },
});

export default ChangePasswordScreen;
