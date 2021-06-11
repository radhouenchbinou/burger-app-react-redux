import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

configure({adapter: new Adapter()});
let wrapper


describe('<BurgerBuilder/>', () => {

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}}
                                         initPurchase={() => {}}/>)
    })

    it('it should render build controls when receiving ingredients', () => {
        wrapper.setProps({
            ingredients: {salad: 0, bacon: 1, cheese: 1, meat: 0},
        });
        wrapper.setState({
            puchasing: true
        })
        expect(wrapper.find(BuildControls)).toHaveLength(1);
        expect(wrapper.find(Burger)).toHaveLength(1);
        expect(wrapper.find(OrderSummary)).toHaveLength(1);
    });
})
