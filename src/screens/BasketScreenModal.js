/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  ScrollView,
  Vibration,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {removeFromBasket} from '../store/actions/match';
import {useDispatch} from 'react-redux';
import functions from '@react-native-firebase/functions';
import {AuthContext} from '../navigation/AuthProvider';
import {clearBasket} from '../store/actions/match';

import Loading from '../components/Loading';

const ButtonWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 80px;
  background-color: #0b8457;
  margin-top: -20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-width: 2px;
  border-color: #eac100;
`;

const SmallButton = styled.View`
  height: 5px;
  width: 80px;
  background-color: #dee1ec;
  margin-top: -20px;
  border-radius: 15px;
`;

const MatchCount = styled.Text`
  color: #dee1ec;
  font-size: 14px;
  font-family: 'Poppins-SemiBold';
`;

const OddCount = styled.Text`
  color: #dee1ec;
  font-size: 10px;
  font-family: 'Poppins-SemiBold';
`;

const BetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #10316b;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 8px;
`;

const BetLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MatchName = styled.Text`
  color: #10316b;
  font-size: 18px;
  font-family: 'Poppins-Medium';
`;

const OddType = styled.Text`
  color: #10316b;
  font-size: 14px;
  font-family: 'Poppins-Regular';
`;

const OddAmount = styled.Text`
  color: #0b8457;
  font-size: 16px;
  font-family: 'Poppins-Medium';
`;

const DateText = styled.Text`
  color: #10316b;
  font-size: 14px;
  font-family: 'Poppins-RegularItalic';
`;

const TotalContainer = styled.View`
  border-top-width: 2px;
  border-color: #0b8457;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 8px;
  padding-right: 12px;
`;

const BetButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #0b8457;
  padding-top: 6px;
  padding-right: 20px;
  padding-left: 20px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const BetText = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-SemiBoldItalic';
  color: #eac100;
`;

const EmptyBasketButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #10316b;
  padding-top: 4px;
  padding-right: 20px;
  padding-left: 20px;
`;

const EmptyBasketText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Regular';
  color: #eac100;
`;

const MisliTitleLine = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MisliTitle = styled.Text`
  color: #10316b;
  font-size: 16px;
  font-family: 'Poppins-Regular';
`;

const MisliContainer = styled.View`
  border-width: 2px;
  border-color: ${(props) => (props.checked ? '#fff' : '#10316b')};
  margin: 5px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.checked ? '#10316b' : '#fff')};
`;

const MisliInputContainer = styled.View`
  border-width: 2px;
  border-color: #10316b;
  border-radius: 10px;
  margin: 5px;
`;

const MisliText = styled.Text`
  color: ${(props) => (props.checked ? '#fff' : '#0b8457')};
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
`;

const SuccessText = styled.Text`
  color: #10316b;
  font-size: 20px;
  font-family: 'Poppins-SemiBold';
  padding-right: 30px;
  padding-left: 30px;
