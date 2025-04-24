import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import details from '../../../assets/images/details-icon.png';
import HeaderTitle from '../../components/HeaderTitle';
import ImageInput from '../../components/ImageInput';
import CustomCard from '../../components/CustomCard';
import CustomButton from '../../components/CustomButton';
import Title from '../../components/Title';

import {
  uploadOrderImage,
  completeOrder,
  getOrderById
} from '../../utils/services/order/orderServices';

const BACKEND_URL = 'http://192.168.0.54:3000';

const OrderDetails = () => {
  const navigation = useNavigation();
  const { order, user } = useRoute().params;

  const [currentOrder, setCurrentOrder] = useState(order);
  const [currentImageUri, setCurrentImageUri] = useState(null);

  useEffect(() => {
    if (currentOrder.imagem) {
      const cleanPath = currentOrder.imagem
        .replace(/^\/+/, '')
        .replace(/\\/g, '/');     
      setCurrentImageUri(`${BACKEND_URL}/${cleanPath}`);
    }
  }, [currentOrder.imagem]);;

  useFocusEffect(
    useCallback(() => {
      const fetchOrderDetails = async () => {
        try {
          const { success, data } = await getOrderById(order.id);
          if (success) {
            setCurrentOrder(data);
          }
        } catch (err) {
          console.error('Erro ao obter detalhes do pedido:', err);
        }
      };

      fetchOrderDetails();
    }, []),
  );

  const handleImageSelected = async (localUri) => {
    const { success, imagem, message } = await uploadOrderImage(currentOrder.id, localUri);
    if (success) {
      const cleanPath = imagem.replace(/^\/+/, '');
      setCurrentImageUri(`${BACKEND_URL}/${cleanPath}`);
      Alert.alert('Sucesso', 'Imagem enviada!');
    } else {
      Alert.alert('Erro', message);
    }
  };

  const handleComplete = async () => {
    const { success, message } = await completeOrder(currentOrder.id);
    if (success) {
      Alert.alert('Sucesso', 'Pedido concluído!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Erro', message);
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
            text={`Previsão de Entrega: ${new Date(currentOrder.prazoEntrega).toLocaleDateString()}`}
            borderColor="#DC1111"
          >
            <View style={styles.padding}>
              <Text>Remetente: {currentOrder.remetente}</Text>
            </View>
            <View style={[styles.row, styles.padding]}>
              <Text style={styles.bold}>Destinatário: </Text>
              <Text>{currentOrder.destinatario}</Text>
            </View>
            <View style={styles.padding}>
              <Text>Detalhes: {currentOrder.detalhes}</Text>
            </View>

            <View style={styles.titleWrapper}>
              <Title text="Adicionar Evidência:" />
            </View>
            <ImageInput
              initialImageUri={currentImageUri}
              onImageSelected={handleImageSelected}
            />

            <CustomButton
              text="Editar Pedido"
              textColor="#119FDC"
              backgroundColor="transparent"
              borderColor="#119FDC"
              borderWidth={2}
              onPress={() =>
                navigation.navigate('OrderForm', {
                  user,
                  order: currentOrder,
                  isEdit: true
                })
              }
            />

            <View style={styles.actions}>
              {currentOrder.concluido ? (
                <View style={styles.buttonGrow}> 
                  <CustomButton
                    text="Voltar"
                    textColor="#DC1111"
                    backgroundColor="transparent"
                    borderColor="#DC1111"
                    borderWidth={2}
                    fullWidth
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ) : (
                <>
                  <View style={styles.buttonGrow}> 
                    <CustomButton
                      text="Concluir Pedido"
                      textColor="#11DC18"
                      backgroundColor="transparent"
                      borderColor="#11DC18"
                      borderWidth={2}
                      onPress={handleComplete}
                    />
                  </View>
                  <View style={styles.buttonGrow}>
                    <CustomButton
                      text="Voltar"
                      textColor="#DC1111"
                      backgroundColor="transparent"
                      borderColor="#DC1111"
                      borderWidth={2}
                      onPress={() => navigation.goBack()}
                    />
                  </View>
                </>
              )}
            </View>
          </CustomCard>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: '#119FDC' },
  topContainer: {
    alignItems: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    alignItems: 'flex-start',
    marginTop: 12,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },
  row: { flexDirection: 'row' },
  bold: { fontWeight: 'bold' },
  padding: { paddingTop: 4 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
    gap: 16,
  },
  buttonGrow: {
    flex: 1
  }
});

export default OrderDetails;