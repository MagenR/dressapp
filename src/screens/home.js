import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default HomeScreen = () => {
    const currentSet = useSelector(state => state.clothes.currentSet);
    const chosenSets = useSelector(state => state.clothes.chosenSets);
    [pieces, setTotalPieces] = useState({
        Total: 0,
        Chosen: 0
    });
    const navigation = useNavigation();

    const countPieces = (currentSet) => {
        let Total = 0, Chosen = 0;
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
                <Text>Completed Sets: {chosenSets.length}</Text>
                <Text>Current Set Status: {pieces.Chosen} \ {pieces.Total}</Text>
            </View>

            {pieces.Chosen === pieces.Total &&
                <Button
                    title="Go to Success screen"
                    onPress={() => navigation.navigate('SuccessScreen')} />
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