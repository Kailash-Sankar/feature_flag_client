import React from "react";
import { Select } from "antd";
const { Option } = Select;

export function PackageSelect({ pack, packages, onPackageChange }) {
  return (
    <Select
      defaultValue={""}
      style={{ width: 200 }}
      value={pack}
      onChange={onPackageChange}
      placeholder="Select a value"
    >
      {Object.keys(packages).map((k) => (
        <Option key={packages[k].id}>{packages[k].name}</Option>
      ))}
    </Select>
  );
}

export function FeatureSelect({ feature, features, onFeatureChange }) {
  return (
    <Select
      //showSearch
      defaultValue={""}
      style={{ width: 200 }}
      value={feature}
      onChange={onFeatureChange}
      placeholder="Select a value"
    >
      {features.map((f) => (
        <Option key={f.id}>{f.name}</Option>
      ))}
    </Select>
  );
}

export function ProductSelect({ product, products, onProductChange }) {
  return (
    <Select
      style={{ width: 200 }}
      value={product}
      onChange={onProductChange}
      placeholder="Select a value"
    >
      {Object.keys(products).map((k) => (
        <Option key={products[k].id}>{products[k].name}</Option>
      ))}
    </Select>
  );
}

export function CustomerSelect({ customer, customers, onCustomerChange }) {
  return (
    <Select
      //showSearch
      defaultValue={""}
      style={{ width: 200 }}
      value={customer}
      onChange={onCustomerChange}
      placeholder="Select a value"
    >
      {Object.keys(customers).map((k) => (
        <Option key={customers[k].id}>{customers[k].name}</Option>
      ))}
    </Select>
  );
}
