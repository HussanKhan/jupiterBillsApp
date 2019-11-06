import React from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';

const AddScreen = () => {
    return ( 
        <ImageBackground source={require("../images/abstract_background_10.jpg")} style={styles.backgroundImage}>
            <View>
                <Text style={{fontSize: 48}}>AddScreen</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -10
    }
});

export default AddScreen;