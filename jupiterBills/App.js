import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

// All Screens
import HomeScreen  from './src/screens/HomeScreen';
import AddScreen  from './src/screens/AddScreen';
import OptionsScreen  from './src/screens/OptionsScreen';
import EditScreen  from './src/screens/EditScreen';
import HistoryScreen from './src/screens/HistoryScreen';

// React Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// CONTEXT - so all parts of app can see this
import {Provider} from './src/context/BillContext';


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
            edit: EditScreen,
            options: OptionsScreen,
            history: HistoryScreen

        }),        
    },

    // SETTINGS
    headerNavSettings

);

const App =  createAppContainer(stackNavigator);

// Provider wraps all components
export default () => {
    return (
        <Provider>
            <App/>
        </Provider>
    );
};
