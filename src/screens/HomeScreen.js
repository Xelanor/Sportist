import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, StatusBar, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';

import HomeMatchLine from '../components/HomeMatchLine';

const Wrapper = styled.SafeAreaView`
  background-color: #10316b;
  flex: 1;
`;

const Container = styled.View`
  background-color: #0b8457;
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
  margin-bottom: 5px;
  align-items: center;
  border-bottom-width: 2px;
  border-color: #eac100;
`;

const Title = styled.Text`
  color: #dee1ec;
  font-size: 24px;
  font-family: 'Poppins-SemiBoldItalic';
`;

export default function HomeScreen({navigation}) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    date = date.getTime().toString();
    date = parseInt(date.slice(0, date.length - 3));
    console.log(date);

    const unsubscribe = firestore()
      .collection('MATCHES')
      .where('date', '>', date)
      .orderBy('date')
      .onSnapshot((querySnapshot) => {
        const MATCHES = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
        });
        setMatches(MATCHES);
      });

    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" backgroundColor="#10316B" />
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              style={{margin: 0, marginBottom: 5}}
              icon="filter-outline"
              size={26}
              color="#DEE1EC"
            />
            <IconButton
              style={{margin: 0, marginBottom: 5}}
              icon="magnify"
              size={26}
              color="#DEE1EC"
            />
          </View>
        </TitleContainer>
        <FlatList
          data={matches}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <HomeMatchLine match={item} />}
        />
      </Container>
    </Wrapper>
  );
}
