import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ route, navigation }) {
  const { userEmail } = route.params;
  const [userName, setUserName] = useState('');

  const loadUserName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    } catch (error) {
      console.error("Failed to load user name from local storage", error);
    }
  };

  useEffect(() => {
    loadUserName();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.navigate('LandingPage');
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" color="#007AFF" onPress={handleLogout} />
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <Text style={styles.emailText}>You are signed in as: {userEmail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emailText: {
    fontSize: 18,
    color: '#666',
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 40, // Fixed the missing value
    right: 20,
    width: 100, // Define width to control button size
  },
});
