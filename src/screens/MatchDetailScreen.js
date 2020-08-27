import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import OddsContainer from '../components/match-detail-screen/OddsContainer';

const Tab = createMaterialTopTabNavigator();

const Wrapper = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
`;

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  flex: 1;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 10px;
  align-items: center;
  border-bottom-width: 2px;
  border-color: ${(props) => props.theme.colors.alternative};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 24px;
  font-family: 'Poppins-SemiBoldItalic';
`;

const LigText = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-Regular';
  text-align: center;
  margin-top: 7px;
  margin-bottom: -4px;
`;

const DateText = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 18px;
  font-family: 'Poppins-Medium';
  text-align: center;
`;

const TeamsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const HomeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 30%;
`;

const AwayContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
`;

const HomeText = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-Medium';
  text-align: left;
`;

const AwayText = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-Medium';
  text-align: right;
`;

const DashText = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-Medium';
`;

const MatchDetailScreen = ({route, navigation}) => {
  const {match} = route.params;

  return (
    <Wrapper>
      <Container>
        <TitleContainer>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              style={{margin: 0, marginBottom: 5}}
              icon="soccer"
              size={26}
              color="#10316b"
            />
            <Title>FUTBOL</Title>
          </View>
        </TitleContainer>
        <LigText>{match.leauge}</LigText>
        <DateText>{moment(match.date).format('HH:mm')}</DateText>
        <TeamsContainer>
          <HomeContainer>
            <View
              style={{
                height: 70,
                width: 50,
                backgroundColor: 'blue',
                marginRight: 8,
              }}
            />
            <HomeText>{match.home}</HomeText>
          </HomeContainer>
          <DashText>-</DashText>
          <AwayContainer>
            <AwayText>{match.away}</AwayText>
            <View
              style={{
                height: 70,
                width: 50,
                backgroundColor: 'red',
                marginLeft: 8,
              }}
            />
          </AwayContainer>
        </TeamsContainer>
        <Tab.Navigator
          initialRouteName="Odds"
          tabBarOptions={{
            activeTintColor: '#10316B',
            inactiveTintColor: '#2B4B85',
            labelStyle: {
              fontSize: 14,
              fontFamily: 'Poppins-SemiBoldItalic',
              marginBottom: -6,
              marginTop: -4,
            },
            style: {backgroundColor: '#EAC100'},
          }}>
          <Tab.Screen name="Odds" options={{tabBarLabel: 'Oranlar'}}>
            {(props) => <OddsContainer match={match} />}
          </Tab.Screen>
          <Tab.Screen name="Forum" options={{tabBarLabel: 'Forum'}}>
            {(props) => <View></View>}
          </Tab.Screen>
          <Tab.Screen name="Editor" options={{tabBarLabel: 'Editör Yorumları'}}>
            {(props) => <View></View>}
          </Tab.Screen>
        </Tab.Navigator>
      </Container>
    </Wrapper>
  );
};

export default MatchDetailScreen;
