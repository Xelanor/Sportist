import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const userDetails = useSelector((state) => state.matches.userDetails);

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20, fontSize: 20}}>{user.email}</Text>
      <Text style={{marginBottom: 20, fontSize: 24}}>
        Puan: {userDetails.points}
      </Text>
      <Button onPress={() => logout()} title="Çıkış Yap" />
    </View>
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
