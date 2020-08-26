import React from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components';

const MisliInputContainer = styled.View`
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  margin: 5px;
`;

const TextInputStyle = styled.TextInput`
  height: 45px;
  width: 60px;
  font-size: 18px;
  padding-left: 10px;
  color: ${(props) => props.theme.colors.secondary};
`;

const CustomPointContainer = ({setBet}) => {
  return (
    <MisliInputContainer>
      <TextInputStyle
        onChangeText={(text) => setBet(text)}
        placeholder="Özel"
        placeholderTextColor="#0b8457"
        keyboardType="number-pad"
      />
    </MisliInputContainer>
  );
};

export default CustomPointContainer;
