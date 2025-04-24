import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderTitle from "../../components/HeaderTitle";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CustomSectionLabel from "../../components/SectionLabel";
import LabeledInput from "../../components/LabeledInput";
import analysing from "../../../assets/images/analyse.png";

import {
  getOrdersByUser,
  getOrderById,
  completeOrder
} from '../../utils/services/order/orderServices';

const ListOrders = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user } = params;

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const lower = search.toLowerCase();
      setFilteredOrders(
        orders.filter(o =>
          o.destinatario.toLowerCase().includes(lower) ||
          o.remetente.toLowerCase().includes(lower)
        )
      );
    } else {
      setFilteredOrders(orders);
    }
  }, [search, orders]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrder = async (orderId) => {
    try {
      const { success, data, message } = await getOrderById(orderId);
      if (success) {
        navigation.navigate('OrderDetails', { order: data });
      } else {
        Alert.alert('Erro', message);
      }
    } catch (err) {
      Alert.alert('Erro de conexão', err.message);
    }
  };


  const pendingOrders = filteredOrders.filter(o => !o.concluido);
  const completedOrders = filteredOrders.filter(o => o.concluido);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <HeaderTitle icon={analysing} text="Monitoramento" color="#FFF" />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.searchContainer}>
            <LabeledInput
              placeholder="Pesquisar..."
              value={search}
              onChangeText={setSearch}
              borderColor="#119FDC"
              textColor="#333"
            />
          </View>

          <CustomButton
            text="Gerar Relatório"
            textColor="#119FDC"
            backgroundColor="transparent"
            borderColor="#119FDC"
            borderWidth={2}
            onPress={() => {/* implementar geração de relatório */}}
          />

          {loading && <Text style={styles.infoText}>Carregando pedidos...</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}

          <CustomSectionLabel label="Pendente" color="#DC1111" />
          {pendingOrders.length > 0 ? (
            pendingOrders.map(order => (
              <CustomCard
                key={order.id}
                text={`Previsão de Entrega: ${order.prazoEntrega}`}
                borderColor="#DC1111"
                onPress={() => handleSelectOrder(order.id)}
              >
                {order.imagem && (
                  <Image source={{ uri: order.imagem }} style={styles.thumb} />
                )}
                <View style={[styles.row, styles.padding]}>  
                  <Text style={styles.bold}>{order.remetente} → </Text>
                  <Text style={styles.bold}>{order.destinatario}</Text>
                </View>
              </CustomCard>
            ))
          ) : (
            <Text style={styles.infoText}>Nenhum pedido pendente.</Text>
          )}

          <CustomSectionLabel label="Concluído" color="#11DC18" />
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <CustomCard
                key={order.id}
                text={`Previsão de Entrega: ${order.prazoEntrega}`}
                borderColor="#11DC18"
                onPress={() => handleSelectOrder(order.id)}
              >
                {order.imagem && (
                  <Image source={{ uri: order.imagem }} style={styles.thumb} />
                )}
                <View style={[styles.row, styles.padding]}>  
                  <Text style={styles.bold}>{order.remetente} → </Text>
                  <Text style={styles.bold}>{order.destinatario}</Text>
                </View>
              </CustomCard>
            ))
          ) : (
            <Text style={styles.infoText}>Nenhum pedido concluído.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: "#119FDC" },
  topContainer: { marginTop: 16, paddingVertical: 10, paddingHorizontal: 20 },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },
  searchContainer: { marginBottom: 12 },
  bold: { fontWeight: "bold" },
  row: { flexDirection: "row" },
  padding: { paddingTop: 8 },
  infoText: { textAlign: 'center', marginVertical: 8, color: '#666' },
  errorText: { textAlign: 'center', marginVertical: 8, color: 'red' },
  thumb: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonsRow: { marginTop: 8, alignItems: 'flex-end' },
});

export default ListOrders;
