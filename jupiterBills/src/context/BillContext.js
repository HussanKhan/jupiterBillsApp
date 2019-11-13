import {AsyncStorage} from 'react-native';
import createdataContext from './createDataContext';

// switch statement for actions, always return new state
const billReducer = (state, action) => {

    switch(action.type) {

        case "add_bill":
            const data = action.payload;
            AsyncStorage.setItem('@bills', JSON.stringify({ ...state, bills:[ ...state.bills, data ] }));
            return { ...state, bills:[ ...state.bills, data ] };

        case "get_bills":
            console.log("LOADED BILLS");
            return action.payload;

        case "delete_bill":
            AsyncStorage.setItem('@bills', JSON.stringify( { ...state, bills: state.bills.filter( bill => bill.id !== action.payload ) } ));
            return { ...state, bills: state.bills.filter( bill => bill.id.toString() !== action.payload.toString() ) };

        default:
            return state;
    };

};


// CALCULATES NEXT DUE DATE BASED ON OCCURANCE
const getNextDueDate = (dueDate, occurance) => {
    
    let nextDueDate = "";
    let dateArr = dueDate.split("-");
    let date = new Date();

    date.setMonth( parseInt(dateArr[0]) - 1 );
    date.setDate( parseInt(dateArr[1]) );
    date.setYear( parseInt(dateArr[2]) );

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

// Adds bill to state
const addBill = (dispatch) => {

    return (data) => {

        const id = Math.round(Math.random() * 100000000);
        const nextDueDate = getNextDueDate(data.dueDate, data.occurance);
        console.log(nextDueDate);
        dispatch({
            type: "add_bill",
            payload: {...data, id: id, active: 1, amountHistory: [], nextDueDate: nextDueDate}
        });

    };

};

// LOADS BILLS FROM MEM
const getBills = (dispatch) => {

    return async () => {
        const res = JSON.parse(await AsyncStorage.getItem('@bills'));
        console.log(res);
        dispatch({type: "get_bills", payload: res});
    };
};

// DELETES BILLS FROM STATE
const deleteBill = (dispatch) => {
    return (id) => {
        dispatch({type: "delete_bill", payload: id});
    };
};


// Modify Bill
// Adds bill to state
const modifyBill = (dispatch) => {

    return (data) => {

        // Delete bill
        dispatch({type: "delete_bill", payload: data.id });

        // Add new bill with new id
        const nextDueDate = getNextDueDate(data.dueDate, data.occurance);

        dispatch({
            type: "add_bill",
            payload: {...data, id: data.id, active: 1, amountHistory: [], nextDueDate: nextDueDate}
        });

    };

};

let initState = { bills: [

]} // starting state

// Export Provider
// (reducer, actions, defaultValue)
export const { Provider, Context } = createdataContext(
    billReducer,
    {addBill, getBills, deleteBill, modifyBill}, // functions to use reducer
    initState
);