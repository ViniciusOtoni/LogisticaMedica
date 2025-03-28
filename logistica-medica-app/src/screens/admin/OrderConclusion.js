import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import details from "../../../assets/images/details-icon.png";

import HeaderTitle from "../../components/HeaderTitle";
import ImageInput from "../../components/ImageInput";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CustomSectionLabel from "../../components/SectionLabel";
import Title from "../../components/Title";

const OrderConclusion = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <HeaderTitle
            text={"Detalhes do Pedido"}
            color="#FFFFFF"
            icon={details}
          />
        </View>
        <View style={styles.bottomContainer}>
          <CustomCard text={"Previsão de Entrega:"} borderColor="#DC1111">
            <View style={styles.padding}>
              <Text>Data: {"18/12/2005"}</Text>
            </View>
            <View style={[styles.row, styles.padding]}>
              <View>
                <Text> Laboratório 01 → </Text>
              </View>
              <View>
                <Text> Laboratório 15 </Text>
              </View>
            </View>
            <View style={[styles.row, styles.padding]}>
              <View>
                <Text> Destinatário: </Text>
              </View>
              <View>
                <Text> XXX </Text>
              </View>
            </View>
            <View style={styles.padding}>
              <Text> Endereço: Rua XXX nº 10 - São Paulo, SP </Text>
            </View>
            <View style={styles.padding}>
              <Text> CEP: 00000-000 </Text>
            </View>
            <View style={styles.row}>
              <View>
                <Text> Responsável: </Text>
              </View>
              <View>
                <Text> XXX </Text>
              </View>
            </View>
            <View style={[styles.row, styles.padding]}>
              <View>
                <Text> Horário Coleta: </Text>
              </View>
              <View>
                <Text> XXX </Text>
              </View>
            </View>
            <View style={styles.padding}>
              <Text> Temperatura da Coleta: {"XXX"} </Text>
            </View>
            <View style={styles.titleWrapper}>
              <Title text={"Adicionar Evidência:"} />
            </View>
            <View>
              <ImageInput />
            </View>
            <View style={styles.buttons}>
              <View style={styles.buttonWrapper}>
                <CustomButton
                  text={"Concluir Pedido"}
                  textColor="#11DC18"
                  backgroundColor="transparent"
                  borderColor="#11DC18"
                  borderWidth={2}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <CustomButton
                  text={"Voltar"}
                  textColor="#DC1111"
                  backgroundColor="transparent"
                  borderColor="#DC1111"
                  borderWidth={2}
                />
              </View>
            </View>
            <View>
              <CustomSectionLabel label={"Urgente"} color="#DC1111" />
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
    alignItems: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    alignItems: "flex-start",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5,
    padding: 16,
  },
  row: {
    flexDirection: "row",
  },
  padding: {
    paddingTop: 4,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default OrderConclusion;
