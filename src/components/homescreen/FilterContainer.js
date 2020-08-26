/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  FlatList,
  Vibration,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import styled from 'styled-components';

const SmallButton = styled.View`
  height: 5px;
  width: 80px;
  background-color: ${(props) => props.theme.colors.back};
  margin-top: -20px;
  border-radius: 15px;
`;

const FilterWrapper = styled.View`
  flex-direction: column;
  top: 0;
  padding: 20px;
  position: absolute;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  background-color: ${(props) => props.theme.colors.back};
  padding-top: 8px;
  padding-bottom: 6px;
  padding-right: 6px;
  padding-left: 6px;
  margin-bottom: 10px;
`;

const Line = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.back};
  background-color: ${(props) =>
    props.checked ? props.theme.colors.secondary : props.theme.colors.primary};
  margin-bottom: 8px;
`;

const LeaugeText = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 14px;
  font-family: 'Poppins-Medium';
  margin-bottom: -4px;
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

const FilterContainer = ({
  leauges,
  visible,
  setVisible,
  filter,
  filterClear,
  filterSubmit,
}) => {
  return (
    <View>
      <Modal
        backdropOpacity={0.4}
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
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
          <FilterWrapper
            style={{
              flexDirection: 'column',
              top: 0,
              padding: 20,
              position: 'absolute',
              flex: 1,
              height: '100%',
              width: '100%',
            }}>
            <Title>Lige Göre Filtrele</Title>

            {leauges ? (
              <FlatList
                data={Object.keys(leauges)}
                keyExtractor={(item) => item}
                renderItem={({item}) => {
                  return (
                    <TouchableNativeFeedback onPress={() => filter(item)}>
                      <Line checked={leauges[item]}>
                        <LeaugeText>{item}</LeaugeText>
                      </Line>
                    </TouchableNativeFeedback>
                  );
                }}
              />
            ) : (
              <View />
            )}
          </FilterWrapper>
          <TouchableNativeFeedback
            onPress={() => {
              filterClear();
              Vibration.vibrate(100);
            }}>
            <EmptyBasketButton>
              <EmptyBasketText>TEMİZLE</EmptyBasketText>
            </EmptyBasketButton>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              filterSubmit();
              Vibration.vibrate(100);
              setVisible(false);
            }}>
            <BetButton>
              <BetText>FİLTRELE</BetText>
            </BetButton>
          </TouchableNativeFeedback>
        </View>
      </Modal>
    </View>
  );
};

export default FilterContainer;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#10316B',
    paddingTop: 8,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    height: '60%',
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
