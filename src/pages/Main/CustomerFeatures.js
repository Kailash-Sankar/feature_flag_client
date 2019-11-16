import React, { useState, useEffect } from "react";
import CPSelector from "@components/CPSelector";
import FeatureTable from "@components/FeatureTable";
import { Button } from "antd";
import { Spacer } from "@components/Utils";

import { serverUrl } from "./constants";
import axios from "axios";

function CustomerFeatures({ customers }) {
  console.log("CF", customers);

  const [customer, setCustomer] = useState(undefined);
  const [product, setProduct] = useState(undefined);
  const [features, setFeatures] = useState([]);
  const [reset, setReset] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `${serverUrl}customer/${customer}/${product}`
      );
      setFeatures(res.data.data.features);
    }
    if (customer && product) {
      fetchData();
    }
  }, [customer, product, reset]);

  function handleSave() {
    console.log("features", features);
  }

  function handleReset() {
    setReset(reset + 1);
  }

  function updateFeatures(fid, index, value) {
    const f = features[index];
    f.status = value;
    console.log("double check", f.id, fid);

    const newFeatures = [
      ...features.slice(0, index),
      f,
      ...features.slice(index + 1)
    ];
    setFeatures(newFeatures);
  }

  const cfProps = {
    customer,
    setCustomer,
    product,
    setProduct
  };
  console.log("render", features);

  return (
    <div style={{ textAlign: "left" }}>
      <h2>Customer Feature Mapping</h2>
      <div>
        <CPSelector customers={customers} {...cfProps} />
      </div>
      {features.length > 0 && (
        <div style={{ margin: 30 }}>
          <FeatureTable features={features} updateFeatures={updateFeatures} />
          <div style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Spacer />
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerFeatures;
