import React, {useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ActiveBets from '../components/bets-screen/ActiveBets';
import CompletedBets from '../components/bets-screen/CompletedBets';

const Tab = createMaterialTopTabNavigator();

const Wrapper = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
`;

const Container = styled.View`
  background-color: #4f4f4f;
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
  border-bottom-width: 3px;
  border-color: ${(props) => props.theme.colors.secondary};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 24px;
  font-family: 'Poppins-SemiBoldItalic';
`;

const BetsScreen = () => {
  const {user} = useContext(AuthContext);
  const [ongoingBets, setOngoingBets] = useState();
  const [completedBets, setCompletedBets] = useState();

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .collection('BETS')
        .where('userId', '==', user.uid)
        .onSnapshot((querySnapshot) => {
          let BETS = querySnapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              ...documentSnapshot.data(),
            };
          });
          BETS = BETS.sort((a, b) => (a.date < b.date ? 1 : -1));
          let ONGOING = BETS.filter((bet) => bet.state === 'ongoing');
          let COMPLETED = BETS.filter((bet) => bet.state !== 'ongoing');
          setOngoingBets(ONGOING);
          setCompletedBets(COMPLETED);
        });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <Wrapper>
      <Container>
        <TitleContainer>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              style={{margin: 0, marginBottom: 5}}
              icon="format-list-checks"
              size={26}
              color="#DEE1EC"
            />
            <Title>KUPONLARINIZ</Title>
          </View>
        </TitleContainer>
        {user ? (
          <Tab.Navigator
            initialRouteName="Ongoing"
            tabBarOptions={{
              activeTintColor: '#10316B',
              inactiveTintColor: '#2B4B85',
              labelStyle: {
                fontSize: 18,
                fontFamily: 'Poppins-SemiBoldItalic',
                marginBottom: -6,
                marginTop: -4,
              },
              style: {backgroundColor: '#EAC100'},
            }}>
            <Tab.Screen
              tabBarOptions={{
                style: {backgroundColor: '#e91e63"'},
              }}
              name="Ongoing"
              options={{tabBarLabel: 'Aktif'}}>
              {(props) => <ActiveBets {...props} bets={ongoingBets} />}
            </Tab.Screen>
            <Tab.Screen name="Completed" options={{tabBarLabel: 'Tamamlanmış'}}>
              {(props) => <CompletedBets {...props} bets={completedBets} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <View style={{padding: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                fontFamily: 'Poppins-Medium',
              }}>
              Kuponlarınızı görüntüleyebilmeniz için üye girişi yapmanız
              gerekmektedir.
            </Text>
          </View>
        )}
      </Container>
    </Wrapper>
  );
};

export default BetsScreen;
