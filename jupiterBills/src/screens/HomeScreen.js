import React from 'react';
import {View, StyleSheet, Text, Button, ImageBackground} from 'react-native';
import Bill from '../components/Bill';
import Wrapper from '../components/Wrapper';

const HomeScreen = (props) => {
    return ( 
        <ImageBackground source={require("../images/abstract_background_10.jpg")} style={styles.backgroundImage}>

            <Wrapper>

                <Bill/>

                <Text style={{fontSize: 48}}>HomeScreen</Text>
                <Button
                    title="Go to Add bill"
                    onPress={() => {
                        props.navigation.navigate('add');
                    }}
                />
                <Button
                    title="Go to Option Flow"
                    onPress={() => {
                        props.navigation.navigate('optionFlow');
                    }}
                />
                
            </Wrapper>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%"
    }
});

export default HomeScreen;