import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function Home({ route, navigation }) {
  const { userEmail } = route.params;

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.navigate('LandingPage');
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      {/* Logout button at the top-right corner */}
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" color="#007AFF" onPress={handleLogout} />
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
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
  // Content area in the center
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
  // Logout button container with absolute positioning
  logoutButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 100, // Define width to control button size
  },
});
