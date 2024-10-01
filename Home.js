import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ route, navigation }) {
  const { userEmail } = route.params;
  const [userName, setUserName] = useState('');

  // Animated value for welcome text opacity and color
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  // PanResponder for gesture handling
  const pan = useRef(new Animated.ValueXY()).current;
  const lastOffset = useRef({ x: 0, y: 0 }).current;

  // Load user name from AsyncStorage
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

  // Run the fade-in animation for the welcome text on component mount
  useEffect(() => {
    loadUserName();
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 5000, // 5-second fade-in
      useNativeDriver: false, // We set this to false to support color interpolation
    }).start();
  }, []);

  // Interpolating animated value to change color over time
  const animatedColor = animatedOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ff0000', '#00ff00'], // From red to green
  });

  // PanResponder for the draggable object
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false, // Set to false since 'left' and 'top' are not supported by native driver
      }),
      onPanResponderRelease: () => {
        lastOffset.x += pan.x._value;
        lastOffset.y += pan.y._value;
        pan.extractOffset(); // This will set the new offset value where the user leaves the object
      }
    })
  ).current;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('LandingPage');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" color="#007AFF" onPress={handleLogout} />
      </View>

      <View style={styles.content}>
        {/* Animated Text */}
        <Animated.Text style={[styles.welcomeText, { opacity: animatedOpacity, color: animatedColor }]}>
          Welcome, {userName}!
        </Animated.Text>
        <Text style={styles.emailText}>You are signed in as: {userEmail}</Text>

        {/* Gesture Object */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout(), styles.gestureObject]}>
          <Text style={styles.gestureText}>Drag Me!</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 18,
    color: '#666'
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 100
  },
  gestureObject: {
    width: 100,
    height: 100,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30
  },
  gestureText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
