import React, {useContext} from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from './AuthProvider';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import BasketScreenModal from '../screens/BasketScreenModal';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BasketreenComponent = () => {
  return null;
};

function MyTabs() {
  const {user} = useContext(AuthContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#EAC100',
        inactiveTintColor: '#f0edf6',
        allowFontScaling: true,
        showLabel: false,
        tabStyle: {paddingTop: 5},
        style: {
          backgroundColor: '#10316B',
          borderTopColor: '#10316B',
        },
      }}
      initialRouteName="Home">
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
        name="Basket"
        component={BasketreenComponent}
        options={{
          tabBarButton: () => <BasketScreenModal />,
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        name="Profile"
        component={user ? ProfileScreen : LoginScreen}
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
