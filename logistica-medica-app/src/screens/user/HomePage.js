import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MedFlowLogo from "../../components/MedFlowLogo";
import info from '../../../assets/images/info.png'
import CustomCard from "../../components/CustomCard";
import Title from "../../components/Title";

const HomePage = () => {
  const navigation = useNavigation(); // Hook para acessar a navegação

  return (
    <View style={styles.container}>
      <View>
        <Title text={"Bem vindo"} color="#FFF" />
      </View>

      <MedFlowLogo />

      <View style={styles.bottomContainer}>
        <View>
          <Title text={"Nossos Serviços"} />

          <Text style={styles.subtitle}>
            {'Menos papel, mais controle e segurança. \nConheça nosso aplicativo MedFlow. \n'}
          </Text>

          <Text style={styles.text}>
            Gerenciar pedidos entre hospitais e laboratórios nunca foi
            tão fácil! Nosso aplicativo elimina o risco de erros e perdas,
            permitindo que você registre cada envio e recebimento de forma
            simples e rápida. Com notificações automáticas e rastreamento
            detalhado, sua equipe ganha mais tempo e eficiência. Experimente e
            veja a diferença!
          </Text>
        </View>

        <CustomCard 
            icon={info}
            text="Solicite Nossos Serviços"
            onPress={() => navigation.navigate("HomeChoice")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#119FDC",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
    gap: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
    paddingHorizontal: 16,
  },
});

export default HomePage;
