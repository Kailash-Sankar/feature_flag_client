import { shallow } from "enzyme";
import SelectorPanel from "./index";
import {
  FeatureSelect,
  ProductSelect,
  CustomerSelect,
  PackageSelect
} from "./SelectFields";
import mock from "@mock/data";
import React from "react";

describe("Selector Panel", () => {
  const customerProps = {
    customers: mock.customers,
    customer: mock.customer,
    onCustomerChange: mock.noop
  };
  const productProps = {
    products: mock.products,
    product: mock.product,
    onProductChange: mock.noop
  };
  const featureProps = {
    features: mock.features,
    feature: mock.feature,
    onFeatureChange: mock.noop
  };
  const packageProps = {
    packages: mock.packages,
    pack: mock.pack,
    onPackageChange: mock.noop
  };

  test("customer select", () => {
    const wrapper = shallow(<CustomerSelect {...customerProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("product select", () => {
    const wrapper = shallow(<ProductSelect {...productProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("feature select", () => {
    const wrapper = shallow(<FeatureSelect {...featureProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("package select", () => {
    const wrapper = shallow(<PackageSelect {...packageProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("select wrapper", () => {
    const props = {
      ...customerProps,
      ...productProps,
      ...featureProps,
      ...packageProps
    };
    const wrapper = shallow(<SelectorPanel {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
