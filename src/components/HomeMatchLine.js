import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import moment from 'moment';

const Container = styled.View`
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
`;

const FirstLine = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #10316b;
  padding-right: 5px;
  padding-left: 5px;
`;

const FirstTitle = styled.Text`
  color: #dee1ec;
  font-family: 'Poppins-Medium';
`;

const DateText = styled.Text`
  color: #eac100;
  font-family: 'Poppins-SemiBold';
`;

const SecondLine = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 1px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: #eac100;
`;

const MatchText = styled.Text`
  color: #10316b;
  font-size: 16px;
  font-family: 'Poppins-SemiBold';
`;

const ThirdLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #dee1ec;
  padding-right: 5px;
  padding-left: 5px;
`;

const OddContainer = styled.View`
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 3px;
  margin-left: 3px;
  width: 50px;
`;

const OddName = styled.Text`
  color: #dee1ec;
  background-color: #10316b;
  font-size: 14px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`;

const Odd = styled.Text`
  color: ${(props) => (props.checked ? '#0b8457' : '#eac100')};
  background-color: ${(props) => (props.checked ? '#eac100' : '#0b8457')};
  font-size: 18px;
  font-family: 'Poppins-Bold';
  text-align: center;
  margin-top: -2px;
`;

const HomeMatchLine = ({match}) => {
  return (
    <Container>
      <FirstLine>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            style={{margin: 0, marginBottom: 1}}
            icon="soccer"
            size={18}
            color="#dee1ec"
          />
          <FirstTitle>{match.leauge}</FirstTitle>
        </View>
        <DateText>
          {moment.unix(match.date).add(3, 'hours').format('DD.MM HH:mm')}
        </DateText>
      </FirstLine>
      <SecondLine>
        <MatchText>{`${match.home} - ${match.away}`}</MatchText>
      </SecondLine>
      <ThirdLine>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <OddContainer>
            <OddName>MS 1</OddName>
            <Odd>{match.odds['ms-1']}</Odd>
          </OddContainer>
          <OddContainer>
            <OddName>MS X</OddName>
            <Odd checked>{match.odds['ms-0']}</Odd>
          </OddContainer>
          <OddContainer>
            <OddName>MS 2</OddName>
            <Odd>{match.odds['ms-2']}</Odd>
          </OddContainer>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <OddContainer>
            <OddName>2.5 Alt</OddName>
            <Odd>{match.odds['2.5l']}</Odd>
          </OddContainer>
          <OddContainer>
            <OddName>2.5 Üst</OddName>
            <Odd>{match.odds['2.5h']}</Odd>
          </OddContainer>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <OddContainer>
            <OddName>Diğer</OddName>
            <Odd>+27</Odd>
          </OddContainer>
        </View>
      </ThirdLine>
    </Container>
  );
};

export default HomeMatchLine;
