import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
//import { render, fireEvent } from 'react-testing-library';
import GenerateSavePin from './generateSavePin';
import * as reactRedux from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';

configure({adapter: new Adapter()});


describe('generate and save pin tests', () => {
    let wrapper: ReactWrapper;
    let middleware = [thunk];
    let store = configureMockStore(middleware)();
    beforeEach(() => {
        wrapper = mount(<reactRedux.Provider store={store}><GenerateSavePin /></reactRedux.Provider>);
    })
    afterEach(() => {
        wrapper.unmount();
    })
    
    it('check div', () => {     
        expect(wrapper.findWhere(node => node.prop('className') === 'center')).toHaveLength(1);
    })

    it('check the number of inputs', () => {
        expect(wrapper.findWhere(node => node.prop('className') === 'inputPosition')).toHaveLength(5);
    })

    it('check the number of inputs with pins', () => {
        const {container} = render(<reactRedux.Provider store={store}><GenerateSavePin /></reactRedux.Provider>);
        const generatePinButton = container.firstElementChild?.lastElementChild?.firstElementChild;
        if (generatePinButton !== null && generatePinButton !== undefined) {
            fireEvent.click(generatePinButton);
        }
        expect(container.firstElementChild?.childNodes.length).toEqual(3);
    })

    it('check the save pins', () => {
        const {container} = render(<reactRedux.Provider store={store}><GenerateSavePin /></reactRedux.Provider>);
        const generatePinButton = container.firstElementChild?.lastElementChild?.firstElementChild;
        const savePinButton = container.firstElementChild?.lastElementChild?.lastElementChild;
        if (generatePinButton !== null && generatePinButton !== undefined &&
            savePinButton !== null && savePinButton !== undefined) {
            fireEvent.click(generatePinButton);
            fireEvent.click(savePinButton);
        }
        expect(container.firstElementChild?.firstElementChild?.childNodes.length).toEqual(5);
    })
})
