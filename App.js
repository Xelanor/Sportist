import React, {useEffect} from 'react';
import Providers from './src/navigation';
import {ThemeProvider} from 'styled-components';
import SplashScreen from 'react-native-splash-screen';

const theme = {
  colors: {
    primary: '#10316B',
    secondary: '#0B8457',
    alternative: '#EAC100',
    back: '#DEE1EC',
  },
};

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Providers />
    </ThemeProvider>
  );
}
