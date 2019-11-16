import React, { PureComponent } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

import GearMenu from "@components/GearMenu";
// import Banner from "@components/Banner";
import UnitToggle from "@components/UnitToggle";
import Tooltip from "@components/Tooltip";
import ErrorBoundary from "@components/ErrorBoundary";
import EmptyPlaceholder from "@components/EmptyPlaceholder";
import Arrow from "@components/Arrow";
import MultiSelectDropDown from "@components/MultiSelectDropDown";
import BaiscModal from "@components/BasicModal";
import ModalMask from "@components/ModalMask";
import Footer from "@components/Footer";
import FilterName from "@components/FilterName";
import AdTechToggle from "@components/AdTechToggle";
import ShareMenu from "@components/ShareMenu";
import CombinationFilter from "@components/CombinationFilter";
import Trend from "@components/Trend";
import getColor from "@utils/Colors";

// usage examples
import * as Demo from "./demo";

class Main extends PureComponent {
  render() {
    return (
      <div className="showcase">
        <h1 className="header">React Boilerplate</h1>
        <div className="row">
          <Label>DropDown</Label>
          <GearMenu />
          <Spacer />
          <MultiSelectDropDown />
          <Spacer />
          <ShareMenu />
        </div>
        <div className="row">
          <Label>Button Group</Label>
          <UnitToggle />
          <Spacer />
          <AdTechToggle />
        </div>
        <div className="row">
          <Label>Tooltips</Label>
          <Tooltip
            style={{ width: 100 }}
            text="this string will be having ellipsis"
          />
          <Tooltip text="no ellipsis or tooltip" />
          <Tooltip text="forced tooltip through title" title="Hello" />
        </div>
        <div className="row">
          <Label>Modal and Mask</Label>
          <BaiscModal />
          <Spacer />
          <ModalMaskTest />
        </div>
        <div className="row">
          <Label>Loading Wrapper</Label>
          <Demo.Loading />
        </div>
        <div className="row">
          <Label>Filter</Label>
          <FilterName name="Roku__AND__New York, United States" />
          <br /> <br />
          <CombinationFilter
            name="test1__OR__test2__AND__test3__OR__test4"
            index={0}
            metric={{ short: "test_str" }}
          />
          <Spacer />
          <CombinationFilter
            name="alpha__OR__beta__AND__gamma"
            index={3}
            actionHandler={{ getColor: getColor }}
          />
        </div>
        <div className="row">
          <Label>Datepicker</Label>
          <Demo.Date showTime={true} showShortcuts={true} range={true} />
          <Spacer />
          <Demo.Date showTime={false} showShortcuts={true} range={true} />
          <Spacer />
          <Demo.Date showTime={false} showShortcuts={false} range={true} />
          <Spacer />
          <Demo.Date showTime={true} showShortcuts={false} range={false} />
          <Spacer />
        </div>
        <div className="row">
          <Label>Search Input</Label>
          <Demo.SI allowTyping={false} />
          <Spacer />
          <Demo.SI allowTyping={true} />
        </div>
        <div className="row" style={{ height: 200 }}>
          <Label>Virtualized Table</Label>
          <Demo.Table />
        </div>
        <div className="row">
          <Label>Notifications</Label>
          <Demo.Notifier />
        </div>
        <div className="row">
          <Label>Trend, Arrow</Label>
          <Arrow />
          <Spacer />
          <Arrow green={false} up={false} />
          <Spacer />
          <Trend value={0.025} />
          <Spacer />
          <Trend value={-0.015} />
        </div>
        <div className="row">
          <Label>Metric Card</Label>
          <Demo.MetricCard type="simple" />
          <Spacer />
          <Demo.MetricCard type="trend" />
          <Spacer />
          <Demo.MetricCard type="highlighted" />
          <Spacer />
          <Demo.MetricCard type="checkable" />
          <Spacer />
          <Demo.MetricCard type="checked" />
          <Spacer />
          <Demo.MetricCard type="disabled" />
        </div>
        <div className="row">
          <Label>Empty data placeholder</Label>
          <EmptyPlaceholder />
        </div>
        <div className="row">
          <Label>Error Boundary</Label>
          <ErrorBoundary>
            <Demo.ErrorTest />
          </ErrorBoundary>
        </div>
        <div className="row">
          <Label>Page not found</Label>
          <Demo.PNF />
        </div>
        <div className="row">
          <Label>Slider Chart</Label>
          <Demo.Chart />
        </div>
        <Footer />
      </div>
    );
  }
}

// model mask usage example
function ModalMaskTest() {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button onClick={() => setVisible(!visible)} style={{ zIndex: 99 }}>
        Toggle Mask
      </Button>
      <ModalMask visible={visible} />
    </>
  );
}

function Spacer() {
  return <div style={{ width: 10, display: "inline-block" }}></div>;
}

function Label(props) {
  return <span className="label">{props.children}</span>;
}

Label.propTypes = {
  children: PropTypes.string
};

export default Main;
