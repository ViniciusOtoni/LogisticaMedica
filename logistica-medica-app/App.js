import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAdmin from './src/screens/admin/LoginAdmin';
import LoginScreen from './src/screens/user/Login';
import SignUp from './src/screens/user/SignUp';
import HomeChoice from './src/screens/user/HomeChoice';
import MainScreen from './src/screens/user/MainScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeChoice">
        <Stack.Screen name="HomeChoice" component={HomeChoice} options={{title: ''}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{title: ''}} />
        <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{title: ''}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{title: ''}} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{title: ''}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
