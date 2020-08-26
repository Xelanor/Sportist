import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components';
import Loading from '../Loading';

import ActiveBetLine from './ActiveBetLine';

const Wrapper = styled.SafeAreaView`
  background-color: #4f4f4f;
  flex: 1;
`;

const Container = styled.View`
  background-color: #4f4f4f;
  flex: 1;
  padding: 5px;
`;

const ActiveBets = ({bets}) => {
  return (
    <Wrapper>
      <Container>
        {bets ? (
          <FlatList
            data={bets}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => <ActiveBetLine bet={item} />}
          />
        ) : (
          <Loading />
        )}
      </Container>
    </Wrapper>
  );
};

export default ActiveBets;
