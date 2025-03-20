import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const MedFlowLogo = () => {
  return (
    <View style={styles.container}>
      <Image
         source={require('../../assets/images/Logo.png')}
         style={styles.logo}
      />
      <Text style={styles.textLogo}>Med Flow</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  textLogo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MedFlowLogo;
