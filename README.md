#  NutriNinja - AI-Powered Meal Plan Generator

> Your personalized nutrition assistant powered by Google Gemini AI

NutriNinja is a React Native mobile application that generates customized meal plans based on your body type, fitness goals, and dietary preferences using advanced AI technology.

## Features

-  **AI-Powered Meal Plans** - Leverages Google Gemini AI to create personalized meal recommendations
-  
-  **Body Type Analysis** - Supports Endomorph, Mesomorph, and Ectomorph metabolism types
-  
-  **Goal-Oriented** - Tailored plans for cutting, bulking, or maintaining weight
-  
-  **Multi-Language Support** - Available in English, Tagalog, and Ilocano
-  
-  **Dietary Restrictions** - Accommodates vegetarian, pescatarian, and custom dietary needs
-  
-  **History Management** - Save, view, and manage your meal plan history
-  
-  **Beautiful UI** - Clean, modern interface with React Native Paper components
-  
-  **Secure** - API keys protected using environment variables

##  Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **UI Library:** React Native Paper
- **Navigation:** React Navigation (Stack & Bottom Tabs)
- **AI Integration:** Google Generative AI (Gemini)
- **Storage:** AsyncStorage
- **Architecture:** Clean Architecture with separated concerns

## 📁 Project Structure

```
NutriNinja/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ScreenHeader.tsx
│   │   ├── ChipGroup.tsx
│   │   ├── CustomButton.tsx
│   │   ├── CustomTextInput.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── screens/          # Application screens
│   │   ├── HomeScreen.tsx
│   │   ├── GenerateScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── LoginScreen.tsx
│   ├── navigation/       # Navigation configuration
│   │   ├── TabNavigation.tsx
│   │   ├── HomeStack.tsx
│   │   ├── GenerateStack.tsx
│   │   └── SettingsStack.tsx
│   ├── services/         # Business logic layer
│   │   ├── geminiService.ts    # AI API integration
│   │   ├── storageService.ts   # AsyncStorage operations
│   │   └── authService.ts      # Authentication logic
│   ├── hooks/            # Custom React hooks
│   │   ├── useMealPlans.ts     # Meal plan state management
│   │   └── useGeminiApi.ts     # AI API calls
│   ├── styles/           # Shared style system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── commonStyles.ts
│   ├── constants/        # App configuration
│   │   └── config.ts
│   └── types/            # TypeScript definitions
│       └── index.ts
├── assets/               # Images and resources
├── App.tsx              # Root component
└── .env.local           # Environment variables (not tracked)
```

##  Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ostrichhh/NutriNinja---Customized-Meal-Plan-Generator---AI-React-Native.git
   cd "NutriNinja(Mobile App)"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > **📝 Note:** Get your free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run the app**
   - Scan the QR code with Expo Go app on your phone
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator (Mac only)

## 📱 How to Use

1. **Login** - Start by logging into your account
2. **Navigate to Generate** - Tap the "Generate" tab
3. **Enter Your Details:**
   - Select your metabolism type (Endomorph/Mesomorph/Ectomorph)
   - Choose your goal (Cutting/Bulking/Maintain)
   - Enter height, age, and weight
   - Select gender
   - Choose language preference
   - (Optional) Add dietary restrictions
4. **Generate** - Tap "Generate Meal Plan" and wait for AI to create your personalized plan
5. **View History** - Access saved meal plans in the "History" tab
6. **Manage Settings** - Customize app preferences in the "Settings" tab

##  Architecture Highlights

### Clean Architecture
- **Separation of Concerns:** UI components separated from business logic
- **Service Layer:** Dedicated services for AI, storage, and authentication
- **Custom Hooks:** Reusable state management logic
- **Type Safety:** Comprehensive TypeScript types throughout

### Key Design Patterns
- **Component Reusability:** 6 reusable components eliminate code duplication
- **Centralized Styles:** Shared color, typography, and spacing constants
- **Environment Configuration:** Secure API key management
- **Error Handling:** Consistent error states across the app

##  Security

- API keys are stored in `.env.local` (git-ignored)
- Environment variables use Expo's `EXPO_PUBLIC_` prefix
- Sensitive data never committed to version control

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

Created by [@ostrichhh](https://github.com/ostrichhh)

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with [Expo](https://expo.dev/)
- UI components from [React Native Paper](https://callstack.github.io/react-native-paper/)

---

**Made with ❤️ and 🥷 NutriNinja**
