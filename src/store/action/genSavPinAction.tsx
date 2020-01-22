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

export const deleteItem = (id, elements) => {
    return {
        type: actionTypes.DELETE_PINS,
        id: id,
        pinSet: elements
    }
}

export const checkState = () => {
    let pinList = localStorage.getItem('listOfPins');
    let pin = localStorage.getItem('pin');
    if (pinList && pin) {
        return {
            type: actionTypes.SAVED_PINS,
            list: pinList.split('_'),
            pin: pin
        }    
    }
    return {
        type: actionTypes.LIST_PINS
    }
}

export const changeName = (event, element) => {
    return {
        type: actionTypes.NAME_CHANGE,
        element,
        name: event.target.value
    }
}