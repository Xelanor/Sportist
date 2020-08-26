/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton} from 'react-native-paper';
import styled from 'styled-components';

const SuccessText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 20px;
  font-family: 'Poppins-SemiBold';
  padding-right: 30px;
  padding-left: 30px;
`;

const BetSuccessModal = ({setSuccessVisible, successVisible}) => {
  return (
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
  );
};

export default BetSuccessModal;
