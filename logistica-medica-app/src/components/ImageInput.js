import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Feather';

const SERVER_URL = 'http://192.168.0.54:3000';

function resolveUri(uri) {
  if (!uri) return null;
  if (uri.startsWith('http') || uri.startsWith('file://')) {
    return uri;
  }
  const cleanPath = uri
    .replace(/^\.\//, '')
    .replace(/\\/g, '/');      
  return `${SERVER_URL}/${cleanPath}`;
}


const ImageInput = ({ initialImageUri = null, onImageSelected }) => {
  const [imageUri, setImageUri] = useState(resolveUri(initialImageUri));

  useEffect(() => {
    const resolved = resolveUri(initialImageUri);
    setImageUri(resolved);
  }, [initialImageUri]);  
  

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão', 'Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      setImageUri(localUri);
      onImageSelected?.(localUri);
    }
  };

  return (
    <TouchableOpacity onPress={handleSelectImage} style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Icon name="image" size={30} color="#888" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#999',
    overflow: 'hidden',
    backgroundColor: '#f0f6f9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageInput;