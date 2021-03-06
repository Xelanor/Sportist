import React from 'react';
import {View, Text, Vibration, ScrollView} from 'react-native';
import {IconButton} from 'react-native-paper';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

import {addToBasket} from '../../store/actions/match';
import MsOddsLine from './MsOddsLine';
import AltUstOddsLine from './AltUstOddsLine';
import KarOddsLine from './KarOddsLine';

const Wrapper = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  flex: 1;
`;

const Container = styled.View`
  padding: 10px;
`;

const OddsContainer = ({match}) => {
  const dispatch = useDispatch();

  const addMatchToBasket = (match, odd) => {
    Vibration.vibrate(100);
    dispatch(addToBasket(match, odd));
  };

  return (
    <Wrapper>
      <ScrollView>
        <Container>
          <MsOddsLine match={match} add={addMatchToBasket} />
          <AltUstOddsLine match={match} add={addMatchToBasket} />
          <KarOddsLine match={match} add={addMatchToBasket} />
        </Container>
      </ScrollView>
    </Wrapper>
  );
};

export default OddsContainer;
