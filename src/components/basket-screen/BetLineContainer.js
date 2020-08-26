import React from 'react';
import {View, Vibration} from 'react-native';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import {removeFromBasket} from '../../store/actions/match';

const BetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.primary};
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
  color: ${(props) => props.theme.colors.primary};
  font-size: 18px;
  font-family: 'Poppins-Medium';
`;

const OddType = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-family: 'Poppins-Regular';
`;

const OddAmount = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 16px;
  font-family: 'Poppins-Medium';
`;

const DateText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-family: 'Poppins-RegularItalic';
`;

const BetLineContainer = ({match}) => {
  const dispatch = useDispatch();

  return (
    <BetContainer>
      <View style={{flexGrow: 1}}>
        <BetLine>
          <View style={{flex: 1}}>
            <MatchName adjustsFontSizeToFit={true} numberOfLines={1}>
              {match.home} - {match.away}
            </MatchName>
          </View>
          <OddAmount>{match.odd.toFixed(2)}</OddAmount>
        </BetLine>
        <BetLine>
          <OddType>{match.oddString}</OddType>
          <DateText>{moment(match.date).format('DD.MM HH:mm')}</DateText>
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
};

export default BetLineContainer;
