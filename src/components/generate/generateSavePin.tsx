import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePin } from '../../store/action/genSavPinAction';
import { getPin } from '../../pin/pingenerator';
//import {} from './generateSavePin.css';
import './generateSavePin.css';


interface PinProps {
    pins: string;
    generatePin: () => {};
}

// React.FC will take 0 or 1 arguments
const GenerateSavePin = (props: PinProps) => {

    let dispatch = useDispatch();
    let [pins, setPins] = useState('');
    let state = useSelector(state => state);
    console.log(`state: ${JSON.stringify(state)}`);
    useEffect(() => {
        console.log('useEffect pin changed: ', pins);
    }, [pins])
    console.log('pins ==> ', pins)
    return <div className='center'>
        {(pins !== '') ? <div>{pins.split(',').map(x => {
            return <input type='text' /* style={inputStyle} */ className='inputPosition' key={x} value={x} />
        }
        )
        }</div> :
            <div>
                <input className='inputPosition' />
                <input className='inputPosition' />
                <input className='inputPosition' />
                <input className='inputPosition' />
                <input className='inputPosition' />
            </div>}
        <br />
        <button className='buttonmargin' onClick={() => setPins(getPin().toString())
        }>Generate</button>
        <button onClick={() => dispatch(savePin(pins))}>Save</button>
    </div>
}

export default GenerateSavePin;