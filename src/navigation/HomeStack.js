/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from './AuthProvider';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import BasketScreenModal from '../screens/BasketScreenModal';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BetsScreen from '../screens/BetsScreen';

const PointsText = styled.Text`
  color: ${(props) => props.theme.colors.alternative};
  font-size: 14px;
  font-family: 'Poppins-Medium';
`;

const Tab = createBottomTabNavigator();

const BasketSreenComponent = () => {
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
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={26}
            />
          ),
        }}
        name="Bets"
        component={BetsScreen}
      />
      <Tab.Screen
        name="Basket"
        component={BasketSreenComponent}
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
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        name="Profile2"
        component={user ? ProfileScreen : LoginScreen}
      />
    </Tab.Navigator>
  );
}

const SportistStack = createStackNavigator();

export default function SportistApp() {
  const userDetails = useSelector((state) => state.matches.userDetails);

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
            <View
              style={{
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '70%',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={{
                  uri:
                    'https://res.cloudinary.com/drs642d4b/image/upload/v1598094982/Frame_1_xaqpvg.png',
                }}
              />
              {userDetails ? (
                <PointsText style={{position: 'absolute', right: 0}}>
                  {userDetails.points} Puan
                </PointsText>
              ) : (
                <View />
              )}
            </View>
          ),
        }}
        name="Homepage"
        component={MyTabs}
      />
    </SportistStack.Navigator>
  );
}
