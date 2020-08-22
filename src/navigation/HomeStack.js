import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const SportistStack = createStackNavigator();

export default function SportistApp() {
  return (
    <SportistStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#10316B',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <SportistStack.Screen name="Home" component={HomeScreen} />
    </SportistStack.Navigator>
  );
}
