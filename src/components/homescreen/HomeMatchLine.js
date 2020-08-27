import React from 'react';
import {View, TouchableNativeFeedback, Text} from 'react-native';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {connect} from 'react-redux';

import SmallOddButton from '../odds/SmallOddButton';
import CustomOddButton from '../odds/CustomOddButton';

const Container = styled.View`
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
`;

const FirstLine = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary};
  padding-right: 5px;
  padding-left: 5px;
`;

const FirstTitle = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-family: 'Poppins-Medium';
`;

const DateText = styled.Text`
  color: ${(props) => props.theme.colors.alternative};
  font-family: 'Poppins-SemiBold';
`;

const SecondLine = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 1px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${(props) => props.theme.colors.alternative};
`;

const MatchText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  font-family: 'Poppins-SemiBold';
`;

const ThirdLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.back};
  padding-right: 5px;
  padding-left: 5px;
`;

class HomeMatchLine extends React.Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.odd !== this.props.odd) {
      return true;
    }
    return false;
  };

  render() {
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
            <FirstTitle>{this.props.match.leauge}</FirstTitle>
          </View>
          <DateText>
            {moment(this.props.match.date).format('DD.MM HH:mm')}
          </DateText>
        </FirstLine>
        <SecondLine>
          <MatchText>{`${this.props.match.home} - ${this.props.match.away}`}</MatchText>
        </SecondLine>
        <ThirdLine>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SmallOddButton
              oddName="MS 1"
              match={this.props.match}
              odd={this.props.match.odds['ms-1']}
              oddType="ms-1"
              addToBasket={this.props.add}
              basketOdd={this.props.odd}
            />
            <SmallOddButton
              oddName="MS X"
              match={this.props.match}
              odd={this.props.match.odds['ms-0']}
              oddType="ms-0"
              addToBasket={this.props.add}
              basketOdd={this.props.odd}
            />
            <SmallOddButton
              oddName="MS 2"
              match={this.props.match}
              odd={this.props.match.odds['ms-2']}
              oddType="ms-2"
              addToBasket={this.props.add}
              basketOdd={this.props.odd}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SmallOddButton
              oddName="2.5 Alt"
              match={this.props.match}
              odd={this.props.match.odds['2.5l']}
              oddType="2.5l"
              addToBasket={this.props.add}
              basketOdd={this.props.odd}
            />
            <SmallOddButton
              oddName="2.5 Üst"
              match={this.props.match}
              odd={this.props.match.odds['2.5h']}
              oddType="2.5h"
              addToBasket={this.props.add}
              basketOdd={this.props.odd}
            />
          </View>
          <CustomOddButton
            oddName="Diğer"
            oddCount="+27"
            onPress={() =>
              this.props.navigation.navigate('MatchDetail', {
                match: this.props.match,
              })
            }
          />
        </ThirdLine>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  odd: state.matches.basket[ownProps.match._id],
});

export default connect(mapStateToProps)(HomeMatchLine);
