import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Bill = (props) => {

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = daysOfWeek[new Date().getDay()];

    return ( 
        <LinearGradient 
            colors={["#F87B36", "#FFB45F"]} 
            style={styles.billCompWrapper}
            start={[0.8, 0.4]}    
        >
            
            <View style={styles.dateWrapper}>
                <Text style={styles.date}>{currentMonth}/{props.data.dueDate}</Text>
                <Text style={styles.day}>{currentDay}</Text>
            </View>

            <View style={styles.billWrapper}>
                <Text style={styles.due}>${props.data.amount}</Text>
                <Text style={styles.billName}>{props.data.name}</Text>
            </View>
            
        </LinearGradient>
    );
};

const styles = StyleSheet.create({

    billCompWrapper: {
        backgroundColor: 'white',
        padding: "2%",
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginBottom: "3%"
    },

    dateWrapper: {
        alignItems: 'flex-start',
        margin: "3%"
    },

    billWrapper: {
        alignItems: 'flex-end',
        margin: "3%"
    },

    date: {
        fontSize: 36,
        color: "white"
    },

    day: {
        fontSize: 14,
        color: "white"
    },

    due: {
        fontSize: 36,
        color: "white",
        fontWeight: "bold"
    },

    billName: {
        fontSize: 14,
        color: "white"
    }


});

export default Bill;