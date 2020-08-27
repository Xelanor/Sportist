import React, {useEffect} from 'react';
import {StatusBar, View, Text, TouchableNativeFeedback} from 'react-native';
import Providers from './src/navigation';
import {ThemeProvider} from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import {useNetInfo} from '@react-native-community/netinfo';
import styled from 'styled-components';
import {IconButton} from 'react-native-paper';

const Wrapper = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 24px;
  font-family: 'Poppins-Medium';
  text-align: center;
  margin-bottom: 10px;
`;

const BetButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  padding-top: 6px;
  padding-right: 20px;
  padding-left: 20px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const BetText = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-SemiBold';
  color: ${(props) => props.theme.colors.alternative};
`;

const theme = {
  colors: {
    primary: '#10316B',
    secondary: '#0B8457',
    alternative: '#EAC100',
    back: '#DEE1EC',
  },
};

export default function App() {
  const netInfo = useNetInfo();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {netInfo.isConnected ? (
        <Providers />
      ) : (
        <Wrapper>
          <StatusBar barStyle="light-content" backgroundColor="#10316B" />
          <IconButton
            style={{margin: 0, marginBottom: 5}}
            icon="wifi-off"
            size={70}
            color="#fff"
          />
          <Title>Lütfen internet bağlantınızı kontrol edin.</Title>
          <TouchableNativeFeedback
            onPress={() => {
              console.log('Connection type', netInfo.type);
              console.log('Is connected?', netInfo.isConnected.toString());
            }}>
            <BetButton>
              <BetText>Tekrar Dene</BetText>
            </BetButton>
          </TouchableNativeFeedback>
        </Wrapper>
      )}
    </ThemeProvider>
  );
}
