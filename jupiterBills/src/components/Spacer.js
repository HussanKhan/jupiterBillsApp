// Apply margins to child components
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = (props) => {

    // The childeren of the component
    // props.childern
    return (
    <View style={styles.spacer}>
        {props.children}
    </View>
    );
};

const styles = StyleSheet.create({
        spacer: {
            margin: "5%"
        }
});

export default Spacer;