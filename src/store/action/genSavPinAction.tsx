import * as actionTypes from './actionTypes';

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
    let names = localStorage.getItem('names')?.split('-'); // pinset1-pinset2-pinset3.. each pinset is 123,234,456,222_name format
    if (pinList && pin) {
        return {
            type: actionTypes.SAVED_PINS,
            list: pinList.split('_'),
            pin: pin,
            names: names
        }    
    } 
    return {
        type: actionTypes.LIST_PINS,
        message: 'There are no saved pins'
    }
}

export const onchangeName = (event, element) => {
    //event.key="Enter";
    return onkeydown(event, element);
}

export const onkeydown = (event, element) => {
    let names: string[] = [];
    let name = null;
    console.log(`changeNameAction event ${event.key}`);
    if(event.key == 'Enter'){
        console.log(`changeNameAction value: ${event.target.value}`);
        names.push(event.target.value);
        name = event.target.value;
    }
    return {
        type: actionTypes.NAME_CHANGE,
        element,
        name: name
    }
}