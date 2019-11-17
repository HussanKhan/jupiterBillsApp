import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ProgressBar = (props) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentMonth = (new Date().getMonth() + 1).toString();
    const currentYear = (new Date().getFullYear()).toString();
    const currentDate = (new Date().getDate().toString());
    const currentDay = daysOfWeek[new Date().getDay()];

    return ( 
        <View style={styles.wrapper}>

            <View style={styles.barContainer}>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}><Text style={styles.dateText}>{currentDay} {currentMonth}-{currentDate}-{currentYear}</Text></View>
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
        height: 35,
        borderRadius: 350,
        position: 'absolute',
        width: "100%",
        opacity: 0.9
    },
    infoText: {
        color: "#F87B36",
        height: 35,
        fontSize: 16,
        width: "100%",
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        zIndex: 1
    },
    barBackground: {
        backgroundColor: "white",
        height: 35,
        borderRadius: 350,
        position: 'absolute',
        width: "100%",
        opacity: 0.9
    },
    dateText: {
        color: "#F87B36",
        height: 35,
        fontSize: 16,
        width: "100%",
        // borderColor: 'red',
        // borderWidth: 1,
        // flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        zIndex: 1
    }
});

export default ProgressBar;