import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useTheme,
  List,
  Divider,
  Switch,
  Button,
  Dialog,
  Portal,
  Snackbar,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

interface SettingsScreenProps {
  onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onLogout }) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [isLogoutConfirmation, setIsLogoutConfirmation] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const showDialog = (message: string, isLogout: boolean = false) => {
    setAlertMessage(message);
    setIsLogoutConfirmation(isLogout);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setIsLogoutConfirmation(false);
  };

  const onToggleNotifications = () => {
    const newValue = !isNotificationsEnabled;
    setIsNotificationsEnabled(newValue);
    setAlertMessage(
      newValue
        ? 'You will receive Notifications from NutriNinja from now on.'
        : 'Notification Disabled.'
    );
    setSnackbarVisible(true);
  };

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  const handleLogout = () => {
    showDialog('Are you sure you want to logout?', true);
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={[styles.subHeader, { color: theme.colors.onSurfaceVariant }]}>
          Manage your app preferences and account details. Here you can customize notifications,
          appearance, and more to tailor NutriNinja to your needs.
        </Text>

        <List.Section style={styles.listSection}>
          <List.Subheader style={{ color: theme.colors.onSurfaceVariant }}>
            Account
          </List.Subheader>

          <TouchableOpacity onPress={() => navigateToScreen('EditProfile')}>
            <List.Item
              title="Edit Profile"
              description="Update your personal information"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="account-circle-outline"
                  color={theme.colors.primary}
                />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToScreen('ChangePassword')}>
            <List.Item
              title="Change Password"
              description="Secure your account"
              left={(props) => (
                <List.Icon {...props} icon="lock-outline" color={theme.colors.primary} />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
          </TouchableOpacity>
        </List.Section>

        <Divider style={{ backgroundColor: theme.colors.outline }} />

        <List.Section style={styles.listSection}>
          <List.Subheader style={{ color: theme.colors.onSurfaceVariant }}>
            Preferences
          </List.Subheader>
          <List.Item
            title="Enable Notifications"
            left={(props) => (
              <List.Icon {...props} icon="bell-outline" color={theme.colors.primary} />
            )}
            right={() => (
              <Switch
                value={isNotificationsEnabled}
                onValueChange={onToggleNotifications}
                color={theme.colors.primary}
              />
            )}
            titleStyle={{ color: theme.colors.onSurface }}
          />
        </List.Section>

        <Divider style={{ backgroundColor: theme.colors.outline }} />

        <List.Section style={styles.listSection}>
          <List.Subheader style={{ color: theme.colors.onSurfaceVariant }}>
            About
          </List.Subheader>

          <TouchableOpacity onPress={() => navigateToScreen('About')}>
            <List.Item
              title="About NutriNinja"
              description="Version, licenses, and more"
              left={(props) => (
                <List.Icon {...props} icon="information-outline" color={theme.colors.primary} />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToScreen('TermsOfService')}>
            <List.Item
              title="Terms of Service"
              left={(props) => (
                <List.Icon {...props} icon="file-document-outline" color={theme.colors.primary} />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              titleStyle={{ color: theme.colors.onSurface }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToScreen('Privacy')}>
            <List.Item
              title="Privacy Policy"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="shield-account-outline"
                  color={theme.colors.primary}
                />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              titleStyle={{ color: theme.colors.onSurface }}
            />
          </TouchableOpacity>
        </List.Section>

        <Divider style={{ backgroundColor: theme.colors.outline }} />

        <View style={styles.logoutContainer}>
          <Button
            icon="logout"
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
              {isLogoutConfirmation ? 'Confirm Logout' : 'Notification Status'}
            </Dialog.Title>
            <Dialog.Content>
              <Text>{alertMessage}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              {isLogoutConfirmation ? (
                <>
                  <Button onPress={hideDialog}>Cancel</Button>
                  <Button
                    onPress={() => {
                      hideDialog();
                      onLogout();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button onPress={hideDialog}>OK</Button>
              )}
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {alertMessage}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxxl,
  },
  headerTitle: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.base,
    backgroundColor: colors.gray50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray800,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subHeader: {
    fontSize: typography.fontSize.base,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    lineHeight: typography.lineHeight.normal,
  },
  listSection: {
    marginTop: 0,
    marginBottom: spacing.sm,
  },
  logoutContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 6,
  },
});

export default SettingsScreen;
