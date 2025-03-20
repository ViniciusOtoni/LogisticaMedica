import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderTitle from '../../components/HeaderTitle';
import logo from '../../../assets/images/home-icon.png';

const MainScreen = () => {
  //const navigation = useNavigation(); // Hook para acessar a navegação

  return (
    <View style={styles.container}>

      <View style={styles.topContainer}>
        <HeaderTitle icon={logo} text={'Tela Principal'} color='#FFF'/>
      </View>

      <View style={styles.bottomContainer}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#119FDC',
  },
  topContainer: {
    marginTop: 16,
    alignItems: 'left',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  }
});

export default MainScreen;
