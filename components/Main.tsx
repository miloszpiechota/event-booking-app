import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Main() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Main Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});