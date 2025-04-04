import React from "react";
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import HeaderTitle from "../../components/HeaderTitle";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CustomSectionLabel from "../../components/SectionLabel";
import analysing from "../../../assets/images/analyse.png";
import LabeledInput from "../../components/LabeledInput";

const ListOrders = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <HeaderTitle icon={analysing} text={"Monitoramento"} color="#FFF" />
        </View>

        <View style={styles.bottomContainer}>
          <View>
            <LabeledInput placeholder={"Pesquisar"} />
          </View>

          <CustomButton
            text="Gerar Relatório"
            textColor="#119FDC"
            backgroundColor="transparent"
            borderColor="#119FDC"
            borderWidth={2}
            onPress={() => navigation.navigate("")}
          />

          <CustomSectionLabel label={"Pendente"} color="#DC1111" />

          <CustomCard
            text={"Previsão de Entrega: 19/12/1997"}
            borderColor="#DC1111"
            onPress={() => navigation.navigate('OrderDetails')}
          >
            <View style={[styles.row, styles.padding]}>
              <View>
                <Text style={styles.bold}> Laboratório 01 → </Text>
              </View>
              <View>
                <Text style={styles.bold}> Laboratório 15 </Text>
              </View>
            </View>

            <View style={styles.padding}>
              <Text> Destinatário: </Text>
            </View>
            <View style={styles.padding}>
              <Text> Laboratório 15 </Text>
            </View>
            <View style={styles.padding}>
              <Text> Endereço: Rua XXX nº 10 - São Paulo, SP </Text>
            </View>
            <View style={styles.padding}>
              <Text> CEP: 00000-000 </Text>
            </View>
          </CustomCard>

          <CustomSectionLabel label={"Concluído"} color="#11DC18" />

          <CustomCard
            text={"Previsão de Entrega: 20/03/2025"}
            borderColor="#11DC18"
            onPress={() => navigation.navigate('OrderDetails')}
          >
            <View style={[styles.row, styles.padding]}>
              <View>
                <Text style={styles.bold}> Laboratório 01 → </Text>
              </View>
              <View>
                <Text style={styles.bold}> Laboratório 15 </Text>
              </View>
            </View>

            <View style={styles.padding}>
              <Text> Destinatário: </Text>
            </View>
            <View style={styles.padding}>
              <Text> Laboratório 15 </Text>
            </View>
            <View style={styles.padding}>
              <Text> Endereço: Rua XXX nº 10 - São Paulo, SP </Text>
            </View>
            <View style={styles.padding}>
              <Text> CEP: 00000-000 </Text>
            </View>
          </CustomCard>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#119FDC",
  },
  topContainer: {
    marginTop: 16,
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  padding: {
    paddingTop: 8,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default ListOrders;
