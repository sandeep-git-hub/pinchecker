import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Link, Route } from 'react-router-dom';

//configures enzyme to work with react using this adapter
configure({adapter: new Adapter()});

describe('App.tsx', () => {

  let wrapper;
  beforeEach(()=> {
    wrapper = shallow(<App />);
  })

  it('test app', () => {
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Route)).toHaveLength(2);
  })

})

/* test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */
