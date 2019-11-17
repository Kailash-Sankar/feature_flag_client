import React from "react";
//import * as styles from "./styles.module.less";
import { Spacer } from "@components/Utils";
import { Select } from "antd";
const { Option } = Select;

function CPselector({
  customers,
  products,
  customer,
  product,
  onCustomerChange,
  onProductChange,
  //feature realted attributes
  features,
  feature,
  onFeatureChange
}) {
  /*
  function handleSearch(value) {
    if (value) { 
    } else {
      this.setState({ data: [] });
    }
  };
  */

  return (
    <div>
      <Select
        //showSearch
        defaultValue={""}
        style={{ width: 200 }}
        value={customer}
        onChange={onCustomerChange}
        placeholder="Select Customer"
      >
        {Object.keys(customers).map(k => (
          <Option key={customers[k].id}>{customers[k].name}</Option>
        ))}
      </Select>
      <Spacer />
      <Select
        style={{ width: 200 }}
        value={product}
        onChange={onProductChange}
        placeholder="Select Product"
      >
        {Object.keys(products).map(k => (
          <Option key={products[k].id}>{products[k].name}</Option>
        ))}
      </Select>
      <Spacer />
      {onFeatureChange && (
        <FeatureSelector
          features={features}
          feature={feature}
          onFeatureChange={onFeatureChange}
        />
      )}
    </div>
  );
}

export function FeatureSelector({ features, feature, onFeatureChange }) {
  return (
    <Select
      //showSearch
      defaultValue={""}
      style={{ width: 200 }}
      value={feature}
      onChange={onFeatureChange}
      placeholder="Select Feature"
    >
      {features.map(f => (
        <Option key={f.id}>{f.name}</Option>
      ))}
    </Select>
  );
}

export default CPselector;
