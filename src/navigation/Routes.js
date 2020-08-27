import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import {setUserDetails} from '../store/actions/match';
import {AuthContext} from './AuthProvider';
import HomeStack from './HomeStack';
import Loading from '../components/Loading';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
    if (!user) {
      dispatch(setUserDetails(null));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot.data());
          dispatch(setUserDetails(querySnapshot.data()));
        });

      return () => unsubscribe();
    }
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
