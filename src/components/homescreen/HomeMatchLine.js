import React from 'react';
import {View, TouchableNativeFeedback, Text} from 'react-native';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {connect} from 'react-redux';

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
  color: ${(props) => props.theme.colors.back};
  background-color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`;

const Odd = styled.Text`
  color: ${(props) =>
    props.checked
      ? props.theme.colors.secondary
      : props.theme.colors.alternative};
  background-color: ${(props) =>
    props.checked
      ? props.theme.colors.alternative
      : props.theme.colors.secondary};
  font-size: 18px;
  font-family: 'Poppins-Bold';
  text-align: center;
  margin-top: -2px;
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
            <TouchableNativeFeedback
              onPress={() => this.props.add(this.props.match, 'ms-1')}>
              <OddContainer>
                <OddName>MS 1</OddName>
                <Odd checked={this.props.odd === 'ms-1'}>
                  {this.props.match.odds['ms-1']}
                </Odd>
              </OddContainer>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.add(this.props.match, 'ms-0')}>
              <OddContainer>
                <OddName>MS X</OddName>
                <Odd checked={this.props.odd === 'ms-0'}>
                  {this.props.match.odds['ms-0']}
                </Odd>
              </OddContainer>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.add(this.props.match, 'ms-2')}>
              <OddContainer>
                <OddName>MS 2</OddName>
                <Odd checked={this.props.odd === 'ms-2'}>
                  {this.props.match.odds['ms-2']}
                </Odd>
              </OddContainer>
            </TouchableNativeFeedback>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableNativeFeedback
              onPress={() => this.props.add(this.props.match, '2.5l')}>
              <OddContainer>
                <OddName>2.5 Alt</OddName>
                <Odd checked={this.props.odd === '2.5l'}>
                  {this.props.match.odds['2.5l']}
                </Odd>
              </OddContainer>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.add(this.props.match, '2.5h')}>
              <OddContainer>
                <OddName>2.5 Üst</OddName>
                <Odd checked={this.props.odd === '2.5h'}>
                  {this.props.match.odds['2.5h']}
                </Odd>
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
  }
}

const mapStateToProps = (state, ownProps) => ({
  odd: state.matches.basket[ownProps.match._id],
});

export default connect(mapStateToProps)(HomeMatchLine);
