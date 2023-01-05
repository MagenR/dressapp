import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import SuccessScreen from '../screens/success';

const Stack = createNativeStackNavigator();

export default StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={DrawerNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}