import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });


/** 
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @params {object} props - Componenet props specific to this setup.
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given dat-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShadowWrapper}
 */

 const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
 }

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});




test('renders counter display', () =>  {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0)
  
  
});
describe('Increment', () => {
  
  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  });
  test('clicking button incremeants counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter })
    
    // Find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();
    
    // Find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1)
  })
})

describe('Decrement', () => {
  
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  })
  test('clicking button decremeant counter display when state is greater than 0', () => {
    const counter = 7;
    const wrapper = setup(null, { counter })
  
    // Find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();
  
    // Find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });
  // make sure error doesn't show by default
  test('error does not show when not needed', () => {
    // implement this using hidden class for the error div
    const wrapper = setup();
    const errorDiv = findByTestAttr(wrapper, 'error-message');
    
    // using enzyme's ".hasClass()" method
    const errorHasHiddenClass = errorDiv.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true);
  });
});

describe('counter is 0 and decrement is clicked', () =>{

  // scoping wrapper to the describe, so it can be used in beforeEach and the tests
  let wrapper
  beforeEach(()=> {
    // no need to set counter value here; default value of 0 is good
    wrapper = setup();

    // Find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    test('error is showing', () => {
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(false);  
    })
    test('conter displays 0', () => {
      const counterDisplay = findByTestAttr(wrapper, 'counter-display');
      expect(counterDisplay.text()).toContain(0); 
    })
    test('clicking increment clears the error ', () => {
      const button = findByTestAttr(wrapper, 'increment-button');
      button.simulate('click');

      const errorDiv = findByTestAttr(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(true);  
    });
  });
});





