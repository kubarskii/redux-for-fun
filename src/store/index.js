import {createStore} from "redux";

const defaultState = {
    value: 0,
    name: 'dasdasd',
};

export const actionTypes = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
}

export const incrementAction = function (increment) {
    return {
        type: actionTypes.INCREMENT,
        payload: {increment}
    }
};
export const decrementAction = (increment) => ({type: actionTypes.DECREMENT, payload: {increment}});

const counterReducer = (prevState = defaultState, action) => { // action = {type: "", payload: { .... }}
    const {type, payload} = action;
    switch (type) {
        case(actionTypes.INCREMENT):
            return {
                ...prevState,
                value: prevState.value + ((payload.increment) ? payload.increment : 1),
            }
        case(actionTypes.DECREMENT):
            return {
                ...prevState,
                value: prevState.value - ((payload.increment) ? payload.increment : 1),
            }
        default:
            return prevState;
    }
}

export const store = createStore(counterReducer)