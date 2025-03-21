import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderTitle from './HeaderTitle';

const CustomCard = ({
  text,
  onPress,
  borderColor = '#119FDC',
  borderWidth = 2,
  icon,
  children
}) => {
  // Se onPress existir, usa TouchableOpacity; caso contrário, usa View.
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[
        styles.container,
        { borderColor, borderWidth }
      ]}
      {...(onPress ? { onPress, activeOpacity: 0.7 } : {})}
    >
      <View style={{ width: '100%' }}>
        <HeaderTitle icon={icon} text={text} />
        {children}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'flex-start',
  }
});

export default CustomCard;
