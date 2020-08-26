import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components';
import Loading from '../Loading';

import CompletedBetLine from './CompletedBetLine';

const Wrapper = styled.SafeAreaView`
  background-color: #4f4f4f;
  flex: 1;
`;

const Container = styled.View`
  background-color: #4f4f4f;
  flex: 1;
  padding: 5px;
`;

const CompletedBets = ({bets}) => {
  return (
    <Wrapper>
      <Container>
        {bets ? (
          <FlatList
            data={bets}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => <CompletedBetLine bet={item} />}
          />
        ) : (
          <Loading />
        )}
      </Container>
    </Wrapper>
  );
};

export default CompletedBets;
