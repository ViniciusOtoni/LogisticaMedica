import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({
  text,
  onPress,
  backgroundColor = '#119FDC',  // Cor de fundo padrão
  borderColor = '#119FDC',        // Cor da borda padrão
  textColor = '#FFFFFF',          // Cor do texto padrão
  borderWidth = 0                 // Largura da borda padrão
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default CustomButton;
