import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {setUserDetails} from '../store/actions/match';
import {AuthContext} from './AuthProvider';
import HomeStack from './HomeStack';
import Loading from '../components/Loading';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const socket = useSelector((state) => state.matches.socket);

  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .post(`http://10.0.2.2:5000/api/user/user/${user.uid}`)
        .then((userDetails) => {
          dispatch(setUserDetails(userDetails.data));
          socket.emit('join', {id: user.uid});
        })
        .catch((err) => console.log(err));

      socket.on('user_update', ({user}) => {
        dispatch(setUserDetails(user));
      });
    } else {
      dispatch(setUserDetails(null));
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
