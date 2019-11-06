import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Bill = (props) => {
    return ( 
        <View style={styles.billCompWrapper}>
            
            <View style={styles.dateWrapper}>
                <Text style={styles.date}>11/21</Text>
                <Text style={styles.day}>Monday</Text>
            </View>

            <View style={styles.billWrapper}>
                <Text style={styles.due}>$34.67</Text>
                <Text style={styles.billName}>Comcast</Text>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({

    billCompWrapper: {
        width: "100%",
        backgroundColor: 'white',
        padding: "3%",
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        borderRadius: 10
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
        fontSize: 36
    },

    day: {
        fontSize: 14
    },

    due: {
        fontSize: 36
    },

    billName: {
        fontSize: 14
    }


});

export default Bill;