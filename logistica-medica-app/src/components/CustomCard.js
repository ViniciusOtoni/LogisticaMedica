import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import HeaderTitle from './HeaderTitle';

const CustomCard = ({
  text,
  onPress,
  borderColor = '#119FDC',
  borderWidth = 2,
  icon,
  children //componentes "extras"
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor,
          borderWidth,
        },
      ]}
      {...(onPress && { onPress })}
    >
      <View style={{ flex: 1, width: '100%' }}>
        <HeaderTitle icon={icon} text={text} />
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column', // Coloca os filhos em coluna
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'flex-start',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default CustomCard;
