/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  ScrollView,
  Vibration,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import functions from '@react-native-firebase/functions';
import {AuthContext} from '../navigation/AuthProvider';
import {clearBasket} from '../store/actions/match';

import Loading from '../components/Loading';
import BetLineContainer from '../components/basket-screen/BetLineContainer';
import PointsContainer from '../components/basket-screen/PointsContainer';
import CustomPointContainer from '../components/basket-screen/CustomPointContainer';
import BetSuccessModal from '../components/basket-screen/BetSuccessModal';

const ButtonWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 80px;
  background-color: ${(props) => props.theme.colors.secondary};
  margin-top: -20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.alternative};
`;

const SmallButton = styled.View`
  height: 5px;
  width: 80px;
  background-color: ${(props) => props.theme.colors.back};
  margin-top: -20px;
  border-radius: 15px;
`;

const MatchCount = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 14px;
  font-family: 'Poppins-SemiBold';
`;

const OddCount = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 10px;
  font-family: 'Poppins-SemiBold';
`;

const BetLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OddAmount = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 16px;
  font-family: 'Poppins-Medium';
`;

const TotalContainer = styled.View`
  border-top-width: 2px;
  border-color: ${(props) => props.theme.colors.secondary};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 8px;
  padding-right: 12px;
`;

const BetButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  padding-top: 6px;
  padding-right: 20px;
  padding-left: 20px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const BetText = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-SemiBoldItalic';
  color: ${(props) => props.theme.colors.alternative};
`;

const EmptyBasketButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  padding-top: 4px;
  padding-right: 20px;
  padding-left: 20px;
`;

const EmptyBasketText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Regular';
  color: ${(props) => props.theme.colors.alternative};
`;

const MisliTitleLine = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MisliTitle = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  font-family: 'Poppins-Regular';
`;

const SummaryTitle = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  font-family: 'Poppins-Medium';
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
      case 'kar-var':
        return 'Karşılıklı Gol Var';
      case 'kar-yok':
        return 'Karşılıklı Gol Yok';
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
      <BetSuccessModal
        setSuccessVisible={setSuccessVisible}
        successVisible={successVisible}
      />
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
              <SmallButton />
            </View>
            <ScrollView>
              {basketMatches.length > 0 ? (
                basketMatches.map((match) => {
                  return <BetLineContainer key={match.id} match={match} />;
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
                  marginBottom: 5,
                }}>
                <CustomPointContainer setBet={setBet} />
                <PointsContainer misli={misli} setBet={setBet} value="100" />
                <PointsContainer misli={misli} setBet={setBet} value="200" />
                <PointsContainer misli={misli} setBet={setBet} value="500" />
                <PointsContainer misli={misli} setBet={setBet} value="1000" />
              </View>
              <BetLine>
                <SummaryTitle>Toplam Oran</SummaryTitle>
                <OddAmount>{totalOdds}</OddAmount>
              </BetLine>
              <BetLine>
                <SummaryTitle>Kupon Tutarı</SummaryTitle>
                <OddAmount>{misli} Sportis Puanı</OddAmount>
              </BetLine>
              <BetLine>
                <SummaryTitle>Toplam Kazanç</SummaryTitle>
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
