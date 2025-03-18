import React from 'react';
import { Button, View, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Bem-vindo à tela inicial!</Text>
      <Button
        title="Ir para detalhes"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
