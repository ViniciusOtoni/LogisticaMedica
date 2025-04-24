import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderTitle from '../../components/HeaderTitle';
import logo from '../../../assets/images/home-icon.png';
import edit from '../../../assets/images/edit.png';
import info from '../../../assets/images/info.png';
import CustomCard from '../../components/CustomCard';

import { useAuth } from '../../utils/contexts/AuthContext.js';

const MainScreen = () => {
  const navigation = useNavigation();
  const { user, loading } = useAuth();


  useEffect(() => {
    if (!loading && !user) {
      navigation.replace('LoginScreen');
    }
  }, [loading, user]);


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <HeaderTitle icon={logo} text="Tela Principal" color="#FFF" />
      </View>

      <View style={styles.bottomContainer}>
        <CustomCard
          icon={edit}
          text="Criar Pedido"
          onPress={() => navigation.navigate('NewOrder', { user })}
        />
        <CustomCard
          icon={info}
          text="Monitorar Pedidos"
          onPress={() => navigation.navigate('ListOrders', { user })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#119FDC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#119FDC',
  },
  topContainer: {
    marginTop: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },
});

export default MainScreen;
