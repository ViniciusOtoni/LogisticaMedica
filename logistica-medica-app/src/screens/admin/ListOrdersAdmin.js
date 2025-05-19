import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import HeaderTitle from "../../components/HeaderTitle";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CustomSectionLabel from "../../components/SectionLabel";
import analysing from "../../../assets/images/analyse.png";
import LabeledInput from "../../components/LabeledInput";

import { getAllOrders, getOrderById } from "../../utils/services/order/orderServices";

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
};

const ListOrdersAdmin = () => {
  const navigation = useNavigation();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
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
          o.remetente.toLowerCase().includes(lowerSearch) ||
          o.usuario?.nome?.toLowerCase().includes(lowerSearch) ||
          o.usuario?.email?.toLowerCase().includes(lowerSearch)
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
    navigation.navigate('OrderConclusion', { orderId: orderId, refreshOrders: fetchOrders });
  } catch (err) {
    Alert.alert('Erro de conexão', err.message);
  }
};

  const pendingOrders = filteredOrders.filter(o => !o.concluido);
  const completedOrders = filteredOrders.filter(o => o.concluido);

  const handleGenerateReport = async () => {
    try {
      const html = `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Relatório de Pedidos</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #119FDC; }
              h2 { color: #333; margin-top: 20px; }
              ul { list-style-type: none; padding: 0; }
              li { margin-bottom: 10px; }
              strong { color: #555; }
            </style>
          </head>
          <body>
            <h1>Relatório de Pedidos</h1>
            <h2>Pendentes</h2>
            <ul>
              ${pendingOrders.map(o =>
                `<li><strong>${o.remetente} → ${o.destinatario}</strong> - Prazo: ${formatDate(o.prazoEntrega)}</li>`
              ).join('')}
            </ul>
            <h2>Concluídos</h2>
            <ul>
              ${completedOrders.map(o =>
                `<li><strong>${o.remetente} → ${o.destinatario}</strong> - Prazo: ${formatDate(o.prazoEntrega)}</li>`
              ).join('')}
            </ul>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Compartilhar Relatório',
      });
    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
      Alert.alert('Erro', 'Não foi possível gerar o relatório.');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <HeaderTitle icon={analysing} text="Pedidos (Admin)" color="#FFF" />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.searchContainer}>
            <LabeledInput 
              placeholder="Pesquisar"
              value={search}
              onChangeText={setSearch}
              borderColor="#119FDC"
              textColor="#333"
            />
          </View>

          <CustomButton
            text="Gerar Relatório"
            textColor="#FFF"
            backgroundColor="#119FDC"
            onPress={handleGenerateReport}
          />

          {loading && <Text style={styles.infoText}>Carregando pedidos...</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}


          <CustomSectionLabel label="Pendente" color="#DC1111" />
          {pendingOrders.length === 0 && <Text style={styles.infoText}>Nenhum pedido pendente.</Text>}
          {pendingOrders.map(order => (
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
          ))}

          <CustomSectionLabel label="Concluído" color="#11DC18" />
          {completedOrders.length === 0 && <Text style={styles.infoText}>Nenhum pedido concluído.</Text>}
          {completedOrders.map(order => (
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
          ))}
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

export default ListOrdersAdmin;
