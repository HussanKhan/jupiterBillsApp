// Apply margins to child components
import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const OccurancePicker = ({onChangeOcc, occuranceDefault = "Occurance"}) => {

    const [ menu, setMenu ] = useState(1);
    const [ occurance, setOccurance ] = useState(occuranceDefault);
    const [backgroundColor, setBackgroundColor] = useState("rgba(255, 255, 255, 0.10)");

    const allOcc = [
     {id: 0, name :"Monthly"}, 
     {id: 1, name :"One Time Only"}, 
     {id: 2, name :"Weekly"}, 
     {id: 3, name :"Every Two Weeks"}, 
     {id: 4, name :"Every Two Months"}, 
     {id: 5, name :"Quarterly"}, 
     {id: 6, name :"Every Six Months"}, 
     {id: 7, name :"Yearly"}
    ];

    // The childeren of the component
    // props.childern
    return (

        <View style={[styles.wrapper, {backgroundColor: backgroundColor}]}>
            
            { menu ? 
            
            <TouchableOpacity onPress={() => {setMenu(0); setBackgroundColor("white")}} style={styles.menuButton}>
                <Text style={styles.menuText}>{ occurance }</Text>
            </TouchableOpacity> 
                
            :

            allOcc.map(occ => (
                <TouchableOpacity key={occ.id} onPress={() => { onChangeOcc(occ.name); setOccurance(occ.name); setMenu(1); setBackgroundColor("rgba(255, 255, 255, 0.10)"); }} style={styles.menuButton}>
                    <Text style={[styles.menuText, {color: "#F87B36"}]}>{ occ.name }</Text>
                </TouchableOpacity> 
            ))

            }
            
        
        
        </View>

    );
};

const styles = StyleSheet.create({
        wrapper: {
            width: "100%",
            borderRadius: 10,
            backgroundColor: "rgba(255, 255, 255, 0.0)",
            borderColor: "white",
            borderWidth: 0.5,
            paddingTop: "1%",
            paddingBottom: "1%",
            alignItems: 'center',
            textAlignVertical: 'center'
        },
        menuButton: {
            width: "100%",
            paddingTop: "2%",
            paddingBottom: "2%",
            alignItems: 'center',
            textAlignVertical: 'center',
            color: "white"
        },
        menuText: {
            color: "white",
            fontSize: 24,
            fontWeight: "100"
        }
});

export default OccurancePicker;