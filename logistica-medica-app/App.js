import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAdmin from './src/screens/admin/LoginAdmin';
import LoginScreen from './src/screens/user/Login';
import SignUp from './src/screens/user/SignUp';
import HomeChoice from './src/screens/user/HomeChoice';
import MainScreen from './src/screens/user/MainScreen';
import HomePage from './src/screens/user/HomePage';
import ListOrders from './src/screens/user/ListOrders';
import NewOrder from './src/screens/user/NewOrder';
import OrderDetails from './src/screens/user/OrderDetails';
import ListOrdersAdmin from './src/screens/admin/ListOrdersAdmin';
import OrderConclusion from './src/screens/admin/OrderConclusion';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"LoginAdmin"}>
        <Stack.Screen name="HomeChoice" component={HomeChoice} options={{title: ''}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{title: ''}} />
        <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{title: ''}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{title: ''}} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{title: ''}}/>
        <Stack.Screen name="HomePage" component={HomePage} options={{title: ''}}/>
        <Stack.Screen name="ListOrders" component={ListOrders} options={{title: ''}}/>
        <Stack.Screen name="NewOrder" component={NewOrder} options={{title: ''}}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{title: ''}}/>
        <Stack.Screen name="ListOrdersAdmin" component={ListOrdersAdmin} options={{title: ''}}/>
        <Stack.Screen name="OrderConclusion" component={OrderConclusion} options={{title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
