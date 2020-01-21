import * as actionTypes from './actionTypes'

export const savePin = (pin) => {
    return {
        type: actionTypes.SAVE_PIN,
        pin: pin
    }
}

export const listPins = () => {
    return {
        type: actionTypes.LIST_PINS
    }
}