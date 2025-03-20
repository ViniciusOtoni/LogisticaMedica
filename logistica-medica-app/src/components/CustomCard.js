import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const CustomCard = ({
  text,
  onPress,
  backgroundColor = '#FFF',
  borderColor = '#119FDC',       
  textColor = '#000',          
  borderWidth = 2,
  icon              
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ]}
      onPress={onPress}
    > 
      {icon && <Image source={icon} style={styles.icon} resizeMode='contain' />}
      <Text style={[styles.cardText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 200,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  cardText: {
    fontSize: 20,
  },
});

export default CustomCard;
