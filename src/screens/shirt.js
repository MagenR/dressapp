import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addShirt } from "../redux/ducks/clothesSlice";


const ShirtChoiceScreen = () => {
  const shirts = useSelector(state => state.clothes.shirts);
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const ShirtAndColor = (shirt, color) => {
    setSelectedShirt(shirt);
    setSelectedColor(color);
  }

  const selectShirt = shirt => {
    setSelectedShirt(shirt);
  };

  const selectColor = color => {
    setSelectedColor(color);
  };

  const selectSize = size => {
    setSelectedSize(size);
    Alert.alert(
      'Add shirt to Set?',
      `Are you sure you want to add a ${selectedShirt.name} in size ${size} and color ${selectedColor} to your Set?`,
      [
        {
          text: 'Cancel',
          onPress: () => setSelectedSize(null),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(addShirt({id: selectedShirt.id, name: selectedShirt.name, size, color: selectedColor }));
            setSelectedShirt(null);
            setSelectedSize(null);
            setSelectedColor(null);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false },
    );
  };

  const renderShirts = () => {
    return shirts.map(shirt => {
      return (
        <View key={shirt.id} style={styles.shirtContainer}>
          <Text style={styles.shirtName}>{shirt.name}</Text>
          <View style={styles.buttonContainer}>
            {shirt.colors.map(color => (
              <TouchableOpacity key={color} style={[styles.button, { backgroundColor: color }]} onPress={() => ShirtAndColor(shirt, color)}>
                <Text style={styles.buttonText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedShirt === shirt && (
            <View style={styles.sizeMenu}>
              <Text style={styles.menuTitle}>Select size:</Text>
              {shirt.sizes.map(size => (
                <Button key={size} title={size} onPress={() => selectSize(size)} />
              ))}
            </View>
          )}
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      {renderShirts()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  shirtContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  shirtName: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  sizeMenu: {
    marginTop: 10,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ShirtChoiceScreen;

// export default ShirtChoiceScreen = () => {
//   const shirts = useSelector(state => state.clothes.shirts);
//   const loading = useSelector(state => state.clothes.loading);

//   if (!shirts && loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View>
//       <Text>Shirts</Text>
      

//       {shirts? <View>
//         <Text>Amount: {shirts.length}</Text>
//         {shirts.map(shirt => (
//           <View key={shirt.id}>
//             {/* <Image source={item.image} alt={item.name} /> */}
//             <Text>{shirt.name}</Text>
//             {/* <Text>{item.type}</Text> */}
//             {/* {shirt.colors.map(color => (
//               <Button>prop</Button>
//             ))} */}

//             {/* clicked?
//             <Text>{item.size}</Text> */}
//           </View>
//         ))}
//       </View> : <Text>Loading...</Text>}

//     </View>
//   )
// }