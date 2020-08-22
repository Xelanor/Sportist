import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import BasketScreen from '../screens/BasketScreen';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#EAC100"
      inactiveColor="#f0edf6"
      labeled={false}
      barStyle={{backgroundColor: '#10316B'}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        name="Profile"
        component={BasketScreen}
      />
    </Tab.Navigator>
  );
}

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
      <SportistStack.Screen
        options={{
          headerTitle: (props) => (
            <Image
              style={{
                height: 40,
                resizeMode: 'contain',
              }}
              source={{
                uri:
                  'https://res.cloudinary.com/drs642d4b/image/upload/v1598094982/Frame_1_xaqpvg.png',
              }}
            />
          ),
        }}
        name="Homepage"
        component={MyTabs}
      />
    </SportistStack.Navigator>
  );
}
