import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../navigation/AuthProvider';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import Loading from '../components/Loading';

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 20px;
`;

const ProfileWrapper = styled(LinearGradient)`
  flex-direction: column;
  border-width: 0.5px;
  border-color: ${(props) => props.theme.colors.back};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const ImageWrapper = styled.Image`
  height: 120px;
  width: 120px;
  align-self: center;
`;

const NameText = styled.Text`
  color: ${(props) => props.theme.colors.alternative};
  font-size: 20px;
  font-family: 'Poppins-SemiBoldItalic';
  margin-top: 10px;
`;

const Description = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-Medium';
`;

const PointText = styled.Text`
  color: ${(props) => props.theme.colors.alternative};
  font-size: 16px;
  font-family: 'Poppins-MediumItalic';
  margin-top: 20px;
`;

const ProfileButton = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.back};
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-top: 8px;
  padding-bottom: 5px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 18px;
  font-family: 'Poppins-Bold';
`;

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const userDetails = useSelector((state) => state.matches.userDetails);
  // İlk kayıttan sonra profiliniz yükleniyor, puanlarınız aktarılıyor yazısı

  return (
    <Container>
      {userDetails ? (
        <ScrollView>
          <ProfileWrapper colors={['#10316B', '#0B8457']}>
            <ImageWrapper
              source={{
                uri:
                  'https://res.cloudinary.com/drs642d4b/image/upload/v1598288147/avataaars_xfbb47.png',
              }}
            />
            <NameText>Emre Köylü</NameText>
            <Description>Bahis Sever</Description>
            <PointText>{userDetails.points} Sportist Puanınız var</PointText>
          </ProfileWrapper>
          <TouchableNativeFeedback onPress={() => navigation.navigate('Bets')}>
            <ProfileButton>
              <ButtonText>Kuponlarım</ButtonText>
            </ProfileButton>
          </TouchableNativeFeedback>
          <ProfileButton>
            <ButtonText>Liderlik Sıralaması</ButtonText>
          </ProfileButton>
          <ProfileButton>
            <ButtonText>Puan Satın Al</ButtonText>
          </ProfileButton>
          <ProfileButton>
            <ButtonText>Bilgilerini Güncelle</ButtonText>
          </ProfileButton>
          <TouchableNativeFeedback onPress={() => logout()}>
            <ProfileButton>
              <ButtonText>Çıkış Yap</ButtonText>
            </ProfileButton>
          </TouchableNativeFeedback>
          <ProfileButton>
            <ButtonText>Yardım</ButtonText>
          </ProfileButton>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
