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

let initState = { bills: [
    {
        id: 1,
        name: 'Comcast',
        amount: 45.77,
        dueDate: 8,
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 2,
        name: 'Vonage',
        amount: 75.77,
        dueDate: 12,
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 3,
        name: 'Car Insurance',
        amount: 115.77,
        dueDate: 19,
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 4,
        name: 'Electricity',
        amount: 134.77,
        dueDate: 22,
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 5,
        name: 'Sling TV',
        amount: 45.99,
        dueDate: 25,
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 6,
        name: 'Chase Credit Card',
        amount: 75.00,
        dueDate: 28,
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    }
]} // starting state

// Export Provider
// (reducer, actions, defaultValue)
export const { Provider, Context } = createdataContext(
    billReducer,
    {addBill}, // functions to use reducer
    initState
);