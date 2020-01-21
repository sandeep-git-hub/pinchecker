import * as actionTypes from '../action/actionTypes';
import {getPin} from '../../pin/pingenerator';

const initialState = {
    pin: ''
}

const listPins = (state, action) => {
    return state;
}

const savePin = (state, action) => {
    console.log('savePin: ', action.pin);
    return {
        ...state,
        pin: action.pin
    };
}

export const reducer = (state=initialState, action: {type: string}) => {

    switch(action.type) {
        case actionTypes.LIST_PINS: {
            return listPins(state, action);
        };
        case actionTypes.SAVE_PIN: {
            return savePin(state, action);
        }
    }
}