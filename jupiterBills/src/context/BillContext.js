import {AsyncStorage} from 'react-native';
import createdataContext from './createDataContext';

// switch statement for actions, always return new state
const billReducer = (state, action) => {

    switch(action.type) {

        case "add_bill":
            return state;

        case "delete_bill":
            return state;

        default:
            return state;
    };

};

// functions to call reducer

const addBill = (dispatch) => {

    return (data) => {

        // 1 - try sign in
        // 2 - change satte to reflect sign in
        // 2 - if error, return in

    };

};

// Export Provider
// (reducer, actions, defaultValue)
export const { Provider, Context } = createdataContext(
    billReducer,
    {addBill}, // functions to use reducer
    {bills: []} // starting state
);