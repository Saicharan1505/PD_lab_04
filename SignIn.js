import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loadUserEmail = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setEmail(storedEmail); // Pre-fill email
      }
    } catch (error) {
      console.error("Failed to load email from local storage", error);
    }
  };

  useEffect(() => {
    loadUserEmail();
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('Home', { userEmail: email });
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});
