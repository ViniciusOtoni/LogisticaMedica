import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HeaderTitle = ({ text, color = 'black', icon }) => {
  return (
    <View style={styles.container}>
      {icon && <Image source={icon} style={styles.icon} resizeMode='contain' />}
      <Text style={[styles.title, { color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default HeaderTitle;
