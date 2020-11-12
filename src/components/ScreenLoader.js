import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function ScreenLoader() {
  return (
    <View style={styles.rootView}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
