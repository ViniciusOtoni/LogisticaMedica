import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = ({ text, color = 'black' }) => {
  return <Text style={[styles.title, { color }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Title;
