import React from 'react';
import { Image, View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeClothing } from '../redux/ducks/clothesSlice';
import { useNavigation } from '@react-navigation/native'

const SuccessScreen = () => {
  const clothing = useSelector(state => state.clothes.currentSet);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cellNames = ["Type", "Brand", "Name", "Color", "Size"];

  const images = [
    'https://www.incimages.com/uploaded_files/image/1920x1080/getty_495142964_198701.jpg',
    'https://www.marcuslemonis.com/wp-content/uploads/2020/12/man-mountain-trophy-success-600x600.jpg',
    'https://www.incimages.com/uploaded_files/image/1920x1080/getty_459097117_370958.jpg'
  ];

  // Used for random generation of images.
  const index = Math.floor(Math.random() * images.length);
  const imageUrl = images[index];

  const removeCurrentClothingAndGoBack = () => {
    dispatch(removeClothing());
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.header}>Your Selection:</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          {cellNames.map(cell => {
            <Text style={styles.tableCell}>{cell}</Text>
          })}
        </View>
        {Object.entries(clothing).map(([type, item]) => (
          <View style={styles.tableRow} key={type}>
            <Text style={styles.tableCell}>{type}</Text>
            <Text style={styles.tableCell}>{item.brand}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.color}</Text>
            <Text style={styles.tableCell}>{item.size}</Text>
          </View>
        ))}
      </View>
      <View style={styles.returnButtonContainer}>
        <Button title="Choose another set" onPress={() => removeCurrentClothingAndGoBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    height: 200,
    width: 200
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    //flex: 1,
  },
  returnButtonContainer: {
    marginTop: 20,
  },
});

export default SuccessScreen;