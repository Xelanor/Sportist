import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

const BetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 8px;
  padding-right: 8px;
`;

const BetLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MatchName = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 14px;
  font-family: 'Poppins-Medium';
`;

const OddType = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 12px;
  font-family: 'Poppins-Regular';
`;

const OddAmount = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 16px;
  font-family: 'Poppins-Medium';
`;

const DateText = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 12px;
  font-family: 'Poppins-RegularItalic';
`;

const ActiveMatchLine = ({match}) => {
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
    </BetContainer>
  );
};

export default ActiveMatchLine;
