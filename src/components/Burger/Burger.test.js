import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Burger from '../../components/Burger/Burger'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

configure({adapter: new Adapter()});
let wrapper


describe('<Burger/>', () => {

    beforeEach(() => {
        wrapper = shallow(<Burger ingredients={{
            salad: 0, bacon: 0, cheese: 0, meat: 0
        }}/>)
    })

    it('it should render 4 burger ingredients when receiving ingredients', () => {
        wrapper.setProps({
            ingredients: {salad: 0, bacon: 1, cheese: 1, meat: 0},
        });
        expect(wrapper.find(BurgerIngredient)).toHaveLength(4);
    });

    it('it should render 2 burger ingredients when receiving ingredients', () => {
        expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
    });
})
