import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import styled from 'styled-components';
import {connect} from 'react-redux';

import SmallOddButton from '../odds/SmallOddButton';

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
  padding-bottom: 3px;
  padding-top: 6px;
  align-items: center;
  border-bottom-width: 3px;
  border-color: ${(props) => props.theme.colors.back};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-Medium';
`;

const SecondLine = styled.View`
  background-color: ${(props) => props.theme.colors.back};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const BetweenContainer = styled.View`
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  padding-top: 3px;
  padding-bottom: 0;
  padding-right: 10px;
  padding-left: 10px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.alternative};
`;

const BetweenName = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 16px;
  font-family: 'Poppins-Bold';
  text-align: center;
`;

class AltUstOddsLine extends React.Component {
  state = {
    detail: true,
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.odd !== this.props.odd) {
      return true;
    }
    if (nextState.detail !== this.state.detail) {
      return true;
    }
    return false;
  };

  render() {
    const {detail} = this.state;
    const {match, odd, add} = this.props;
    return (
      <Wrapper>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({detail: !detail});
          }}>
          <FirstLine>
            <Title>Alt / Üst</Title>
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
          </FirstLine>
        </TouchableWithoutFeedback>
        {detail ? (
          <SecondLine>
            <SmallOddButton
              oddName="Alt"
              match={match}
              odd={match.odds['2-5l']}
              oddType="2-5l"
              addToBasket={add}
              basketOdd={odd}
            />
            <BetweenContainer>
              <BetweenName>2,5</BetweenName>
            </BetweenContainer>
            <SmallOddButton
              oddName="Üst"
              match={match}
              odd={match.odds['2-5h']}
              oddType="2-5h"
              addToBasket={add}
              basketOdd={odd}
            />
          </SecondLine>
        ) : (
          <View />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  odd: state.matches.basket[ownProps.match._id],
});

export default connect(mapStateToProps)(AltUstOddsLine);
