import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAdmin from './src/screens/admin/LoginAdmin';
import LoginScreen from './src/screens/user/Login';
import SignUp from './src/screens/user/SignUp';
import HomeChoice from './src/screens/user/HomeChoice';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeChoice">
        <Stack.Screen name="HomeChoice" component={HomeChoice} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LoginAdmin" component={LoginAdmin} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
