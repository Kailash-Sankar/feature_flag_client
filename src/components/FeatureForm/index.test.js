import { shallow } from "enzyme";
import React from "react";
import mock from "@mock/data";
import FeatureForm from "./index";

test("feature form", () => {
  const props = {
    products: mock.products,
    packages: mock.packages,
    onSubmit: mock.noop,
    reset: 0
  };
  const wrapper = shallow(<FeatureForm {...props} />);
  expect(wrapper).toMatchSnapshot();
});
