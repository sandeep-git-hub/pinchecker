import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePin } from '../../store/action/genSavPinAction';
import { getPin } from '../../pin/pingenerator';
//import {} from './generateSavePin.css';
import './generateSavePin.css';


interface PinProps {
    pins?: string;
    generatePin?: () => {};
}


const GenerateSavePin = (props: PinProps) => {

    let dispatch = useDispatch();
    let [pins, setPins] = useState('');
    useEffect(() => {
        console.log('useEffect pin changed: ', pins);
    }, [pins])
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
        <div className="actionItems">
            <button className='actionButton' onClick={() => setPins(getPin().toString())
            }>Generate</button>
            <button className='actionButton' id="save" onClick={() => dispatch(savePin(pins))}>Save</button>
        </div>
    </div>
}

export default GenerateSavePin;