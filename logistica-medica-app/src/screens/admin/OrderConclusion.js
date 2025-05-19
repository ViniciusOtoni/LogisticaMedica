import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator 
} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import details from "../../../assets/images/details-icon.png";

import HeaderTitle from "../../components/HeaderTitle";
import ImageInput from "../../components/ImageInput";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CustomSectionLabel from "../../components/SectionLabel";
import Title from "../../components/Title";
import LabeledInput from "../../components/LabeledInput"; // Para o motivo do problema

import {
  getOrderById,
  uploadOrderImage,
  completeOrder,
  flagOrderIssue, 
} from "../../utils/services/order/orderServices";


const BACKEND_URL = 'http://192.168.5.66:3000';

const OrderConclusion = () => {
  const navigation = useNavigation();
  
  const { orderId } = useRoute().params;

  const [currentOrder, setCurrentOrder] = useState(null); 
  const [currentImageUri, setCurrentImageUri] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [actionLoading, setActionLoading] = useState(false); 
  const [issueReason, setIssueReason] = useState(''); 

  
  useFocusEffect(
    useCallback(() => {
      const fetchOrderDetails = async () => {
        setLoading(true);
        try {
          const { success, data } = await getOrderById(orderId);
          if (success && data) {
            console.log("Dados do pedido recebidos:", data);
            setCurrentOrder(data);
             
             if (data.imagem) {
                const cleanPath = data.imagem.replace(/^\/+/, '').replace(/\\/g, '/');
                setCurrentImageUri(`${BACKEND_URL}/${cleanPath}`);
             } else {
                 setCurrentImageUri(null); 
             }
          } else {
             Alert.alert("Erro", data?.message || "Não foi possível carregar os detalhes do pedido.");
             navigation.goBack(); 
          }
        } catch (err) {
          console.error('Erro ao obter detalhes do pedido:', err);
          Alert.alert("Erro", "Ocorreu um erro ao carregar os detalhes do pedido.");
          navigation.goBack(); 
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetails();

     
      return () => {
        setCurrentOrder(null);
        setCurrentImageUri(null);
        setLoading(true); 
        setIssueReason(''); 
        setActionLoading(false); 
      };
    }, [orderId, navigation]), 
  );

   
  useEffect(() => {
    if (currentOrder && currentOrder.imagem) {
      const cleanPath = currentOrder.imagem.replace(/^\/+/, '').replace(/\\/g, '/');
      setCurrentImageUri(`${BACKEND_URL}/${cleanPath}`);
    } else if (currentOrder && !currentOrder.imagem) {
        setCurrentImageUri(null); // Limpa se o pedido não tem imagem
    }
  }, [currentOrder?.imagem]); // Depende apenas da imagem no pedido


  const handleImageSelected = async (localUri) => {
    setActionLoading(true);
    const { success, imagem, message } = await uploadOrderImage(orderId, localUri);
    setActionLoading(false);
    if (success) {
      
      const cleanPath = imagem.replace(/^\/+/, '').replace(/\\/g, '/');
      setCurrentImageUri(`${BACKEND_URL}/${cleanPath}`);
       
      setCurrentOrder(prevOrder => ({ ...prevOrder, imagem: imagem }));
      Alert.alert('Sucesso', 'Imagem enviada!');
    } else {
      Alert.alert('Erro', message || 'Falha ao enviar imagem.');
    }
  };

  const handleComplete = async () => {
    Alert.alert(
      "Confirmar Conclusão",
      "Tem certeza que deseja marcar este pedido como concluído?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            setActionLoading(true);
            const { success, message } = await completeOrder(orderId);
            setActionLoading(false);
            if (success) {
              Alert.alert('Sucesso', message || 'Pedido concluído!');
              navigation.goBack(); // Volta para a tela anterior
            } else {
              Alert.alert('Erro', message || 'Falha ao concluir pedido.');
            }
          }
        }
      ]
    );
  };

  const handleFlagIssue = async () => {
      if (!issueReason.trim()) {
          Alert.alert("Atenção", "Por favor, descreva o motivo do problema.");
          return;
      }
       Alert.alert(
          "Confirmar Problema",
          "Tem certeza que deseja sinalizar este pedido com problema?",
          [
              {
                  text: "Cancelar",
                  style: "cancel"
              },
              {
                  text: "Sim",
                  onPress: async () => {
                      setActionLoading(true);
                      const { success, message } = await flagOrderIssue(orderId, issueReason);
                      setActionLoading(false);
                      if (success) {
                          Alert.alert('Sucesso', message || 'Pedido sinalizado com problema!');
                          navigation.goBack(); 
                      } else {
                          Alert.alert('Erro', message || 'Falha ao sinalizar pedido.');
                      }
                  }
              }
          ]
      );
  };


  // Exibe um indicador de loading enquanto busca os dados do pedido
  if (loading || !currentOrder) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={{ color: '#FFF', marginTop: 10 }}>Carregando pedido...</Text>
      </View>
    );
  }

  // Determina se os botões de ação (Concluir/Problema) devem ser exibidos
  const showActionButtons = currentOrder.status === 'pendente';

  // Formata a data de entrega
  const formattedDeliveryDate = currentOrder.prazoEntrega
    ? new Date(currentOrder.prazoEntrega).toLocaleDateString()
    : 'Data não informada';

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <HeaderTitle
            text={"Conclusão do Pedido"}
            color="#FFFFFF"
            icon={details}
          />
        </View>
        <View style={styles.bottomContainer}>
          <CustomCard text={`Previsão de Entrega: ${formattedDeliveryDate}`} borderColor="#DC1111">
            
             <View style={styles.padding}>
              <Text>Remetente: {currentOrder.remetente || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, styles.padding]}>
              <Text style={styles.bold}>Destinatário: </Text>
              <Text>{currentOrder.destinatario || 'Não informado'}</Text>
            </View>
             <View style={styles.padding}>
              <Text>Detalhes: {currentOrder.detalhes || 'Sem detalhes'}</Text>
            </View>

            <View style={styles.titleWrapper}>
              <Title text={"Adicionar Evidência:"} />
            </View>
            <ImageInput
                initialImageUri={currentImageUri}
                onImageSelected={handleImageSelected}
                disabled={actionLoading || !showActionButtons} 
            />

            
            {showActionButtons && ( 
                 <>
                    <View style={styles.titleWrapper}>
                       <Title text={"Sinalizar Problema:"} />
                    </View>
                    <LabeledInput
                       label="Motivo do Problema"
                       value={issueReason}
                       onChangeText={setIssueReason}
                       placeholder="Descreva o problema com o pedido"
                       textColor="gray"
                       borderColor="gray"
                       multiline 
                       numberOfLines={4} 
                       disabled={actionLoading}
                    />
                 </>
            )}


            {!showActionButtons && (
                <View style={styles.statusSection}>
                    <Text style={styles.statusText}>Status: {currentOrder.status === 'concluido' ? 'Concluído' : 'Com Problema'}</Text>
                    {currentOrder.status === 'issue' && (
                        <Text style={styles.issueReasonText}>Motivo: {currentOrder.issueReason || 'Não informado'}</Text>
                    )}
                </View>
            )}


            
            <View style={styles.actions}>
              {showActionButtons ? (
                  <>
                     
                     <View style={styles.buttonGrow}>
                         <CustomButton
                            text={actionLoading ? "Concluindo..." : "Concluir Pedido"}
                            textColor="#11DC18"
                            backgroundColor="transparent"
                            borderColor="#11DC18"
                            borderWidth={2}
                            onPress={handleComplete}
                            disabled={actionLoading}
                          />
                      </View>
                      
                      <View style={styles.buttonGrow}>
                           <CustomButton
                              text={actionLoading ? "Sinalizando..." : "Sinalizar Problema"}
                              textColor="#DC1111" 
                              backgroundColor="transparent"
                              borderColor="#DC1111"
                              borderWidth={2}
                              onPress={handleFlagIssue}
                              disabled={actionLoading}
                            />
                      </View>
                  </>
              ) : (
                  
                  <View style={styles.buttonGrow}>
                       <CustomButton
                          text="Voltar"
                          textColor="#119FDC" 
                          backgroundColor="transparent"
                          borderColor="#119FDC"
                          borderWidth={2}
                          fullWidth 
                          onPress={() => navigation.goBack()}
                          disabled={actionLoading}
                        />
                    </View>
              )}
            </View>

            {/* A label "Urgente" pode ser exibida condicionalmente */}
            {currentOrder.urgencia && <CustomSectionLabel label={"Urgente"} color="#DC1111" />}

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
   loadingContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
   },
  topContainer: {
    alignItems: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    alignItems: "flex-start",
    marginTop: 12, 
    marginBottom: 8, 
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
  bold: { fontWeight: 'bold' }, 
  padding: {
    paddingTop: 4,
  },
  actions: { 
    flexDirection: "row",
    justifyContent: 'space-evenly',
    gap: 16, 
    marginTop: 20, 
    marginBottom: 10, 
  },
  buttonGrow: {
    flex: 1, 
  },
  statusSection: { 
      marginTop: 20,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
  },
  statusText: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
  },
  issueReasonText: {
      fontSize: 14,
      color: 'gray',
  }
});

export default OrderConclusion;