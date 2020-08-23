import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '379355168812-nkmkj5u47cjofgr0hdus8d5ficftedsk.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      scopes: ['email'],
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      login(info.idToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('3');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sportist'e Hoşgeldin</Text>
      <View>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#000',
    fontSize: 24,
    marginBottom: 20,
  },
});
