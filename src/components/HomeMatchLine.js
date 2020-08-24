import React from 'react';
import {View, TouchableNativeFeedback, Text} from 'react-native';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {useSelector} from 'react-redux';

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

const HomeMatchLine = ({add, match}) => {
  const odd = useSelector((state) => state.matches.basket[match._id]);

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
        <DateText>{moment.unix(match.date).format('DD.MM HH:mm')}</DateText>
      </FirstLine>
      <SecondLine>
        <MatchText>{`${match.home} - ${match.away}`}</MatchText>
      </SecondLine>
      <ThirdLine>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableNativeFeedback onPress={() => add(match, 'ms-1')}>
            <OddContainer>
              <OddName>MS 1</OddName>
              <Odd checked={odd === 'ms-1'}>{match.odds['ms-1']}</Odd>
            </OddContainer>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => add(match, 'ms-0')}>
            <OddContainer>
              <OddName>MS X</OddName>
              <Odd checked={odd === 'ms-0'}>{match.odds['ms-0']}</Odd>
            </OddContainer>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => add(match, 'ms-2')}>
            <OddContainer>
              <OddName>MS 2</OddName>
              <Odd checked={odd === 'ms-2'}>{match.odds['ms-2']}</Odd>
            </OddContainer>
          </TouchableNativeFeedback>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableNativeFeedback onPress={() => add(match, '2.5l')}>
            <OddContainer>
              <OddName>2.5 Alt</OddName>
              <Odd checked={odd === '2.5l'}>{match.odds['2.5l']}</Odd>
            </OddContainer>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => add(match, '2.5h')}>
            <OddContainer>
              <OddName>2.5 Üst</OddName>
              <Odd checked={odd === '2.5h'}>{match.odds['2.5h']}</Odd>
            </OddContainer>
          </TouchableNativeFeedback>
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
