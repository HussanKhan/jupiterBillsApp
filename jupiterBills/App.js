import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

// All Screens
import HomeScreen  from './src/screens/HomeScreen';
import AddScreen  from './src/screens/AddScreen';
import OptionsScreen  from './src/screens/OptionsScreen';
import EditScreen  from './src/screens/EditScreen';

// React Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// CONTEXT - so all parts of app can see this
// import { Provider as AuthProvider } from './src/context/AuthContext';

const headerNavSettings = {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}

// Switch Navigator - abrupt switch
const stackNavigator = createStackNavigator(
    
    // ROUTES
    {
        // Grouping of screens - Navigator within navigator
        mainFlow: createStackNavigator({
            
            home: {
                screen: HomeScreen,
                navigationOptions: {
                    header: null
                }
            },
            
            add: AddScreen,

            // Grouping of screens - Navigator within navigator
            optionFlow: createStackNavigator({
                options: OptionsScreen,
                edit: EditScreen
            }, headerNavSettings)

        }),        
    },

    // SETTINGS
    headerNavSettings

);

const App =  createAppContainer(stackNavigator);

// Provider wraps all components
export default () => {
    return (
        <App/>
    );
};
