import React, {useReducer} from 'react';

// frameword for context

export default (reducer, actions, defaultValue) => {

    const Context = React.createContext();

    const Provider = (props) => { // wrapper main app, and rerenders childern throigh itself

        const [state, dispatch] = useReducer(reducer, defaultValue); // reducer is just a bunch of switch statement
        
        // init - Loop throw all possible actions and send needed one to reducer
        const boundActions = {};
        
        // Loop through dict
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch); // calling function returns fucntion to use, give dispatch fucntion to each
        };

        // return chuildern with provder wrapper

        // all possbile actions are sent to childern in value
        return (
            <Context.Provider value={{state: state, ...boundActions}}>
                {props.children}
            </Context.Provider>
        );

    };

    return { Context: Context, Provider: Provider}; // return component
};