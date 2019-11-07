import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button, ImageBackground, ScrollView} from 'react-native';
import Bill from '../components/Bill';
import Wrapper from '../components/Wrapper';
import ProgressBar from '../components/ProgressBar';
import Spacer from '../components/Spacer';
import { Context as StorageContext } from '../context/BillContext';

const HomeScreen = (props) => {

    const valueData = useContext(StorageContext);

    console.log(valueData);

    return ( 
        <ImageBackground source={require("../images/HomeBackground.jpg")} style={styles.backgroundImage}>

            <Wrapper>

                <Spacer/>
                
                <ProgressBar/>

                <ScrollView 
                    style={styles.billsHolder}
                    showsVerticalScrollIndicator={false}
                >
                    {valueData.state.bills.map(bill => (
                        
                        <Bill data={bill} key={bill.id}/>
                    
                    ))}

                </ScrollView>

                {/* <Button
                    title="Go to Add bill"
                    onPress={() => {
                        props.navigation.navigate('add');
                    }}
                    style={{width: "100%"}}
                />
                <Button
                    title="Go to Option Flow"
                    onPress={() => {
                        props.navigation.navigate('optionFlow');
                    }}
                /> */}

                <View style={styles.addBillButton}>
                    <Text style={styles.addButtonText}>Add Bill</Text>
                </View>
                
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