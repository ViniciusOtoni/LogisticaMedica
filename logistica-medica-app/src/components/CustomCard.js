import React from 'react';
import { TouchableOpacity,  StyleSheet} from 'react-native';
import HeaderTitle from './HeaderTitle';

const CustomCard = ({
  text,
  onPress,
  borderColor = '#119FDC',                
  borderWidth = 2,
  icon              
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
      <HeaderTitle icon={icon} text={text}> </HeaderTitle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "flex-start"
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default CustomCard;
