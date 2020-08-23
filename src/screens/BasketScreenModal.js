import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';

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

const BasketScreen = () => {
  const basket = useSelector((state) => state.matches.basket);
  const matches = useSelector((state) => state.matches.matches);
  const [modalVisible, setModalVisible] = useState(false);

  const getTotalOdds = () => {
    let odds = 1;
    Object.keys(basket).map((matchId) => {
      const oddType = basket[matchId];
      const match = matches.find((match) => match._id === matchId);
      const odd = parseFloat(match.odds[oddType]);
      odds = odds * odd;
    });
    if (odds === 1) {
      return 0;
    } else {
      return odds.toFixed(2);
    }
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={() => {
          setModalVisible(true);
        }}>
        <ButtonWrapper>
          <MatchCount>{Object.keys(basket).length} Maç</MatchCount>
          <OddCount>{getTotalOdds()} Oran</OddCount>
        </ButtonWrapper>
      </TouchableNativeFeedback>
      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Deneme</Text>
            <Text style={styles.contentTitle}>Deneme</Text>
            <Text style={styles.contentTitle}>Deneme</Text>
            <Text style={styles.contentTitle}>Deneme</Text>
            <Text style={styles.contentTitle}>Deneme</Text>
            <Text style={styles.contentTitle}>Deneme</Text>
            <Text style={styles.contentTitle}>Deneme</Text>
            <Text style={styles.contentTitle}>Deneme</Text>
          </View>
        </Modal>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  buttonStyle: {
    height: 120,
    width: 90,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

export default BasketScreen;
