import React, {useState} from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import Wrapper from '../components/Wrapper';
import Spacer from '../components/Spacer';
import DatePicker from 'react-native-datepicker';

const AddScreen = () => {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");


    const todayDate = `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`;
    const [date, setDate] = useState(todayDate);

    const minDate = `${new Date().getMonth() + 1}-01-${new Date().getFullYear()}`;
    const maxDate = `${new Date().getMonth() + 1}-01-${ (new Date().getFullYear() + 1) }`;

    console.log(minDate);
    console.log(maxDate);

    return ( 
        <ImageBackground source={require("../images/HomeBackground.jpg")} style={styles.backgroundImage} blurRadius={1.3}>

            <Wrapper>
                
                <View>
                    <Text style={{fontSize: 48}}>AddScreen</Text>
                </View>

                <View style={styles.dateWrapper}>

                
                    <DatePicker
                      date={date}
                      mode="date"
                      placeholder="select date"
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
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      style={{width: "100%"}}
                      onDateChange={(date) => {setDate(date)}}
                    />

                </View>

            </Wrapper>

        </ImageBackground>
    );
};

// Navigation styles
AddScreen.navigationOptions = () => {
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
    }
});

export default AddScreen;