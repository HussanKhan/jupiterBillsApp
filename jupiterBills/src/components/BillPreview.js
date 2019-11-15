import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BillPreview = (props) => {

    console.log("PREVIEW CALLED")

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentMonth = new Date().getMonth() + 1;

    // Predit day of week in future
    const futDate = new Date();
    futDate.setDate(props.data.dueDate.split("-")[1]);
    const currentDay = daysOfWeek[futDate.getDay()];

    return ( 
        <LinearGradient 
            colors={["#f5f6fa", "#dcdde1"]} 
            style={styles.billCompWrapper}
            start={[0.2, 0.9]}    
        >
            
            <View style={styles.dateWrapper}>
                <Text style={styles.date}>{currentMonth}/{props.data.dueDate.split("-")[1]}</Text>
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
        padding: "4%",
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
        color: "#FFB45F"
    },

    day: {
        fontSize: 14,
        color: "#FFB45F"
    },

    due: {
        fontSize: 36,
        color: "#FFB45F",
        fontWeight: "bold"
    },

    billName: {
        fontSize: 14,
        color: "#FFB45F"
    }


});

export default BillPreview;