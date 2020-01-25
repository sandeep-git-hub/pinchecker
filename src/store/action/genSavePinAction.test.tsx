import * as actions from './genSavPinAction';
import * as actionTypes from './actionTypes';
import sinon from 'sinon';

describe('generate save pin action', () => {
    it('save pin null', () => {
        expect(actions.savePin(null)).toEqual({ type: actionTypes.SAVE_PIN, pin: null });
    })

    it('save pin', () => {
        expect(actions.savePin('13579,24680,14702,13257,93748')).toEqual({ 
            type: actionTypes.SAVE_PIN, 
            pin: '13579,24680,14702,13257,93748' 
        });
    })

    it('list pins', () => {
        expect(actions.listPins()).toEqual({type: actionTypes.LIST_PINS});
    })

    it('delete Items', () => {
        expect(actions.deleteItem('pin13579', '13579,24680,14702,13257,93748')).toEqual({
            type: actionTypes.DELETE_PINS,
            id: 'pin13579',
            pinSet: '13579,24680,14702,13257,93748'
        })
    })

    it('check state empty session', () => {
        expect(actions.checkState()).toEqual({
            type: actionTypes.LIST_PINS,
            message: 'There are no saved pins currently'
        })
    })

    it('check state non-empty session', () => {
        let mock = sinon.stub(Storage.prototype, 'getItem');
        mock.withArgs('listOfPins').returns('13245,15346,45332,68435,92843_18362,98472,83721,92847,92832');
        mock.withArgs('pin').returns('13245,15346,45332,68435,92843');
        mock.withArgs('names').returns('13245,15346,45332,68435,92843_pin1-18362,98472,83721,92847,92832_pin2')
        //expect(mock.callCount).toEqual(3);
        /* spyOn(window.localStorage, 'getItem').and.callFake(key => {
            console.log(`key ${key}`);
            if (key === 'listOfPins'){
                return '13245,15346,45332,68435,92843_18362,98472,83721,92847,92832'
            } else if (key === 'pin'){
                return '13245,15346,45332,68435,92843';
            } else if (key === 'names') {
                return '13245,15346,45332,68435,92843_pin1-18362,98472,83721,92847,92832_pin2';
            }
        }) */
        expect(actions.checkState()).toEqual({
            type: actionTypes.SAVED_PINS,
            list: ['13245,15346,45332,68435,92843','18362,98472,83721,92847,92832'],
            pin: '13245,15346,45332,68435,92843',
            names: ['13245,15346,45332,68435,92843_pin1','18362,98472,83721,92847,92832_pin2']
        })

    })
})