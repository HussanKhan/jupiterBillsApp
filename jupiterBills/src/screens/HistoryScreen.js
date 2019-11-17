import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, ImageBackground, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Bill from '../components/Bill';
import Wrapper from '../components/Wrapper';
import HistoryCard from '../components/HistoryCard';
import Spacer from '../components/Spacer';
import { Context as StorageContext } from '../context/BillContext';
import { Ionicons } from '@expo/vector-icons';


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
                <View style={styles.wrapper}>
                    <ScrollView 
                        style={styles.billsHolder}
                        showsVerticalScrollIndicator={false}
                    >
                        {valueData.state.history.reverse().map((event, i) => (

                            <HistoryCard key={i} data={event}/>

                        ))}

                    </ScrollView>
                </View>
                
            </Wrapper>

        </ImageBackground>
    );
};

// Navigation styles
HistoryScreen.navigationOptions = (props) => {
    console.log(props);
    return ({
        headerTransparent: true,
        headerLeft: ( 
        <TouchableOpacity onPress={ () => { props.navigation.goBack() } }>
            <Ionicons name="ios-arrow-back" style={{marginLeft: 25, paddingRight: 0}} size={32} color="white" />
        </TouchableOpacity>
        ),
        title: 'History',
        headerTitleStyle: {
            color: "white",
            fontWeight: "100"
        }
    });
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    wrapper: {
        top: "5%",
        height: "90%"
    }
});

export default HistoryScreen;