import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import HeaderTitle from "../../components/HeaderTitle";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CustomSectionLabel from "../../components/SectionLabel";
import LabeledInput from "../../components/LabeledInput";
import analysing from "../../../assets/images/analyse.png";

import { getOrdersByUser, getOrderById } from '../../utils/services/order/orderServices';

// Função para formatar a data
const formatDate = (datetime) => {
  const date = new Date(datetime);
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
};

const ListOrders = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user } = params;

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lowerSearch = search.trim().toLowerCase();
    
    if (lowerSearch) {
      setFilteredOrders(
        orders.filter(o =>
          o.destinatario.toLowerCase().includes(lowerSearch) ||
          o.remetente.toLowerCase().includes(lowerSearch)
        )
      );
    } else {
      setFilteredOrders(orders);
    }
  }, [search, orders]);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const handleSelectOrder = async (orderId) => {
    try {
      const { success, data, message } = await getOrderById(orderId);
      if (success) {
        navigation.navigate('OrderDetails', { order: data, user, refreshOrders: fetchOrders });
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

          {loading && <Text style={styles.infoText}>Carregando pedidos...</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}

          <CustomSectionLabel label="Pendente" color="#DC1111" />
          {pendingOrders.length === 1 ? (
            <View>
              <CustomCard
                key={pendingOrders[0].id}
                text={`Previsão de Entrega: ${formatDate(pendingOrders[0].prazoEntrega)}`}
                borderColor="#DC1111"
                onPress={() => handleSelectOrder(pendingOrders[0].id)}
              >
                <View style={[styles.row, styles.textContainer]}>
                  <Text style={styles.bold}>{pendingOrders[0].remetente} → </Text>
                  <Text style={styles.bold}>{pendingOrders[0].destinatario}</Text>
                </View>
              </CustomCard>
            </View>
          ) : (
            pendingOrders.map(order => (
              <CustomCard
                key={order.id}
                text={`Previsão de Entrega: ${formatDate(order.prazoEntrega)}`}
                borderColor="#DC1111"
                onPress={() => handleSelectOrder(order.id)}
              >
                <View style={[styles.row, styles.textContainer]}>
                  <Text style={styles.bold}>{order.remetente} → </Text>
                  <Text style={styles.bold}>{order.destinatario}</Text>
                </View>
              </CustomCard>
            ))
          )}

          <CustomSectionLabel label="Concluído" color="#11DC18" />
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <CustomCard
                key={order.id}
                text={`Previsão de Entrega: ${formatDate(order.prazoEntrega)}`}
                borderColor="#11DC18"
                onPress={() => handleSelectOrder(order.id)}
              >
                <View style={[styles.row, styles.textContainer]}>
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
  textContainer: {
    maxWidth: '90%',
    flexWrap: 'wrap',
  },
  infoText: { textAlign: 'center', marginVertical: 8, color: '#666' },
  errorText: { textAlign: 'center', marginVertical: 8, color: 'red' },
});

export default ListOrders;
