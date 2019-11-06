import React from 'react';
import {View, StyleSheet} from 'react-native';

const Wrapper = (props) => {
    return ( 
        <View style={styles.wrapper}>
            
            {props.children}
            
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        margin: "5%",
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default Wrapper;