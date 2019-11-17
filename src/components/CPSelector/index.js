import React from "react";
import * as styles from "./styles.module.less";
import { Spacer } from "@components/Utils";
import { Select } from "antd";
const { Option } = Select;

function CPselector({
  // customer props
  customers,
  customer,
  onCustomerChange,

  // product props
  products,
  product,
  onProductChange,

  //feature props
  features,
  feature,
  onFeatureChange,

  // package props (package is a reserved word)
  packages,
  pack,
  onPackageChange
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
      <div className={styles.selectorCo}>
        <span>Customer</span>
        <Select
          //showSearch
          defaultValue={""}
          style={{ width: 200 }}
          value={customer}
          onChange={onCustomerChange}
          placeholder="Select a value"
        >
          {Object.keys(customers).map(k => (
            <Option key={customers[k].id}>{customers[k].name}</Option>
          ))}
        </Select>
      </div>

      <Spacer />

      <div className={styles.selectorCo}>
        <span>Product</span>
        <Select
          style={{ width: 200 }}
          value={product}
          onChange={onProductChange}
          placeholder="Select a value"
        >
          {Object.keys(products).map(k => (
            <Option key={products[k].id}>{products[k].name}</Option>
          ))}
        </Select>
      </div>

      {onFeatureChange && (
        <>
          <Spacer />
          <div className={styles.selectorCo}>
            <span>Feature</span>
            <FeatureSelector
              features={features}
              feature={feature}
              onFeatureChange={onFeatureChange}
            />
          </div>
        </>
      )}

      {onPackageChange && (
        <>
          <Spacer />
          <div className={styles.selectorCo}>
            <span>Package</span>
            <PackageSelector
              packages={packages}
              pack={pack}
              onPackageChange={onPackageChange}
            />
          </div>
        </>
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
      placeholder="Select a value"
    >
      {features.map(f => (
        <Option key={f.id}>{f.name}</Option>
      ))}
    </Select>
  );
}

export function PackageSelector({ pack, packages, onPackageChange }) {
  return (
    <Select
      defaultValue={""}
      style={{ width: 200 }}
      value={pack}
      onChange={onPackageChange}
      placeholder="Select a value"
    >
      {Object.keys(packages).map(k => (
        <Option key={packages[k].id}>{packages[k].name}</Option>
      ))}
    </Select>
  );
}

export default CPselector;
