import React, {useState} from 'react';
import {View, Text, FlatList, TouchableWithoutFeedback} from 'react-native';
import {IconButton} from 'react-native-paper';
import styled from 'styled-components';
import moment from 'moment';

import ActiveMatchLine from './ActiveMatchLine';

const Wrapper = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const FirstLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 5px;
  padding-left: 10px;
  align-items: center;
  border-bottom-width: 3px;
  border-color: ${(props) => props.theme.colors.back};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-Medium';
`;

const Date = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-MediumItalic';
  margin-right: 5px;
`;

const SecondLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MatchCount = styled.View`
  flex-direction: column;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.alternative};
  border-bottom-left-radius: 8px;
  justify-content: center;
  align-items: center;
  border-right-width: 2px;
  border-color: ${(props) => props.theme.colors.back};
`;

const MatchText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-family: 'Poppins-SemiBold';
`;

const OddSection = styled.View`
  flex-direction: column;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.alternative};
  justify-content: center;
  align-items: center;
`;

const SummarySection = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const SummaryFirst = styled.View`
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const SummarySecond = styled.View`
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const SummaryFirstText = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 14px;
  font-family: 'Poppins-SemiBold';
`;

const SummarySecondText = styled.Text`
  color: ${(props) => props.theme.colors.alternative};
  font-size: 14px;
  font-family: 'Poppins-SemiBold';
`;

const ActiveBetLine = ({bet}) => {
  const [detail, setDetail] = useState(false);

  return (
    <Wrapper>
      <TouchableWithoutFeedback onPress={() => setDetail(!detail)}>
        <FirstLine>
          <Title>Aktif</Title>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Date>{moment(bet.date).format('DD.MM.YY HH:mm')}</Date>
            <IconButton
              style={{margin: 0, marginBottom: 5}}
              icon={
                detail
                  ? 'chevron-up-circle-outline'
                  : 'chevron-down-circle-outline'
              }
              size={22}
              color="#EAC100"
            />
          </View>
        </FirstLine>
      </TouchableWithoutFeedback>
      {detail ? (
        <View style={{borderBottomWidth: 3, borderColor: '#DEE1EC'}}>
          <FlatList
            data={bet.basketMatches}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ActiveMatchLine match={item} />}
          />
        </View>
      ) : (
        <View />
      )}
      <TouchableWithoutFeedback onPress={() => setDetail(!detail)}>
        <SecondLine>
          <MatchCount>
            <MatchText>{bet.basketMatches.length}</MatchText>
            <MatchText>Maç</MatchText>
          </MatchCount>
          <OddSection>
            <MatchText>{bet.totalOdds}</MatchText>
            <MatchText>Oran</MatchText>
          </OddSection>
          <SummarySection>
            <SummaryFirst>
              <SummaryFirstText>Kupon Puan Bedeli</SummaryFirstText>
              <SummaryFirstText>{bet.misli}</SummaryFirstText>
            </SummaryFirst>
            <SummarySecond>
              <SummarySecondText>Beklenen Puan</SummarySecondText>
              <SummarySecondText>
                {parseInt(parseFloat(bet.totalOdds) * bet.misli)}
              </SummarySecondText>
            </SummarySecond>
          </SummarySection>
        </SecondLine>
      </TouchableWithoutFeedback>
    </Wrapper>
  );
};

export default ActiveBetLine;
