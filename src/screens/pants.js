import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addPants } from "../redux/ducks/clothesSlice";


const PantsChoiceScreen = () => {
  const pants = useSelector(state => state.clothes.pants);
  const [selectedPants, setSelectedPants] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const PantsAndColor = (pants, color) => {
    setSelectedPants(pants);
    setSelectedColor(color);
  }

  const selectPants = pants => {
    setSelectedPants(pants);
  };

  const selectColor = color => {
    setSelectedColor(color);
  };

  const selectSize = size => {
    setSelectedSize(size);
    Alert.alert(
      'Add pants to Set?',
      `Are you sure you want to add a ${selectedPants.name} in size ${size} and color ${selectedColor} to your Set?`,
      [
        {
          text: 'Cancel',
          onPress: () => setSelectedSize(null),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(addPants({ id: selectedPants.id, brand: selectedPants.brand, name: selectedPants.name, size, color: selectedColor }));
            setSelectedPants(null);
            setSelectedSize(null);
            setSelectedColor(null);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false },
    );
  };

  const renderPants = () => {
    return pants.map(pants => {
      return (
        <View key={pants.id} style={styles.pantsContainer}>
          <Text style={styles.formatPants}>{pants.brand + ' ' + pants.name}</Text>
          <View style={styles.buttonContainer}>
            {[...new Set(pants.colors.map(color => color))].map(color => ( // there are pants with duplicate entries for colors.
              <TouchableOpacity key={color} style={[styles.button, { backgroundColor: color }]} onPress={() => PantsAndColor(pants, color)}>
                <Text style={styles.buttonText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedPants === pants && (
            <View style={styles.sizeMenu}>
              <Text style={styles.menuTitle}>Select size:</Text>
              {pants.sizes.map(size => (
                <Button key={size} title={size.toString()} onPress={() => selectSize(size)} />
              ))}
            </View>
          )}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headline}> Found {pants.length} Pants</Text>
      </View>
      <ScrollView>
        {renderPants()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  headerContainer: {
    backgroundColor: 'white'
  },
  headline: {
    textAlign: 'center',
    fontSize: 30,
  },
  pantsContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  formatPants: {
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

export default PantsChoiceScreen;