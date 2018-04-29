import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({
    adapter: new Adapter()
});

describe("<BurgerBuilder />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder 
            onInitIngredients={() => { }}
            ingredients= {{ testIngredient: 0 }}
            totalPrice={0}
            onIngredientAdded={() => { }}
            onIngredientRemoved={() => { }}
            onInitPurchase={() => { }}
            error={false}  />);
    });

    it("should render <BuildControls /> when receiving ingredients", () => {
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});