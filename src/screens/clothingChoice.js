import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addClothing } from "../redux/ducks/clothesSlice";
import SearchInput from "../components/SearchByProperties";

export default ClothingChoiceScreen = ({ clothingType }) => {

  const clothingArr = useSelector(state => state.clothes[clothingType]);
  const [filteredClothing, setFiltered] = useState(clothingArr);
  const [chosenColor, setColor] = useState(null);
  const [chosenItem, setChosenItem] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchParameters = ["brand", "name", "sizes", "colors"];

  // Calls state change for the clothing item chosenColor and it's color.
  const clothingAndColor = (clothing, color) => {
    setColor(color);
    setChosenItem(clothing);
  }

  // Size selection alert.
  const selectSize = size => {
    setColor(size);
    Alert.alert(
      'Add clothing to Set?',
      `Are you sure you want to add a ${chosenItem.name} in size ${size} and color ${chosenColor} to your Set?`,
      [
        {
          text: 'Cancel',
          onPress: () => setColor(null),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // can be simplified later on, by sending object as a whole.
            dispatch(addClothing({clothingType, clothing: {id: chosenItem.id, brand: chosenItem.brand, name: chosenItem.name, size, color: chosenColor }}));
            setColor(null);
            setChosenItem(null);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false },
    );
  };

  const renderClothingScreen = (clothes) => {
    return clothes.map(clothingItem => {
      return (
        <View key={clothingItem.id} style={styles.clothingContainer}>
          <Text style={styles.textFormat}>{clothingItem.brand + ' ' + clothingItem.name}</Text>
          <View style={styles.buttonContainer}>
            {[...new Set(clothingItem.colors.map(color => color))].map(color => ( // there are clothing with duplicate entries for colors.
              <TouchableOpacity key={color} style={[styles.button, { backgroundColor: color }]} onPress={() => clothingAndColor(clothingItem, color)}>
                <Text style={styles.buttonText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {chosenItem === clothingItem && (
            <View style={styles.sizeMenu}>
              <Text style={styles.menuTitle}>Select size:</Text>
              {clothingItem.sizes.map(size => (
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
      <ScrollView>
        <View style={styles.headerContainer}>
          <SearchInput data={clothingArr} searchProperties={searchParameters} setResults={setFiltered} />
          <Text style={styles.headline}> Found {filteredClothing.length} {clothingType} </Text>
        </View>
        {renderClothingScreen(filteredClothing)}
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
  clothingContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  textFormat: {
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