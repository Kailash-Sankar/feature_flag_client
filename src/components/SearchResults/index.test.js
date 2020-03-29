import { shallow } from "enzyme";
import React from "react";
import mock from "@mock/data";
import SearchResults from "./index";

test("Search Results", () => {
  const wrapper = shallow(<SearchResults result={mock.features} />);
  expect(wrapper).toMatchSnapshot();
});
