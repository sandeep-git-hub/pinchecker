import * as actionTypes from '../action/actionTypes';

const initialState = {
    pin: '',
    listOfPins: [],
    message: ''
}

const listPins = (state, action) => {
    return {...state,message: action.message};
}

const savePin = (state, action) => {
    console.log('savePin: ', action.pin);
    let pinList : string [] = state.listOfPins;
    let message = '';
    if (pinList.find(x => x === action.pin) === undefined && action.pin !== null){
        pinList = pinList.concat(action.pin);
    }
    localStorage.setItem('listOfPins', pinList.join('_'));
    localStorage.setItem('pin', action.pin);
    return {
        ...state,
        listOfPins: pinList,
        pin: action.pin,
        message
    };
}
// action - type, id, pinSet
let deletePinSet = (state, action) => {
    //
    let pinList = state.listOfPins;
    console.log('reducer => pinList: ' + JSON.stringify(pinList));
    let message: string|null = null;
    pinList = pinList.filter(x => x !== action.pinSet);
    localStorage.setItem('listOfPins', pinList.join('_'));
    let names: any = localStorage.getItem('names');
    names = names?.split('-');
    names = names?.filter(x => !x.includes(action.pinSet));
    if (names) {
        localStorage.setItem('names', names.join('-'));
    }
        
    if (pinList.length === 0){
        message = 'There are no saved pins currently';
    }
    return {
        ...state,
        listOfPins: pinList,
        message: message
    }
}

export const persistStateReducer = (state, action) => {
    return {
        ...state,
        listOfPins: action.list,
        names: action.names
    }
}

export const nameChange = (state, action) => {
    //4501,4502,4507,4510,4526_1111-1201,1205,1202,1213,1215_66
    let names: string[] | undefined = localStorage.getItem('names')? localStorage.getItem('names')?.split('-'): [];
    if (action.name !== null)
        names?.push(action.element + '_' + action.name);
    if(names !== undefined) {
        let count=0;let index: number[]=[];
        for(let x=0; x< names.length; x++) {
            if (names[x].includes(action.element)) {
                index.push(x);
                count=count + 1;
                if (count > 1) {
                    names.splice(index[0], 1);
                    index.splice(0);
                }
            }
        }
        localStorage.setItem('names', names.join('-'));
    }
    return {
        ...state,
        name: action.name,
        element: action.element,
        names: names
    }
}



export const reducer = (state=initialState, action: {type: string}) => {

    switch(action.type) {
        case actionTypes.LIST_PINS: 
            return listPins(state, action);
        case actionTypes.SAVE_PIN: 
            return savePin(state, action);
        case actionTypes.SAVED_PINS: 
            return persistStateReducer(state, action);
        case actionTypes.DELETE_PINS: 
            return deletePinSet(state, action);
        case actionTypes.NAME_CHANGE: 
            return nameChange(state, action);
        default:
            return listPins(state, action);
    }
}