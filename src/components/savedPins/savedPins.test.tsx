import React from 'react';
import * as reactRedux from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { configure, mount, ReactWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {render, fireEvent} from '@testing-library/react';
import SavedPins from './savedPins';
import sinon from 'sinon';
import * as savePinAction from '../../store/action/genSavPinAction';


configure({adapter: new Adapter()})

describe('saved pins component', () => {
    let wrapper: ReactWrapper;
    let middleware = [thunk];
    let store = configureMockStore(middleware)();

    beforeEach(() => {
        wrapper = mount(<reactRedux.Provider store={store}><SavedPins /></reactRedux.Provider>)
    });
    afterEach(() => {
        wrapper.unmount();
    })

    it('test savedpins - no saved pins', () => {
        expect(wrapper.children.length).toEqual(1);
    })
    
    it('test savedpins - one saved pins', () => {
        /* wrapper.setState({names: ['13579,12121,13421,53672,14267_firstPin']}); - cannot be called on functional components */
        let mockStore = configureMockStore(middleware)({
            names: ['13579,12121,13421,53672,14267_firstPin'], 
            listOfPins: ['13579,12121,13421,53672,14267'],
            message: 'no pins'
        });
        let {container} = render(<reactRedux.Provider store={mockStore}><SavedPins /></reactRedux.Provider>);
        console.log(container.firstElementChild.innerHTML);
        expect(container.firstElementChild.firstElementChild.children.length).toEqual(7);
    })
    
    it('test savedpins - two saved pins', () => {
        let mockStore = configureMockStore(middleware)({
            names: ['13579,12121,13421,53672,14267_firstPin', '51451,46536,56437,96873,15367_secondPin'], 
            listOfPins: ['13579,12121,13421,53672,14267', '51451,46536,56437,96873,15367'],
            message: 'no pins'
        });
        let {container} = render(<reactRedux.Provider store={mockStore}><SavedPins /></reactRedux.Provider>);
        console.log(container.firstElementChild.innerHTML);
        expect(container.firstElementChild.children.length).toEqual(2)
        expect(container.firstElementChild.firstElementChild.children.length).toEqual(7);
    })

    it('test savedpins - delete saved pins', () => {
        let mockStore = configureMockStore(middleware)({
            names: ['13579,12121,13421,53672,14267_firstPin', '51451,46536,56437,96873,15367_secondPin'], 
            listOfPins: ['13579,12121,13421,53672,14267', '51451,46536,56437,96873,15367'],
            message: 'no pins'
        });
        let {container} = render(<reactRedux.Provider store={mockStore}><SavedPins /></reactRedux.Provider>);
        expect(container.firstElementChild.children.length).toEqual(2);
        let deleteButton = container.firstElementChild.firstElementChild.lastElementChild;
        let deleteSpy = sinon.stub(savePinAction, 'deleteItem');
        deleteSpy.returns({"id": "", "pinSet": "", "type": "DELETE_PINS"});
        fireEvent.click(deleteButton);
        console.log(container.firstElementChild.innerHTML);
        expect(mockStore.dispatch(savePinAction.deleteItem('',''))).toEqual({"id": "", "pinSet": "", "type": "DELETE_PINS"});
        expect(container.firstElementChild.firstElementChild.children.length).toEqual(7);
    })

})