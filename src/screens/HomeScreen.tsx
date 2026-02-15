import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Animated,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import { BottomTabParamList } from '../types';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

type NavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Home'>;

const catchPhrases = [
  'Smart meals. Ninja speed.',
  'Precision-crafted meals, just for you.',
  'Meal planning made effortless.',
  'Your personalized plate, ready in a tap.',
  'Fuel your goals with every bite.',
  'One tap. One plan. All you need.',
  'Slicing through stress—one meal plan at a time.',
];

const carouselImages = [
  require('../assets/images/displaygemini.png'),
  require('../assets/images/displayhistory.png'),
  require('../assets/images/displaygenerate.png'),
];

const PHRASE_VISIBLE_DURATION = 3000;
const FADE_ANIMATION_DURATION = 500;
const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const navigationAny = useNavigation<any>();
  const theme = useTheme();

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const cyclePhrases = () => {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: FADE_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % catchPhrases.length);
      });
    };
    const timerId = setTimeout(cyclePhrases, PHRASE_VISIBLE_DURATION);
    return () => clearTimeout(timerId);
  }, [currentPhraseIndex, opacityAnim]);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: FADE_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [currentPhraseIndex, opacityAnim]);

  const handleAboutUsPress = () => {
    navigationAny.navigate('About');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.appHeaderBar}>
          <Text style={styles.headerText}>NutriNinja</Text>
          <TouchableOpacity onPress={handleAboutUsPress} style={styles.iconButton}>
            <MaterialCommunityIcons name="information-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.introductoryContentWrapper}>
          <Text style={[styles.greetingText, { color: theme.colors.onSurfaceVariant }]}>
            Hello!
          </Text>
          <View style={styles.animatedTextContainer}>
            <Animated.Text
              style={[
                styles.animatedPhraseText,
                { opacity: opacityAnim, color: theme.colors.onSurfaceVariant },
              ]}
            >
              {catchPhrases[currentPhraseIndex]}
            </Animated.Text>
          </View>
          <View style={styles.logoAndTaglineContainer}>
            <Image source={require('../assets/images/Nutrininja.png')} style={styles.logoImage} />
            <Text
              style={[
                styles.taglineText,
                { color: theme.colors.secondary || colors.brandPurple },
              ]}
            >
              Your Customized Meal plan generator
            </Text>
          </View>
        </View>

        <Text style={[styles.offersTitle, { color: colors.brandPurple }]}>
          What Nutrininja offers
        </Text>

        <View style={styles.carouselOuterContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carouselScrollViewInternal}
          >
            {carouselImages.map((imageSource, index) => (
              <View key={index} style={styles.carouselItemContainer}>
                <Image
                  source={imageSource}
                  style={[
                    styles.carouselImage,
                    {
                      backgroundColor: theme.colors.surfaceVariant,
                      borderColor: theme.colors.outline,
                    },
                  ]}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.mainContentArea}>
          <Text style={[styles.description, { color: theme.colors.onSurface }]}>
            NutriNinja is your personal nutrition assistant, designed to help you achieve your
            health and fitness goals with ease.
          </Text>
          <PaperButton
            mode="contained"
            onPress={() => navigation.navigate('Generate')}
            style={styles.paperButton}
            buttonColor={colors.brandPurple}
            textColor={theme.colors.onPrimary || colors.white}
            contentStyle={styles.paperButtonContent}
            labelStyle={styles.paperButtonLabel}
          >
            Let's Go!
          </PaperButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 20,
    paddingBottom: spacing.xxxl,
  },
  appHeaderBar: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.base,
    width: '100%',
    marginBottom: spacing.base,
    backgroundColor: colors.gray50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: typography.fontSize.huge,
    fontWeight: typography.fontWeight.bold,
    color: colors.black,
    textAlign: 'center',
  },
  iconButton: {
    position: 'absolute',
    right: spacing.lg,
    padding: 5,
    zIndex: 1,
  },
  introductoryContentWrapper: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  greetingText: {
    fontSize: typography.fontSize.xl,
    textAlign: 'center',
    marginBottom: 12,
  },
  animatedTextContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.lg,
  },
  animatedPhraseText: {
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: spacing.md,
  },
  logoAndTaglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  logoImage: {
    width: 200,
    height: 190,
    resizeMode: 'contain',
    marginRight: spacing.md,
  },
  taglineText: {
    flex: 1,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'left',
    lineHeight: typography.lineHeight.relaxed,
  },
  offersTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.base,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  carouselOuterContainer: {
    height: 220,
    width: '100%',
    marginBottom: spacing.lg,
  },
  carouselScrollViewInternal: {
    width: screenWidth,
    height: '100%',
  },
  carouselItemContainer: {
    width: screenWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mainContentArea: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    width: '100%',
    paddingBottom: spacing.lg,
    marginTop: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
  },
  paperButton: {
    borderRadius: 8,
    width: 'auto',
    minWidth: 220,
    justifyContent: 'center',
    elevation: 2,
  },
  paperButtonContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperButtonLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginRight: spacing.sm,
  },
});

export default HomeScreen;