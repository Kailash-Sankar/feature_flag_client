import React, { useState } from "react";
//import * as styles from "./styles.module.less";
import { Spacer } from "@components/Utils";
import { Select } from "antd";
const { Option } = Select;

function CPselector({
  customers,
  products,
  customer,
  setCustomer,
  product,
  setProduct
}) {
  //console.log("cp-init", customer, product);

  const [productList, setProductList] = useState([]);

  function onCustomerChange(value) {
    console.log("value", value);
    setCustomer(value);
    setProductList(customers[value].products);
  }

  function onProductChange(value) {
    console.log("value", value);
    setProduct(value);
  }

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
        {productList.map(p => (
          <Option key={p}>{products[p].name}</Option>
        ))}
      </Select>
    </div>
  );
}

export default CPselector;
