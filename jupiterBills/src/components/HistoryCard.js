import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const HistoryCard = (props) => {

    return ( 
        <View 
            style={styles.billCompWrapper}
        >
            
            <View style={styles.dateWrapper}>
                <Text style={styles.date}>{props.data.category}</Text>
            </View>

            <View style={styles.billWrapper}>
                <Text style={styles.due}>{props.data.name}</Text>
            </View>
            
        </View>
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFB45F"
    },

    due: {
        fontSize: 18,
        color: "#FFB45F"
    }
});

export default HistoryCard;