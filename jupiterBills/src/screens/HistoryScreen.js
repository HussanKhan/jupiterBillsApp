import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, ImageBackground, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Bill from '../components/Bill';
import Wrapper from '../components/Wrapper';
import HistoryCard from '../components/HistoryCard';
import Spacer from '../components/Spacer';
import { Context as StorageContext } from '../context/BillContext';

const HistoryScreen = (props) => {

    const valueData = useContext(StorageContext);

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

                <ScrollView 
                    style={styles.billsHolder}
                    showsVerticalScrollIndicator={false}
                >
                    {valueData.state.history.reverse().map((event, i) => (

                        <HistoryCard key={i} data={event}/>
                        
                    ))}

                </ScrollView>
                
            </Wrapper>

        </ImageBackground>
    );
};

// Navigation styles
HistoryScreen.navigationOptions = () => {
    return ({
        headerTransparent: true
    });
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
    }
});

export default HistoryScreen;