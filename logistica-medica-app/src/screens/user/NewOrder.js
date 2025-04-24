import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

import createIcon from '../../../assets/images/create-icon.png';
import HeaderTitle from '../../components/HeaderTitle';
import CustomCard from '../../components/CustomCard';
import CustomButton from '../../components/CustomButton';
import LabeledInput from '../../components/LabeledInput';
import LabeledCheckbox from '../../components/CheckBoxInput';
import DateInput from '../../components/DateInput';

import { createOrder } from '../../utils/services/order/orderServices.js';

const NewOrder = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user } = params;

  const [remetente, setRemetente] = useState(user.email);
  const [destinatario, setDestinatario] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCreateOrder = async () => {
    if (!destinatario || !selectedDate || !selectedLevel || !detalhes) {
      return Alert.alert('Atenção', 'Preencha todos os campos do pedido.');
    }

    const formattedDate =
      selectedDate instanceof Date
        ? selectedDate.toISOString().split('T')[0]
        : selectedDate;

    const payload = {
      remetente,
      destinatario,
      prazoEntrega: formattedDate,
      urgencia: selectedLevel,
      detalhes,
      userId: user.id,
      email: user.email,
      senha: user.senha,
    };

    console.log('NewOrder: sending payload:', payload);

    try {
      const result = await createOrder(payload);
      console.log('NewOrder: createOrder result:', result);

      if (result.success) {
        Alert.alert(
          'Sucesso',
          'Pedido criado com sucesso!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        console.error('NewOrder error message:', result.message);
        Alert.alert('Erro ao criar pedido', result.message);
      }
    } catch (err) {
      console.error('NewOrder exception:', err);
      Alert.alert('Erro ao criar pedido', `Erro: ${err.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <HeaderTitle
            text="Criar Pedido"
            color="#FFFFFF"
            icon={createIcon}
          />
        </View>
        <View style={styles.bottomContainer}>
          <CustomCard text="Novo Pedido:" borderColor="#119FDC">
            <View style={styles.padding}>
              <LabeledInput
                label="Remetente"
                value={remetente}
                onChangeText={setRemetente}
                placeholder=""
                textColor="#000"
                borderColor="#119FDC"
              />
            </View>
            <View style={styles.padding}>
              <LabeledInput
                label="Destinatário"
                value={destinatario}
                onChangeText={setDestinatario}
                placeholder=""
                textColor="#000"
                borderColor="#119FDC"
              />
            </View>
            <View style={styles.padding}>
              <DateInput
                label="Data de Entrega Esperada"
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder=""
                textColor="#333"
                borderColor="#119FDC"
              />
            </View>
            <View style={[styles.padding, styles.center]}>
              <Text style={styles.text}>Nível de Urgência</Text>
            </View>
            <View style={[styles.padding, styles.row, styles.space]}>
              {['Baixo', 'Médio', 'Alto'].map(level => (
                <LabeledCheckbox
                  key={level}
                  label={level}
                  checked={selectedLevel === level}
                  onChange={() => setSelectedLevel(level)}
                  textColor="#333"
                  borderColor="#000"
                />
              ))}
            </View>
            <View style={styles.padding}>
              <LabeledInput
                label="Detalhes do Pedido"
                value={detalhes}
                onChangeText={setDetalhes}
                placeholder=""
                textColor="#000"
                borderColor="#119FDC"
              />
            </View>
            <View style={styles.buttons}>
              <View style={styles.buttonWrapper}>
                <CustomButton
                  text="Criar Pedido"
                  textColor="#11DC18"
                  backgroundColor="transparent"
                  borderColor="#11DC18"
                  borderWidth={2}
                  onPress={handleCreateOrder}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <CustomButton
                  text="Cancelar"
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
  topContainer: { paddingVertical: 6, paddingHorizontal: 20 },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },
  text: { fontSize: 20, padding: 10 },
  row: { flexDirection: "row" },
  center: { justifyContent: "center" },
  space: { justifyContent: "space-evenly" },
  padding: { paddingTop: 4 },
  buttons: { flexDirection: "row", gap: 10 },
  buttonWrapper: { flex: 1 },
});

export default NewOrder;
