import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import details from "../../../assets/images/details-icon.png";
import HeaderTitle from "../../components/HeaderTitle";
import ImageInput from "../../components/ImageInput";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CustomSectionLabel from "../../components/SectionLabel";
import Title from "../../components/Title";


import {
  uploadOrderImage,
  completeOrder
} from '../../utils/services/order/orderServices';

const OrderDetails = () => {
  const navigation = useNavigation();
  const { order } = useRoute().params;

  const BACKEND_URL = "http://192.168.0.54:3000";
  const imagePath = order.imagem ? `${BACKEND_URL}/uploads/${order.imagem}` : null;

  const handleImageSelected = async (uri) => {
    const { success, message } = await uploadOrderImage(order.id, uri);
    if (success) {
      Alert.alert("Sucesso", "Imagem enviada!");
      Alert.alert(order.imagem)
    } else {
      Alert.alert("Erro", message);
    }
  };

  const handleComplete = async () => {
    const { success, message } = await completeOrder(order.id);
    if (success) {
      Alert.alert("Sucesso", "Pedido concluído!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert("Erro", message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <HeaderTitle
            text="Detalhes do Pedido"
            color="#FFFFFF"
            icon={details}
          />
        </View>
        <View style={styles.bottomContainer}>
          <CustomCard
            text={`Previsão de Entrega: ${new Date(order.prazoEntrega)
              .toLocaleDateString()}`}
            borderColor="#DC1111"
          >
            <View style={styles.padding}>
              <Text>Remetente: {order.remetente}</Text>
            </View>
            <View style={[styles.row, styles.padding]}>
              <Text style={styles.bold}>Destinatário: </Text>
              <Text>{order.destinatario}</Text>
            </View>
            <View style={styles.padding}>
              <Text>Detalhes: {order.detalhes}</Text>
            </View>

            <View style={styles.titleWrapper}>
              <Title text="Adicionar Evidência:" />
            </View>
            <ImageInput
              initialImageUri={imagePath}
              onImageSelected={handleImageSelected}
            />

            <View style={styles.buttons}>
              {!order.concluido && (
                <View style={styles.buttonWrapper}>
                  <CustomButton
                    text="Concluir Pedido"
                    textColor="#11DC18"
                    backgroundColor="transparent"
                    borderColor="#11DC18"
                    borderWidth={2}
                    onPress={handleComplete}
                  />
                </View>
              )}
              <View style={styles.buttonWrapper}>
                <CustomButton
                  text="Voltar"
                  textColor="#DC1111"
                  backgroundColor="transparent"
                  borderColor="#DC1111"
                  borderWidth={2}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          </CustomCard>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: "#119FDC" },
  topContainer: {
    alignItems: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    alignItems: "flex-start",
    marginTop: 12,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },
  row: { flexDirection: "row" },
  bold: { fontWeight: "bold" },
  padding: { paddingTop: 4 },
  buttons: { flexDirection: "row", gap: 10, marginTop: 16 },
  buttonWrapper: { flex: 1 },
});

export default OrderDetails;
