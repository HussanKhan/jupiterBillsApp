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

    date.setMonth(date.getMonth() + 1); // get next month
    console.log(date.getMonth() + 1); // get next month number

    switch (occurance) {

        case "Monthly":
            dateArr = dueDate.split("-");

            monthIncr = 1;
            nextMonth = parseInt(dateArr[0]) + monthIncr;

            if (nextMonth > 12) {
                nextMonth = 0 + monthIncr;
            };
            
            date.setMonth(date.getMonth() + 1);
            nextDueDate = `${nextMonth}-${dateArr[1]}-${dateArr[2]}`;

            console.log(nextDueDate);

        case "One Time Only":
            nextDueDate = null;
            console.log(nextDueDate);

        case "Weekly":
            // Month starts at 0
            // set month, day and year before adding
            let date = new Date();
            date.setMonth(10);
            date.setDate(10);
            date.setYear(2019);
            date.setDate(date.getDate() + 7);
            // Create new Date instance
            let dateWeekly = new Date();
            dateWeekly.setDate(dueDate);

            dateWeekly.setDate(dateWeekly.getDate() + 7);
            
            nextDueDate = dateWeekly.getDate();

            console.log(nextDueDate);

        case "Every Two Weeks":
            let dateTwoWeeks = new Date()
            dateTwoWeeks.setDate(dueDate);

            dateTwoWeeks.setDate(dateTwoWeeks.getDate() + 14);
            
            nextDueDate = dateTwoWeeks.getDate();
            console.log(nextDueDate);

        case "Every Two Months":
            dateArr = dueDate.split("-");
            monthIncr = 2;
            nextMonth = parseInt(dateArr[0]) + monthIncr;

            if (nextMonth > 12) {
                nextMonth = 0 + monthIncr;
            };

            nextDueDate = `${nextMonth}-${dateArr[1]}-${dateArr[2]}`;
    
            console.log(nextDueDate);

        case "Quarterly":
            dateArr = dueDate.split("-");
            monthIncr = 3;
            nextMonth = parseInt(dateArr[0]) + monthIncr;

            if (nextMonth > 12) {
                nextMonth = 0 + monthIncr;
            };

            nextDueDate = `${nextMonth}-${dateArr[1]}-${dateArr[2]}`;
    
            console.log(nextDueDate);

        case "Every Six Months":
            dateArr = dueDate.split("-");
            monthIncr = 6;
            nextMonth = parseInt(dateArr[0]) + monthIncr;

            if (nextMonth > 12) {
                nextMonth = 0 + monthIncr;
            };

            nextDueDate = `${nextMonth}-${dateArr[1]}-${dateArr[2]}`;
             
            console.log(nextDueDate);

        case "Yearly":
            dateArr = dueDate.split("-");
            nextYear = parseInt(dateArr[2]) + 1;

            nextDueDate = `${dateArr[0]}-${dateArr[1]}-${nextYear}`;
                 
            console.log(nextDueDate);
        
        default:
            break;
    };

    return nextDueDate;

};

// functions to call reducer

const addBill = (dispatch) => {

    return (data) => {

        getNextDueDate(data.dueDate, "fugfud");

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