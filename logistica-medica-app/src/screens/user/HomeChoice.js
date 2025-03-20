import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MedFlowLogo from '../../components/MedFlowLogo';
import CustomButton from '../../components/CustomButton';

const HomeChoice = () => {
  const navigation = useNavigation(); // Hook para acessar a navegação

  return (
    <View style={styles.container}>
      
      <View style={styles.topContainer}>
        <MedFlowLogo />
      </View>

      <View style={styles.bottomContainer}>
        <CustomButton
          text="Criar Conta"
          textColor="#119FDC"
          backgroundColor="transparent"
          borderColor="#119FDC"
          borderWidth={2}
          onPress={() => navigation.navigate('SignUp')} 
        />
        
        <CustomButton
          text="Entrar"
          textColor="#119FDC"
          backgroundColor="transparent"
          borderColor="#119FDC"
          borderWidth={2}
          onPress={() => navigation.navigate('Login')} 
        />
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
    alignItems: 'center',
    paddingVertical: 20,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  }
});

export default HomeChoice;
