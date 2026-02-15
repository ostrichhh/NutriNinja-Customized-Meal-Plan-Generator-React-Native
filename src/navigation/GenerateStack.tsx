import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import GenerateScreen from '../screens/GenerateScreen'; 
import HelpScreen from '../screens/HelpScreen';       

const GenerateStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}>
      <Stack.Screen name="Generate" component={GenerateScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
};

export default GenerateStack;