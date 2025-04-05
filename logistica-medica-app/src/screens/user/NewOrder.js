import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import create from "../../../assets/images/create-icon.png";

import HeaderTitle from "../../components/HeaderTitle";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import LabeledInput from "../../components/LabeledInput";
import LabeledCheckbox from "../../components/CheckBoxInput";
import DateInput from "../../components/DateInput";

const NewOrder = () => {
    const [destinatario, setDestinatario] = useState('');
    const [remetente, setRemetente] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    
    return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <HeaderTitle
            text={"Criar Pedido"}
            color="#FFFFFF"
            icon={create}
          />
        </View>
        <View style={styles.bottomContainer}>
          <CustomCard text={"Novo Pedido:"} borderColor="#119FDC">
           <View style={styles.padding}>
                <LabeledInput
                    label="Remetente"
                    value={remetente}
                    onChangeText={setRemetente}
                    placeholder=""
                    textColor="#000000"
                    borderColor="#119FDC"
                />
           </View>
           <View style={styles.padding}>
                <LabeledInput
                    label="Destinatário"
                    value={destinatario}
                    onChangeText={setDestinatario}
                    placeholder=""
                    textColor="#000000"
                    borderColor="#119FDC"
                />
           </View> 
           <View style={styles.padding}>
           <DateInput
                label="Data de Entrega Esperada"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholder=""
                textColor="#333333"
                borderColor="#119FDC"
            />
           </View>
           <View style={[styles.padding, styles.center, styles.row]}>
                <Text style={styles.text}>
                    Nível de Urgência
                </Text>
            </View>
           <View style={[styles.padding, styles.row, styles.space]}>
            <LabeledCheckbox
                label="Baixo"
                checked={selectedLevel === 'Baixo'}
                onChange={() => setSelectedLevel('Baixo')}
                textColor="#333333"
                borderColor="#000000"
            />
            <LabeledCheckbox
                label="Médio"
                checked={selectedLevel === 'Médio'}
                onChange={() => setSelectedLevel('Médio')}
                textColor="#333333"
                borderColor="#000000"
            />
            <LabeledCheckbox
                label="Alto"
                checked={selectedLevel === 'Alto'}
                onChange={() => setSelectedLevel('Alto')}
                textColor="#333333"
                borderColor="#000000"
            />
            </View>
            <View style={styles.padding}>
                <LabeledInput
                    label="Detalhes do Pedido"
                    value={detalhes}
                    onChangeText={setDetalhes}
                    placeholder=""
                    textColor="#000000"
                    borderColor="#119FDC"
                />
           </View>
            <View style={styles.buttons}>
              <View style={styles.buttonWrapper}>
                <CustomButton
                  text={"Criar Pedido"}
                  textColor="#11DC18"
                  backgroundColor="transparent"
                  borderColor="#11DC18"
                  borderWidth={2}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <CustomButton
                  text={"Cancelar"}
                  textColor="#DC1111"
                  backgroundColor="transparent"
                  borderColor="#DC1111"
                  borderWidth={2}
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
    text: {
        fontSize: 20,
        padding: 10
    },
    row: {
      flexDirection: "row",
    },
    center: {
        justifyContent: "center"
    },
    space:{
        justifyContent: "space-evenly"
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
    }
});


export default NewOrder;