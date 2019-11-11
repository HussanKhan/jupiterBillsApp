import {AsyncStorage} from 'react-native';
import createdataContext from './createDataContext';

// switch statement for actions, always return new state
const billReducer = (state, action) => {

    switch(action.type) {

        case "add_bill":
            const data = action.payload;
            // console.log({ ...state, bills:[ ...state.bills, data ] });
            return { ...state, bills:[ ...state.bills, data ] };

        case "delete_bill":
            return state;

        default:
            return state;
    };

};


const getNextDueDate = (dueDate, occurance) => {
    
    let nextDueDate = "";
    let dateArr = dueDate.split("-");
    let date = new Date();

    date.setMonth( parseInt(dateArr[0]) - 1 );
    date.setDate( parseInt(dateArr[1]) );
    date.setYear( parseInt(dateArr[2]) );
    console.log("==========");
    console.log(occurance);
    console.log(dueDate);
    

    // date.setMonth(date.getMonth() + 1); // get next month
    // console.log(date.getMonth() + 1); // get next month number

    switch (occurance) {

        case "Monthly":
            date.setMonth(date.getMonth() + 1); // get next month
            // console.log(date.getMonth() + 1); // get next month number
            nextDueDate = `${date.getMonth() + 1}-${dateArr[1]}-${dateArr[2]}`;
            console.log(nextDueDate);
            break;

        case "One Time Only":
            nextDueDate = null;
            console.log(nextDueDate);
            break;

        case "Weekly":
            date.setDate(date.getDate() + 7);
            nextDueDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            console.log(nextDueDate);
            break;

        case "Every Two Weeks":
            date.setDate(date.getDate() + 14);
            nextDueDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            console.log(nextDueDate);
            break;

        case "Every Two Months":
            date.setMonth(date.getMonth() + 2);
            nextDueDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            console.log(nextDueDate);
            break;

        case "Quarterly":
            date.setMonth(date.getMonth() + 3);
            nextDueDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            console.log(nextDueDate);
            break;

        case "Every Six Months":
            date.setMonth(date.getMonth() + 6);
            nextDueDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            console.log(nextDueDate);
            break;

        case "Yearly":
            date.setYear(date.getFullYear() + 1);
            nextDueDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            console.log(nextDueDate);
            break;
        
        default:
            break;
    };

    return nextDueDate;

};

// functions to call reducer

const addBill = (dispatch) => {

    return (data) => {

        getNextDueDate(data.dueDate, "Monthly");
        getNextDueDate(data.dueDate, "One Time Only");
        getNextDueDate(data.dueDate, "Weekly");
        getNextDueDate(data.dueDate, "Every Two Weeks");
        getNextDueDate(data.dueDate, "Every Two Months");
        getNextDueDate(data.dueDate, "Quarterly");
        getNextDueDate(data.dueDate, "Every Six Months");
        getNextDueDate(data.dueDate, "Yearly");
        


        const id = Math.round(Math.random() * 100000000);
        
        dispatch({
            type: "add_bill",
            payload: {...data, id: id, active: 1, amountHistory: []}
        });

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
        dueDate: "11-3-2019",
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 2,
        name: 'Vonage',
        amount: 75.77,
        dueDate: "11-4-2019",
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 3,
        name: 'Car Insurance',
        amount: 115.77,
        dueDate: "11-6-2019",
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 4,
        name: 'Electricity',
        amount: 134.77,
        dueDate: "11-8-2019",
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 5,
        name: 'Sling TV',
        amount: 45.99,
        dueDate: "11-10-2019",
        occurance: "monthly",
        amountHistory: [{month: 11, amount: 78.99}],
        active: 1
    },
    {
        id: 6,
        name: 'Chase Credit Card',
        amount: 75.00,
        dueDate: "11-15-2019",
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