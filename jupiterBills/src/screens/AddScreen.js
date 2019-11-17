import React, {useState, useContext} from 'react';
import {View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Text} from 'react-native';
import Wrapper from '../components/Wrapper';
import Spacer from '../components/Spacer';
import DatePicker from 'react-native-datepicker';
import OccurancePicker from "../components/OccurancePicker";
import { Context as StorageContext } from '../context/BillContext';
import { Ionicons } from '@expo/vector-icons';

const AddScreen = (props) => {

    const valueData = useContext(StorageContext);

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [occurance, setOccurance] = useState("");
    const [date, setDate] = useState('');

    const minDate = `${new Date().getMonth() + 1}-01-${new Date().getFullYear()}`;
    const maxDate = `${new Date().getMonth() + 1}-01-${ (new Date().getFullYear() + 1) }`;

    // Handle amount input
    const amountInput = (text) => {
        let numbers = text.match(/\d+/g);

        if (numbers) {
            let formattedAmount = "";

            for (let i = 0; i < numbers.length; i++) {
                formattedAmount += numbers[i];
            };

            formattedAmount = `${ formattedAmount.substring( 0, formattedAmount.length - 2) }.${ formattedAmount.substring( formattedAmount.length - 2, formattedAmount.length) }`

            setAmount(formattedAmount);
        } else {
            setAmount('');
        }

    };
    
    

    return ( 
        <ImageBackground source={require("../images/HomeBackground.jpg")} style={styles.backgroundImage} blurRadius={2}>

            <Wrapper>

                <View style={styles.inputWrapper}>
                    <TextInput 
                        placeholder="Bill Name"
                        onChangeText={(text) => {setName(text); }}    
                        value={name}
                        placeholderTextColor="#fff"
                        style={styles.textInput_Name}
                    />

                    <TextInput 
                        placeholder="Amount"
                        onChangeText={(text) => {amountInput(text); }}    
                        value={amount}
                        keyboardType='numeric'
                        maxLength={9}
                        placeholderTextColor="#fff"
                        style={styles.textInput_Amount}
                    />
                </View>

                <Spacer/>

                <View style={styles.dateWrapper}>

                
                    <DatePicker
                      date={date}
                      mode="date"
                      placeholder="Due Date"
                      format="MM-DD-YYYY"
                      showIcon={false}
                      minDate={minDate}
                      maxDate={maxDate}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          position: 'relative'
                        },
                        dateText: {
                            fontSize: 24,
                            margin: 0,
                            color: "white"
                        },
                        placeholderText: {
                            fontSize: 24,
                            margin: 0,
                            color: "white"
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      style={{width: "100%"}}
                      onDateChange={(date) => {setDate(date); }}
                    />

                </View>

                <Spacer/>

                <OccurancePicker
                    onChangeOcc={(occ) => {setOccurance(occ); }}
                />

                <Spacer/>

                { (name && amount && date && occurance) ? 
                
                    <TouchableOpacity style={ styles.addBillButton2 } onPress={
                        () => {
                            valueData.addBill({name, amount, dueDate: date, occurance});
                            props.navigation.navigate("home");
                        }
                    }>
                        <Text style={styles.addButtonText}>Add Bill</Text>
                    </TouchableOpacity>
                
                :

                    <View style={ styles.addBillButton1 }>
                        <Text style={styles.addButtonText}>Pending</Text>
                    </View>
                
                }

                

            </Wrapper>

        </ImageBackground>
    );
};

// Navigation styles
AddScreen.navigationOptions = (props) => {
    console.log(props);
    return ({
        headerTransparent: true,
        headerLeft: ( 
        <TouchableOpacity onPress={ () => { props.navigation.goBack() } }>
            <Ionicons name="ios-arrow-back" style={{marginLeft: 25}} size={32} color="white" />
        </TouchableOpacity>
        ),
        title: 'Add Bill',
        headerTitleStyle: {
            color: "white",
            fontWeight: "100",
            borderColor: 'red', 
            borderWidth: 1
        }
    });
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    dateWrapper: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.10)",
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 0.5,
        paddingTop: "1%",
        paddingBottom: "1%",
        alignItems: 'center',
        textAlignVertical: 'center'
    },
    textInput_Name: {
        fontSize: 24,
        color: "white",
        borderColor: "white",
        borderBottomWidth: 1,
        padding: "3%",
        paddingLeft: "0%",
        width: "55%"
    },
    textInput_Amount: {
        fontSize: 24,
        color: "white",
        borderColor: "white",
        borderBottomWidth: 1,
        padding: "3%",
        paddingLeft: "0%",
        width: "40%"
    },
    inputWrapper: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    addBillButton1: {
        backgroundColor: "white",
        // height: "10%",
        padding: "4%",
        borderRadius: 10,
        alignItems: 'center',
        opacity: 0.3
    },
    addBillButton2: {
        backgroundColor: "white",
        // height: "10%",
        padding: "4%",
        borderRadius: 10,
        alignItems: 'center',
        opacity: 1
    },
    addButtonText: {
        fontSize: 24,
        color: "#F87B36",
        margin: 0
    }
});

export default AddScreen;