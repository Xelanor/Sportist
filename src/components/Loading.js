import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default function Loading({color}) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={color ? color : '#0B8457'} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
