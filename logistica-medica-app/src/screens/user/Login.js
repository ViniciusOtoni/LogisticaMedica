import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MedFlowLogo from '../../components/MedFlowLogo';
import Title from '../../components/Title';
import LabeledInput from '../../components/LabeledInput';
import CustomButton from '../../components/CustomButton';
import { loginUser } from '../../utils/services/user/userService';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, senha);
      navigation.navigate('MainScreen', { user });
    } catch (error) {
      Alert.alert('Erro ao logar.', error.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.topContainer}>
        <MedFlowLogo />
      </View>

      <View style={styles.bottomContainer}>
        <Title text={"Bem-vindo de\nvolta"} color="#119FDC" />
        
        <LabeledInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          textColor="#119FDC"
          borderColor="#119FDC"
        />
        <LabeledInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          textColor="#119FDC"
          borderColor="#119FDC"
          secureTextEntry
        />

        
        <CustomButton text="Entrar" color="#119FDC" onPress={handleLogin} />
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
});

export default LoginScreen;
