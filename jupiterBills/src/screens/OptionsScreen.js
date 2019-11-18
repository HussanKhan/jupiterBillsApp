import React, {useContext} from 'react';
import {View, StyleSheet, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Wrapper from '../components/Wrapper';
import Spacer from '../components/Spacer';
import { Context as StorageContext } from '../context/BillContext';
import BillPreview from '../components/BillPreview';
import { Ionicons } from '@expo/vector-icons';

const OptionsScreen = (props) => {

    console.log("OPTIONS");

    const valueData = useContext(StorageContext);

    // naviagtion contains data from last screen
    const id = props.navigation.getParam("id");
    const post = valueData.state.bills.find( item => item.id == id );

    return ( 
        <ImageBackground source={require("../images/HomeBackground.jpg")} style={styles.backgroundImage} blurRadius={2}>

            <Wrapper>

                { post && <BillPreview data={post}/> }   

                <Spacer/> 
                <Spacer/>        

                <TouchableOpacity 
                    style={styles.payBillButton} 
                    onPress={ () => { 
                        valueData.payBill(post);
                        props.navigation.navigate("home");
                     } }
                >
                    <Text style={styles.payButtonText}>Pay Bill</Text>
                </TouchableOpacity>
            
                <TouchableOpacity 
                    style={styles.modBillButton} 
                    onPress={ () => { 
                        props.navigation.navigate("edit", {id}); 
                    } }
                    
                >
                    <Text style={styles.modButtonText}>Modify Bill</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.delBillButton} 
                    onPress={ () => { 
                        valueData.deleteBill(post);
                        props.navigation.navigate("home");                      
                    } }
                
                >
                    <Text style={styles.delButtonText}>Delete Bill</Text>
                </TouchableOpacity>

                <Spacer/>
                    
            </Wrapper>

        </ImageBackground>
    );
};

// Navigation styles
OptionsScreen.navigationOptions = (props) => {
   
    return ({
        headerTransparent: true,
        headerLeft: ( 
        <TouchableOpacity onPress={ () => { props.navigation.goBack() } }>
            <Ionicons name="ios-arrow-back" style={{marginLeft: 25}} size={32} color="white" />
        </TouchableOpacity>
        ),
        title: 'Options',
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
    modBillButton: {
        backgroundColor: "white",
        // height: "10%",
        padding: "4%",
        borderRadius: 10,
        alignItems: 'center',
        opacity: 1,
        marginTop: "3%",
        marginBottom: "3%"
    },
    modButtonText: {
        fontSize: 24,
        color: "#F87B36",
        margin: 0
    },
    payBillButton: {
        backgroundColor: "#27ae60",
        // height: "10%",
        padding: "4%",
        borderRadius: 10,
        alignItems: 'center',
        opacity: 1,
        marginTop: "3%",
        marginBottom: "3%"
    },
    payButtonText: {
        fontSize: 24,
        color: "white",
        margin: 0
    },
    delBillButton: {
        backgroundColor: "#e74c3c",
        // height: "10%",
        padding: "4%",
        borderRadius: 10,
        alignItems: 'center',
        opacity: 1,
        marginTop: "3%",
        marginBottom: "3%"
    },
    delButtonText: {
        fontSize: 24,
        color: "white",
        margin: 0
    }

});

export default OptionsScreen;