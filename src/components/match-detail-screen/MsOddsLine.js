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

class MsOddsLine extends React.Component {
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
            <Title>Maç Sonucu</Title>
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
              oddName="MS 1"
              match={match}
              odd={match.odds['ms-1']}
              oddType="ms-1"
              addToBasket={add}
              basketOdd={odd}
            />
            <SmallOddButton
              oddName="MS X"
              match={match}
              odd={match.odds['ms-0']}
              oddType="ms-0"
              addToBasket={add}
              basketOdd={odd}
            />
            <SmallOddButton
              oddName="MS 2"
              match={match}
              odd={match.odds['ms-2']}
              oddType="ms-2"
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

export default connect(mapStateToProps)(MsOddsLine);
