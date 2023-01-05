import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet, Button } from 'react-native';
// import DrawerNavigator from '../navigation/DrawerNavigator';
import { useNavigation } from '@react-navigation/native'
import { getClothes } from '../redux/ducks/clothesSlice';

export default HomeScreen = () => { //{ navigation }
    const drawerNav = useNavigation();
    const currentSet = useSelector(state => state.clothes.currentSet);
    const chosenSets = useSelector(state => state.clothes.chosenSets);
    [pieces, setTotalPieces] = useState({
        Total: 0,
        Chosen: 0
    });
    // const dispatch = useDispatch();

    const countPieces = (currentSet) => {
        let Total = 0, Chosen = 0; //currentSet.reduce((r, o) => r + +!Object.values(o).includes(null), 0);
        const nonNullValues = Object.values(currentSet).filter(value => value !== null);
        Chosen = nonNullValues.length;
        Total = Object.keys(currentSet).length;
        setTotalPieces({ Total, Chosen });
    }

    useEffect(() => {
        console.log(currentSet);
        countPieces(currentSet);
    }, [currentSet]);

    return (
        <View style={styles.container}>

            <View style={styles.headingBox}>
                <Text style={styles.heading}>Application</Text>
            </View>

            <View style={styles.textBox}>
                <Text>Completed Sets: 0</Text>
                <Text>Current Set Status: {pieces.Chosen} \ {pieces.Total}</Text>
            </View>

            {/* <View style={styles.buttonPanel}>
                <Button
                    title='Shirt'
                    onPress={() => drawerNav.navigate('Shirts')}
                />
                <Button
                    title='Pants'
                    onPress={() => drawerNav.navigate('Pants')}
                />
                <Button
                    title='Shoes'
                    onPress={() => drawerNav.navigate('Shoes')}
                />
            </View> */}

            {pieces.Chosen === pieces.Total &&
                <Button
                    title="Go to Success screen"
                    onPress={() => navigation.navigate('Success')} />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: "center",
        //alignItems: "center"
    },
    headingBox: {
        alignItems: "center",
        margin: 40,
    },
    heading: {
        alignItems: "center",
        fontSize: 40,
        fontWeight: 'bold'
    },
    textBox: {
        //justifyContent: "center",
        alignItems: "center"
    },
    buttonPanel: {
        margin: 40,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});