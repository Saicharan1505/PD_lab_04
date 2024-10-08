import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to request permission and pick an image from the library
  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      // Show an alert if permission is denied
      Alert.alert('Permission to access the media library is required!');
      return;
    }

    // Launch image picker from the media library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true, // Allow editing the image (crop, resize)
      aspect: [4, 3], // Aspect ratio of the cropping
      quality: 1, // High-quality image selection
    });

    // If the user successfully picks an image, update the state
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Set the image URI from result
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to pick an image */}
      <Button title="Pick an Image" onPress={pickImage} />

      {/* If an image is selected, display it */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
    resizeMode: 'cover', // Ensures the image covers the container while maintaining aspect ratio
  },
});
