import React, { useState } from "react";
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import MedFlowLogo from "../../components/MedFlowLogo";
import Title from "../../components/Title";
import LabeledInput from "../../components/LabeledInput";
import CustomButton from "../../components/CustomButton";
import { createAdmin } from '../../utils/services/admin/adminServices';

const SignUpAdmin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignUpAdmin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Por favor preencher todos os campos");
      return;
    };

    const result = await createAdmin(email, senha);

    if (result.success) {
      Alert.alert("Parabéns", "Usuário criado com sucesso!", [
        { text: "Ok", onPress: () => navigation.navigate("LoginAdmin") }
      ]);
    } else {
      Alert.alert("Atenção", result.message || "Erro ao criar conta");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <MedFlowLogo />
      </View>

      <View style={styles.bottomContainer}>
        <Title text={"Olá, Admin\nCadastre-se"} color="#119FDC" />
        
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

        <CustomButton text="Criar Conta" color="#119FDC" onPress={handleSignUpAdmin} />
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

export default SignUpAdmin;