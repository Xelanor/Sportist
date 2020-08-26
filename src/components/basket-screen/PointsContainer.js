import React from 'react';
import {TouchableNativeFeedback} from 'react-native';
import styled from 'styled-components';

const MisliContainer = styled.View`
  border-width: 2px;
  border-color: ${(props) =>
    props.checked ? '#fff' : props.theme.colors.primary};
  margin: 5px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.checked ? props.theme.colors.primary : '#fff'};
`;

const MisliText = styled.Text`
  color: ${(props) => (props.checked ? '#fff' : props.theme.colors.secondary)};
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
`;

const PointsContainer = ({misli, setBet, value}) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        setBet(value);
      }}>
      <MisliContainer checked={misli === value}>
        <MisliText checked={misli === value}>{value}</MisliText>
      </MisliContainer>
    </TouchableNativeFeedback>
  );
};

export default PointsContainer;
