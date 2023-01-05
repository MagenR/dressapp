import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default ShirtChoiceScreen = () => {
  const shirts = useSelector(state => state.clothes.shirts);
  const loading = useSelector(state => state.clothes.loading);

  if (!shirts && loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Shirts</Text>
      

      {shirts? <View>
        <Text>Amount: {shirts.length}</Text>
        {shirts.map(shirt => (
          <View key={shirt.id}>
            {/* <Image source={item.image} alt={item.name} /> */}
            <Text>{shirt.name}</Text>
            {/* <Text>{item.type}</Text> */}
            {/* {shirt.colors.map(color => (
              <Button>prop</Button>
            ))} */}

            {/* clicked?
            <Text>{item.size}</Text> */}
          </View>
        ))}
      </View> : <Text>Loading...</Text>}

    </View>
  )
}