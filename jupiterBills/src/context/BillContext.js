import {AsyncStorage} from 'react-native';
import createdataContext from './createDataContext';

// switch statement for actions, always return new state
const billReducer = (state, action) => {

    switch(action.type) {

        case "add_bill":
            const data = action.payload;
            return { ...state, bills:[ ...state.bills, data ], history:[...state.history, {category: action.payload.cat, name: data.name}] };

        case "get_bills":
            console.log("LOADED BILLS");
            return action.payload;

        case "save_bills":
            AsyncStorage.setItem('@bills', JSON.stringify(state));
            return state;

        case "pay_bill":
            return { ...state, bills: state.bills.map( (bill) => {
                
                if (bill.id == action.payload.id) {
                    bill.dueDate = action.payload.newDueDate;
                    bill.nextDueDate = action.payload.newNextDueDate;
                };
                
                return bill;
            
            } ), history:[...state.history, {category: action.payload.cat, name: action.payload.name}] };

        case "delete_bill":
            if (action.payload.name) {
                return { ...state, bills: state.bills.filter( bill => bill.id.toString() !== action.payload.id.toString() ), history:[...state.history, {category: action.payload.cat, name: action.payload.name}] };
            } else {
                return { ...state, bills: state.bills.filter( bill => bill.id.toString() !== action.payload.id.toString() ) };
            };

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

// Sorts bills in order by date
const sortBills = (bills) => {
    // SORT BILLS IN ORDER BY DATE
    let tempState = [];
    let tempArr = [];

    for (let i = 0; bills.length > i; i++) {
        tempArr.push(parseInt(bills[i].dueDate.split("-")[1]));
    };
    
    tempArr.sort((a, b) => {return a - b;});

    for (let i = 0; tempArr.length > i; i++) {
        for (let j = 0; bills.length > j; j++) {
            const date = parseInt(bills[j].dueDate.split("-")[1]);
            if (date == tempArr[i] && !tempState.includes(bills[j])) {
                tempState.push(bills[j]);
            };
        };
    };

    return tempState;

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
            payload: {...data, id: id, active: 1, amountHistory: [], nextDueDate: nextDueDate, cat: "Added"}
        });

        dispatch({type: "save_bills", payload: ""});

    };

};

// LOADS BILLS FROM MEM
const getBills = (dispatch) => {

    return async () => {
        let res = JSON.parse(await AsyncStorage.getItem('@bills'));

        if (!res) {
            res = initState;
        };

        console.log(res);

        res.bills = sortBills(res.bills);

        dispatch({type: "get_bills", payload: res});
    };
};

// DELETES BILLS FROM STATE
const deleteBill = (dispatch) => {
    return (data) => {
        data.cat = "Deleted";
        dispatch({type: "delete_bill", payload: data});
        dispatch({type: "save_bills", payload: ""});
    };
};

// CHNAGES DUE DATE TO NEXT DUE DATE
const payBill = (dispatch) => {
    return (bill) => {
        
        // increment dates
        let newDueDate = bill.nextDueDate;
        let newNextDueDate = getNextDueDate(newDueDate, bill.occurance);

        dispatch({type: "pay_bill", payload: {id: bill.id, newDueDate, newNextDueDate, name: bill.name, cat: "Paid"}});
        dispatch({type: "save_bills", payload: ""});
    };
};

// Modify Bill
// Adds bill to state
const modifyBill = (dispatch) => {

    return (data) => {

        // Delete bill
        dispatch({type: "delete_bill", payload: {id: data.id} });

        // Add new bill with new id
        const nextDueDate = getNextDueDate(data.dueDate, data.occurance);

        dispatch({
            type: "add_bill",
            payload: {...data, id: data.id, amountHistory: [], nextDueDate: nextDueDate, cat: "Modified"}
        });
        dispatch({type: "save_bills", payload: ""});

    };

};

const clearAsyncStorage = (dispatch) => {
    return async () => {
        await AsyncStorage.clear();
    };
}

let initState = { bills: [

], history: []}; // starting state

// Export Provider
// (reducer, actions, defaultValue)
export const { Provider, Context } = createdataContext(
    billReducer,
    {addBill, getBills, deleteBill, modifyBill, payBill, clearAsyncStorage}, // functions to use reducer
    initState
);