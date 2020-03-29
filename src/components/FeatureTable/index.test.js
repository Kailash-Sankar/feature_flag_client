import { shallow } from "enzyme";
import React from "react";
import mock from "@mock/data";

import FeatureTable, {
  StatusSelector,
  FeatureBar,
  RenderHeader
} from "./index";

describe("Feature Table", () => {
  test("status selector", () => {
    const wrapper = shallow(
      <StatusSelector fid="ff_one" value={0} onChange={mock.noop} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("feature bar editable", () => {
    const wrapper = shallow(
      <FeatureBar
        feature={mock.features[0]}
        pos={0}
        onUpdate={mock.noop}
        readOnly={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("feature bar readonly", () => {
    const wrapper = shallow(
      <FeatureBar
        feature={mock.features[0]}
        pos={0}
        onUpdate={mock.noop}
        readOnly={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("render header", () => {
    const wrapper = shallow(<RenderHeader data={mock.features[0]} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("table", () => {
    const props = {
      features: mock.features,
      updateFeatures: mock.noop,
      readOnly: false
    };
    const wrapper = shallow(<FeatureTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