`;

const BasketScreen = () => {
  const {user} = useContext(AuthContext);
  const userDetails = useSelector((state) => state.matches.userDetails);
  const basket = useSelector((state) => state.matches.basket);
  const matches = useSelector((state) => state.matches.matches);
  const [modalVisible, setModalVisible] = useState(false);
  const [basketMatches, setBasketMatches] = useState([]);
  const [totalOdds, setTotalOdds] = useState(0);
  const [misli, setMisli] = useState('100');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let odds = 1;
    Object.keys(basket).map((matchId) => {
      let odd;
      const oddType = basket[matchId];
      const match = matches.find((match) => match._id === matchId);
      if (match) {
        odd = parseFloat(match.odds[oddType]);
      } else {
        odd = 1;
      }
      odds = odds * odd;
    });
    if (odds === 1) {
      setTotalOdds(0);
    } else {
      setTotalOdds(odds.toFixed(2));
    }
  }, [basket]);

  useEffect(() => {
    let basketMatches = Object.keys(basket).map((matchId) => {
      const oddType = basket[matchId];
      const match = matches.find((match) => match._id === matchId);
      return {
        id: matchId,
        home: match.home,
        away: match.away,
        date: match.date,
        oddType,
        oddString: renderOddType(oddType),
        odd: parseFloat(match.odds[oddType]),
      };
    });
    setBasketMatches(basketMatches);
  }, [basket, matches]);

  const renderOddType = (type) => {
    switch (type) {
      case 'ms-1':
        return 'Maç Sonucu 1';
      case 'ms-0':
        return 'Maç Sonucu X';
      case 'ms-2':
        return 'Maç Sonucu 2';
      case '2.5l':
        return 'Altı/Üstü 2.5 ALT';
      case '2.5h':
        return 'Altı/Üstü 2.5 ÜST';
      default:
        return '';
    }
  };

  const setBet = (bet) => {
    Vibration.vibrate(100);
    setMisli(bet);
  };

  const submitBet = () => {
    Vibration.vibrate(100);
    setError('');
    setLoading(true);
    if (userDetails.points >= parseInt(misli)) {
      const data = {
        basketMatches,
        basket,
        userId: user.uid,
        totalOdds: parseFloat(totalOdds).toFixed(2),
        misli: parseInt(misli),
        userPoints: parseInt(userDetails.points),
      };
      functions()
        .httpsCallable('submitBet')(data)
        .then((res) => {
          if (res.data.result === 'failure') {
            setError(res.data.message);
            setLoading(false);
          } else {
            dispatch(clearBasket());
            setLoading(false);
            setModalVisible(false);
            setSuccessVisible(true);
            Vibration.vibrate(100);
            setTimeout(function () {
              setSuccessVisible(false);
            }, 3000);
          }
        });
    } else {
      setError('Yeterli Sportist puanınız bulunmamaktadır.');
      setLoading(false);
    }
  };

  return (
    <>
      <View>
        <Modal
          backdropOpacity={0.4}
          onBackdropPress={() => setSuccessVisible(false)}
          isVisible={successVisible}>
          <View
            style={{
              backgroundColor: '#DEE1EC',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              alignSelf: 'center',
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <IconButton
              style={{marginBottom: -20, marginTop: -20}}
              icon="check-bold"
              size={80}
              color="#0B8457"
            />
            <SuccessText>Kuponunuz</SuccessText>
            <SuccessText>Başarıyla</SuccessText>
            <SuccessText>Oluşturuldu</SuccessText>
          </View>
        </Modal>
      </View>
      <TouchableNativeFeedback
        onPress={() => {
          setModalVisible(true);
        }}>
        <ButtonWrapper>
          <MatchCount>{Object.keys(basket).length} Maç</MatchCount>
          <OddCount>{totalOdds} Oran</OddCount>
        </ButtonWrapper>
      </TouchableNativeFeedback>
      <View style={styles.container}>
        <Modal
          backdropOpacity={0.4}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}>
          <View style={styles.content}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                opacity: 0.9,
              }}>
              <SmallButton></SmallButton>
            </View>
            <ScrollView>
              {basketMatches.length > 0 ? (
                basketMatches.map((match) => {
                  return (
                    <BetContainer key={match.id}>
                      <View style={{flexGrow: 1}}>
                        <BetLine>
                          <View style={{flex: 1}}>
                            <MatchName
                              adjustsFontSizeToFit={true}
                              numberOfLines={1}>
                              {match.home} - {match.away}
                            </MatchName>
                          </View>
                          <OddAmount>{match.odd.toFixed(2)}</OddAmount>
                        </BetLine>
                        <BetLine>
                          <OddType>{match.oddString}</OddType>
                          <DateText>
                            {moment(match.date).format('DD.MM HH:mm')}
                          </DateText>
                        </BetLine>
                      </View>
                      <IconButton
                        style={{marginLeft: 0, marginRight: 0}}
                        icon="close"
                        size={24}
                        color="#10316B"
                        onPress={() => {
                          Vibration.vibrate(100);
                          dispatch(removeFromBasket(match.id));
                        }}
                      />
                    </BetContainer>
                  );
                })
              ) : (
                <Text
                  style={{
                    paddingTop: 16,
                    paddingBottom: 16,
                    paddingLeft: 8,
                    fontSize: 18,
                    color: '#10316b',
                  }}>
                  Kuponunuzda maç bulunmamaktadır.
                </Text>
              )}
            </ScrollView>
            {loading ? <Loading /> : <View />}
            <TotalContainer>
              <MisliTitleLine>
                <MisliTitle>Kaç misli oynayacaksın?</MisliTitle>
              </MisliTitleLine>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <MisliInputContainer>
                  <TextInput
                    onChangeText={(text) => setBet(text)}
                    style={{
                      height: 45,
                      width: 60,
                      fontSize: 18,
                      paddingLeft: 10,
                      color: '#0b8457',
                    }}
                    placeholder="Özel"
                    placeholderTextColor="#0b8457"
                    keyboardType="number-pad"
                  />
                </MisliInputContainer>
                <TouchableNativeFeedback
                  onPress={() => {
                    setBet('100');
                  }}>
                  <MisliContainer checked={misli === '100'}>
                    <MisliText checked={misli === '100'}>100</MisliText>
                  </MisliContainer>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    setBet('200');
                  }}>
                  <MisliContainer checked={misli === '200'}>
                    <MisliText checked={misli === '200'}>200</MisliText>
                  </MisliContainer>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    setBet('500');
                  }}>
                  <MisliContainer checked={misli === '500'}>
                    <MisliText checked={misli === '500'}>500</MisliText>
                  </MisliContainer>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    setBet('1000');
                  }}>
                  <MisliContainer checked={misli === '1000'}>
                    <MisliText checked={misli === '1000'}>1000</MisliText>
                  </MisliContainer>
                </TouchableNativeFeedback>
              </View>
              <BetLine>
                <MatchName>Toplam Oran</MatchName>
                <OddAmount>{totalOdds}</OddAmount>
              </BetLine>
              <BetLine>
                <MatchName>Kupon Tutarı</MatchName>
                <OddAmount>{misli} Sportis Puanı</OddAmount>
              </BetLine>
              <BetLine>
                <MatchName>Toplam Kazanç</MatchName>
                <OddAmount>
                  {(totalOdds * parseInt(misli)).toFixed()} Sportis Puanı
                </OddAmount>
              </BetLine>
              {error !== '' ? (
                <BetLine>
                  <Text style={{color: 'red'}}>{error}</Text>
                </BetLine>
              ) : (
                <View></View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <TouchableNativeFeedback
                  onPress={() => {
                    dispatch(clearBasket());
                    Vibration.vibrate(100);
                  }}>
                  <EmptyBasketButton>
                    <EmptyBasketText>TEMİZLE</EmptyBasketText>
                  </EmptyBasketButton>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  disabled={Object.keys(basket).length === 0}
                  onPress={() => {
                    submitBet(basket.length);
                  }}>
                  <BetButton disabled={Object.keys(basket).length === 0}>
                    <BetText>HEMEN OYNA</BetText>
                  </BetButton>
                </TouchableNativeFeedback>
              </View>
            </TotalContainer>
          </View>
        </Modal>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#DEE1EC',
    paddingTop: 8,
    paddingBottom: 8,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    maxHeight: '60%',
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default BasketScreen;
