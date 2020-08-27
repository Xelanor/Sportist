import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Vibration,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import {fetchMatches, addToBasket} from '../store/actions/match';
import {AuthContext} from '../navigation/AuthProvider';
import HomeMatchLine from '../components/homescreen/HomeMatchLine';
import FilterContainer from '../components/homescreen/FilterContainer';

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

const InputContainer = styled.View`
  background-color: ${(props) => props.theme.colors.back};
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const TextInputStyle = styled.TextInput`
  height: 40px;
  font-size: 18px;
  padding-left: 15px;
  color: ${(props) => props.theme.colors.primary};
`;

function HomeScreen({navigation}) {
  const matches = useSelector((state) => state.matches.matches);
  const [tempMatches, setTempMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [search, setSearch] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [leaugeFilter, setLeaugeFilter] = useState();

  const dispatch = useDispatch();

  const openSearchContainer = () => {
    setSearch(!search);
  };

  useEffect(() => {
    let date = new Date();
    date = date.getTime();

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
        setTempMatches(MATCHES);
        setFilteredMatches(MATCHES);
        let filter = {};
        let leauges = [...new Set(MATCHES.map((match) => match.leauge))];
        leauges.forEach((leauge) => (filter[leauge] = true));
        setLeaugeFilter(filter);
      });

    return () => unsubscribe();
  }, []);

  const addMatchToBasket = (match, odd) => {
    Vibration.vibrate(100);
    dispatch(addToBasket(match, odd));
  };

  const searchFilter = (text) => {
    const newData = filteredMatches.filter((item) => {
      const itemData = `${item.home.toUpperCase()} ${item.away.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setTempMatches(newData);
  };

  const filterLeauge = (leauge, value) => {
    let newFilter = {...leaugeFilter};
    const currentValue = newFilter[leauge];
    newFilter[leauge] = !currentValue;
    setLeaugeFilter(newFilter);
  };

  const filterClear = () => {
    let newFilter = {...leaugeFilter};
    Object.keys(leaugeFilter).forEach((leauge) => (newFilter[leauge] = false));
    setLeaugeFilter(newFilter);
  };

  const filterSubmit = () => {
    const newData = matches.filter((item) => {
      return leaugeFilter[item.leauge];
    });

    setTempMatches(newData);
    setFilteredMatches(newData);
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
              onPress={() => setFilterModal(!filterModal)}
              style={{margin: 0, marginBottom: 5}}
              icon="filter-outline"
              size={26}
              color="#DEE1EC"
            />
            <IconButton
              onPress={openSearchContainer}
              style={{margin: 0, marginBottom: 5}}
              icon="magnify"
              size={26}
              color="#DEE1EC"
            />
          </View>
        </TitleContainer>
        {search ? (
          <InputContainer>
            <TextInputStyle
              onChangeText={(text) => searchFilter(text)}
              placeholder="Maç Ara..."
              placeholderTextColor="#10316B"
              keyboardType="number-pad"
            />
          </InputContainer>
        ) : (
          <View />
        )}
        {matches.length === 0 ? (
          <Text style={{color: '#dee1ec', fontSize: 18, padding: 8}}>
            Görüntülenecek hiç maç bulunmamaktadır.
          </Text>
        ) : (
          <View />
        )}
        <FlatList
          data={tempMatches}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <HomeMatchLine
              add={addMatchToBasket}
              match={item}
              navigation={navigation}
            />
          )}
        />
      </Container>
      {matches.length !== 0 ? (
        <FilterContainer
          leauges={leaugeFilter}
          visible={filterModal}
          setVisible={setFilterModal}
          filter={filterLeauge}
          filterClear={filterClear}
          filterSubmit={filterSubmit}
        />
      ) : (
        <View />
      )}
    </Wrapper>
  );
}

export default HomeScreen;
