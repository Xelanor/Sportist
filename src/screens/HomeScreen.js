import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import {fetchMatches, addToBasket} from '../store/actions/match';
import {AuthContext} from '../navigation/AuthProvider';
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

function HomeScreen({navigation}) {
  const matches = useSelector((state) => state.matches.matches);

  const dispatch = useDispatch();

  useEffect(() => {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    date = date.getTime().toString();
    date = parseInt(date.slice(0, date.length - 3));

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
        dispatch(fetchMatches(MATCHES));
      });

    return () => unsubscribe();
  }, []);

  const addMatchToBasket = (match, odd) => {
    dispatch(addToBasket(match, odd));
  };

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
        {matches.length === 0 ?? (
          <Text style={{color: '#dee1ec', fontSize: 18, padding: 8}}>
            Görüntülenecek hiç maç bulunmamaktadır.
          </Text>
        )}
        <FlatList
          data={matches}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <HomeMatchLine add={addMatchToBasket} match={item} />
          )}
        />
      </Container>
    </Wrapper>
  );
}

export default HomeScreen;
