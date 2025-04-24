import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MedFlowLogo from '../../components/MedFlowLogo';
import CustomButton from '../../components/CustomButton';

const HomeChoice = () => {
  const navigation = useNavigation();

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
        <TouchableOpacity
          style={styles.admin}
          onPress={() => navigation.navigate('LoginAdmin')}
        >
          <Text style={styles.textAdmin}>
            Entrar como Admin
          </Text>
        </TouchableOpacity>
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
  },
  admin: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  textAdmin: {
    color: '#119FDC',
    textDecorationLine: 'underline'
  },
});

export default HomeChoice;
