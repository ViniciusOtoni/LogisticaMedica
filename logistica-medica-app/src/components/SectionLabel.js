import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const CustomSectionLabel = ({
  label,
  color = '#119FDC',
}) => {
  return (
    <View style={[styles.container, { borderColor: color }]} >
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 2,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  }
});

export default CustomSectionLabel;