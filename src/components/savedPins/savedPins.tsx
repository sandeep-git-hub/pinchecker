import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkState, deleteItem, onkeydown, onchangeName } from '../../store/action/genSavPinAction';
import './savedPins.css';

const SavePins: React.FC = (props) => {

    let state = useSelector(state => state);
    let dispatch = useDispatch();
    //console.log(`savedPins: state is ${JSON.stringify(state)}`);

    useEffect(() => {
        dispatch(checkState())
    }, []);

    let pintable, row;

    if (state !== undefined) {
        let namePlaceholder: any = 'Name';
        let pinList: string[] = state['listOfPins'];
        let names: Map<string, string> = new Map();
        //names.set
        //console.log(`state[names] : ${state['names']}`);
        state['names']?.map(a => {
            let b = a.split('_');
            return {key:b[0], val:b[1]};
        }).forEach(element => {
           names.set(element.key, element.val); 
        }); 

        //console.log(`names map : ${names}`);
        console.log(`savedPins : state -> ${JSON.stringify(state)}`)
        console.log(`savedPins ==> pinLIst : ${pinList}`);
        pintable = (pinList !== null && pinList !== undefined && pinList.length > 0) ? pinList.map(x => {
            row = x.split(',').map(y => <input className="inputPosition" key={y} value={y} />)
            namePlaceholder = names.get(x) 
            return (
                <div key={'pin' + x.split(',')[0]}>
                    <input style={{ height: '40px', width: '160px', padding: '0 0 0 20px', border: '1px solid #dbdbdb' }}
                        placeholder='Name' value={namePlaceholder}
                        onKeyDown={(event) => dispatch(onkeydown(event, x))} 
                        onChange={event => dispatch(onchangeName(event, x))}/>
                    {row}
                    <button className='deleteButton'
                        onClick={() => dispatch(deleteItem('pin' + x.split(',')[0], x))}>
                        Delete
                </button>
                </div>
            )
        }): (<div><p>{state['message']}</p></div>)

        //console.log(pintable);
    }

    return (<div className='center'>
        {pintable}
    </div>)
}

export default SavePins;