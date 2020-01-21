import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {savePin} from '../../store/action/action';
import {getPin} from '../../pin/pingenerator';


interface PinProps { 
    pins: string ;
    generatePin: ()=> {};
}

// React.FC will take 0 or 1 arguments
const GenerateSavePin  = (props: PinProps) => {

    let dispatch = useDispatch();
    let [pins, setPins] = useState('');/* (props.pins !== null && props.pins!== undefined) ?
        props.pins.split(',').map(x => <input>{x}</input>): ''; */
    let pinUI: JSX.Element[]=[];

    useEffect(()=>{
        console.log('useEffect pin changed: ', pins);
    }, [pins])    

    return <div>
        { pins.split(',').map(x => <input value={x} />)}
        <button onClick={() => setPins(getPin().toString())
                        }>Generate</button>
        <button onClick={() => dispatch(savePin(pins))}>Save</button>
    </div>
}

let mapStateToProps = state => {
    return {
        pins: state.pins
    }
}

/* let mapDispatchToProps = dispatch => {
    return {
        generatePin: () => dispatch(generatePin())
    }

} */
export default GenerateSavePin;