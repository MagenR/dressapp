import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';

import HomeScreen from '../screens/home';
import ShirtChoiceScreen from '../screens/shirt';
import PantsChoiceScreen from '../screens/pants';
import ShoesChoiceScreen from '../screens/shoes';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Shoes" component={ShoesChoiceScreen} />
            <Drawer.Screen name="Pants" component={PantsChoiceScreen} />
            <Drawer.Screen name="Shirts" component={ShirtChoiceScreen} />
        </Drawer.Navigator>
    );
}
