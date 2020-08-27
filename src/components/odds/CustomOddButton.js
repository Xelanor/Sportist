import React from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import styled from 'styled-components';

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

const SmallOddButton = ({oddName, oddCount, onPress}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <OddContainer>
        <OddName>{oddName}</OddName>
        <Odd>+{oddCount - 5}</Odd>
      </OddContainer>
    </TouchableNativeFeedback>
  );
};

export default SmallOddButton;
