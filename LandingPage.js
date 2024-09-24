import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
      <View style={styles.buttonSpacing} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonSpacing: {
    marginTop: 20,
  },
});
