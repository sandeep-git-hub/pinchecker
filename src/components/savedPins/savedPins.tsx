import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkState, deleteItem, changeName } from '../../store/action/genSavPinAction'
import './savedPins.css';

const SavePins: React.FC = (props) => {

    let state = useSelector(state => state);
    let dispatch = useDispatch();
    console.log(`savedPins: state is ${JSON.stringify(state)}`);

    useEffect(() => {
        dispatch(checkState())
    }, []);

    let pintable, row;

    if (state !== undefined) {
        let namePlaceholder = 'Name';
        let pinList: string[] = state['listOfPins'];//.split('_');
        console.log(`savedPins ==> pinLIst : ${pinList}`);
        pintable = pinList.map(x => {
            row = x.split(',').map(y => <input key={y} value={y} />)
            return (<div key={'pin' + x.split(',')[0]}>
                <input placeholder={
                    x === state['element']?state['name']:namePlaceholder}
                    onChange={(event)=>dispatch(changeName(event, x))}/>
                    {row}<button className='button'
                     onClick={() => dispatch(deleteItem('pin' + x.split(',')[0], x))}>
                    Delete
                </button></div>)
        })

        console.log(pintable);
    }

    return (<div>
        {pintable}
    </div>)
}

export default SavePins;