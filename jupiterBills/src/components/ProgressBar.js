import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ProgressBar = (props) => {

    return ( 
        <View style={styles.wrapper}>

            <View style={styles.barContainer}>
                <View style={ [styles.bar, {width: "60%"}] }></View>
                <View style={styles.barBackground}></View>
            </View>

            
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>${props.total.toFixed(2)}</Text>
                <View style={styles.infoBackground}></View>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({

    wrapper: {
        height: "5%",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    barContainer: {
        width: "65%"
    },
    infoContainer: {
        width: "30%"
    },
    infoBackground: {
        backgroundColor: "white",
        height: 30,
        borderRadius: 500,
        position: 'absolute',
        width: "100%",
        opacity: 0.9
    },
    infoText: {
        color: "#F87B36",
        height: 30,
        fontSize: 16,
        width: "100%",
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        zIndex: 1
    },
    barBackground: {
        backgroundColor: "white",
        height: 30,
        borderRadius: 500,
        position: 'absolute',
        width: "100%",
        opacity: 0.9
    },
    bar: {
        backgroundColor: "#F87B36",
        height: 30,
        borderRadius: 500,
        position: 'absolute',
        // width: "70%",
        zIndex: 5,
        opacity: 0.7
    }
});

export default ProgressBar;