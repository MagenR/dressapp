import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addShoe } from "../redux/ducks/clothesSlice";


const ShoesChoiceScreen = () => {
  const shoes = useSelector(state => state.clothes.shoes);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const ShoeAndColor = (shoe, color) => {
    setSelectedShoe(shoe);
    setSelectedColor(color);
  }

  const selectShirt = shoe => {
    setSelectedShoe(shoe);
  };

  const selectColor = color => {
    setSelectedColor(color);
  };

  const selectSize = size => {
    setSelectedSize(size);
    Alert.alert(
      'Add shoe to Set?',
      `Are you sure you want to add a ${selectedShoe.name} in size ${size} and color ${selectedColor} to your Set?`,
      [
        {
          text: 'Cancel',
          onPress: () => setSelectedSize(null),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(addShoe({id: selectedShoe.id, name: selectedShoe.name, size, color: selectedColor }));
            setSelectedShoe(null);
            setSelectedSize(null);
            setSelectedColor(null);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false },
    );
  };

  const renderShoes = () => {
    return shoes.map(shoe => {
      return (
        <View key={shoe.id} style={styles.shoeContainer}>
          <Text style={styles.shoeName}>{shoe.name}</Text>
          <View style={styles.buttonContainer}>
            {shoe.colors.map(color => (
              <TouchableOpacity key={color} style={[styles.button, { backgroundColor: color }]} onPress={() => ShoeAndColor(shoe, color)}>
                <Text style={styles.buttonText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedShoe === shoe && (
            <View style={styles.sizeMenu}>
              <Text style={styles.menuTitle}>Select size:</Text>
              {shoe.sizes.map(size => (
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
      {renderShoes()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  shoeContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  shoeName: {
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

export default ShoesChoiceScreen;