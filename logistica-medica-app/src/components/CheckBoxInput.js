import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LabeledCheckbox = ({
  label,
  checked,
  onChange,
  textColor = '#000000',
  borderColor = '#000000'
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: borderColor, backgroundColor: checked ? borderColor : 'transparent' }
        ]}
        onPress={() => onChange(!checked)}
      />
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12, // define um círculo
    borderWidth: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default LabeledCheckbox;
