import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, ImageBackground, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Bill from '../components/Bill';
import Wrapper from '../components/Wrapper';
import ProgressBar from '../components/ProgressBar';
import Spacer from '../components/Spacer';
import { Context as StorageContext } from '../context/BillContext';

const HomeScreen = (props) => {

    const valueData = useContext(StorageContext);
    const currentMonth = (new Date().getMonth() + 1).toString();
    const currentYear = (new Date().getFullYear()).toString();

    // RUN CODE ONCE, BUILD STATE from api
    useEffect(() => {
        // fill state with posts from api
        valueData.getBills();

        // if in focus, run again
        const listener = props.navigation.addListener('didFocus', () => {
            valueData.getBills();
        });

        // clean up
        return () => {
            listener.remove();
        };

    }, []);


    return ( 
        <ImageBackground source={require("../images/HomeBackground.jpg")} style={styles.backgroundImage} blurRadius={0.3}>

            <Wrapper>

                <Spacer/>
                
                <ProgressBar
                   total={ valueData.state.bills.reduce((totalDue, {amount}) => totalDue + parseFloat(amount), 0.00) }
                   bills={valueData.state.bills}
                />

                <ScrollView 
                    style={styles.billsHolder}
                    showsVerticalScrollIndicator={false}
                >
                    {valueData.state.bills.map(bill => {

                        if (bill.dueDate.split("-")[0] == currentMonth && bill.dueDate.split("-")[2] == currentYear) {
                            return (
                                <TouchableWithoutFeedback key={bill.id} onPress={ () => { console.log("GOT CLICK"); props.navigation.navigate("options", {id: bill.id}); }}>
                                    <View>
                                        <Bill data={bill}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }
                        
                    })}

                </ScrollView>

                <TouchableOpacity style={styles.addBillButton} onPress={ () => { props.navigation.navigate("add") } }>
                    <Text style={styles.addButtonText}>Add Bill</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBillButton} onPress={ () => { props.navigation.navigate("history") } }>
                    <Text style={styles.addButtonText}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBillButton} onPress={ () => { valueData.clearAsyncStorage() } }>
                    <Text style={styles.addButtonText}>Clear Async</Text>
                </TouchableOpacity>
                
            </Wrapper>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    billsHolder: {
        marginTop: "5%",
        height: "70%"
    },

    addBillButton: {
        backgroundColor: "white",
        // height: "10%",
        padding: "4%",
        borderRadius: 10,
        alignItems: 'center',
        opacity: 0.9,
        marginTop: "3%"
    },
    addButtonText: {
        fontSize: 24,
        color: "#F87B36",
        margin: 0
    }
});

export default HomeScreen;