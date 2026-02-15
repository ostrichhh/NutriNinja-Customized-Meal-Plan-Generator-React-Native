import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  useTheme,
  Text,
  TextInput,
  Button,
  Dialog,
  Portal,
  Surface,
} from 'react-native-paper';


const defaultProfileImage = require('../assets/images/profilepic.jpg');


const launchImagePickerPlaceholder = (callback: (uri: string | null) => void) => {
 
  callback("https://via.placeholder.com/150/000000/FFFFFF?Text=Profile");
};

const Header = ({ title, onBack }: { title: string; onBack: () => void }) => {
  const theme = useTheme();
  return (
    <Surface style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity onPress={onBack} style={styles.headerButton}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={theme.colors.onSurface} />
      </TouchableOpacity>
      <Text
        variant="titleLarge"
        style={[styles.headerTitle, { color: theme.colors.onSurface }]}
      >
        {title}
      </Text>
      <View style={styles.headerButton} />
    </Surface>
  );
};

const EditProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState<any>(defaultProfileImage);
  const [fullName, setFullName] = useState('Marc Rescupin');
  const [username, setUsername] = useState('eron11');
  const [email, setEmail] = useState('rarrar@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('09072327384');

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const showDialog = (title: string, message: string) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const handleChoosePhoto = () => {
    launchImagePickerPlaceholder((uri) => {
      if (uri) {
        setProfileImage({ uri });
        showDialog("Profile Picture", "Profile picture updated (simulated).");
      }
    });
  };

  const handleSaveChanges = () => {
    const profileData = {
      profileImage,
      fullName,
      username,
      email,
      phoneNumber,
    };
    console.log('Profile Data to Save:', profileData);
    showDialog('Profile Saved', 'Your account information has been updated (simulated).');
  };

  const handleChangePassword = () => {
    showDialog('Change Password', 'Password change functionality would be initiated here.');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <Header title="Account Settings" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profilePicSection}>
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.profilePicContainer}>
            <Image source={profileImage} style={styles.profilePic} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Text style={[styles.changePhotoText, { color: theme.colors.primary }]}>
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            Personal Details
          </Text>

          <TextInput
            label="Full Name"
            mode="outlined"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />

          <TextInput
            label="Username"
            mode="outlined"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />

          <TextInput
            label="Email Address"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />

          <TextInput
            label="Phone Number (Optional)"
            mode="outlined"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSaveChanges}
          style={styles.saveButton}
          contentStyle={{ paddingVertical: 8 }}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
        >
          Save Changes
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profilePicSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000',
  },
  input: {
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: 5,
  },
});

export default EditProfileScreen;
