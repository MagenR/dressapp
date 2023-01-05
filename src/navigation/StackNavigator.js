import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShirtChoiceScreen from '../screens/shirt';
import PantsChoiceScreen from '../screens/pants';
import ShoesChoiceScreen from '../screens/shoes';
// import SuccessScreen from '../screens/success';

const Stack = createNativeStackNavigator();

export default StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shoes" component={ShoesChoiceScreen} />
      <Stack.Screen name="Pants" component={PantsChoiceScreen} />
      <Stack.Screen name="Shirts" component={ShirtChoiceScreen} />
    </Stack.Navigator>
  );
}