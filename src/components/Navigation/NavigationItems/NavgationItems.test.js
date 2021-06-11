import React from 'react'

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()});
let wrapper

beforeEach(() => {
    wrapper = shallow(<NavigationItems isAuthenticated={false}/>);

})

describe('<NavigationItems/>', () => {
    it('should render two <NavigationItem/> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        expect(!wrapper.props.isAuthenticated)
    });
    it('should render three <NavigationItem/> if authenticated', () => {
        wrapper.setProps({
            isAuthenticated: true
        })
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
        expect(wrapper.props.isAuthenticated)
    });
    it('should render logout button if authenticated', () => {
        wrapper.setProps({
            isAuthenticated: true
        })
        expect(wrapper.contains(<NavigationItem link='/'>Logout</NavigationItem>)).toEqual(true);
        expect(wrapper.props.isAuthenticated)
    });
})
