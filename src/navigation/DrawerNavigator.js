import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/home';
import ClothingChoiceScreen from '../screens/clothingChoice';

const Drawer = createDrawerNavigator();

export const screens = [
    {
      name: 'Shirts',
      type: 'shirts',
    },
    {
      name: 'Pants',
      type: 'pants',
    },
    {
      name: 'Shoes',
      type: 'shoes',
    },
  ];

export default DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            {screens.map(screen => {
                return (
                    <Drawer.Screen name={screen.name} key={screen.name}>
                       { () => <ClothingChoiceScreen clothingType={screen.type} />}
                    </Drawer.Screen>
                );
            })}
        </Drawer.Navigator>
    );
}
