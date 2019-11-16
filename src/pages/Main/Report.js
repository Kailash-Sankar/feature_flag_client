import React, { useState, useEffect } from "react";
import CPSelector from "@components/CPSelector";
import FeatureTable from "@components/FeatureTable";
import { Button } from "antd";
//import { Spacer } from "@components/Utils";

import { serverUrl, combineFeatures } from "./utils";
import axios from "axios";

function Report({ customers, products }) {
  const [customer, setCustomer] = useState(undefined);
  const [product, setProduct] = useState(undefined);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resCF = await axios.get(
        `${serverUrl}/customer/${customer}/${product}`
      );
      const resDF = await axios.get(`${serverUrl}/meta/features/${product}`);
      const dataList = combineFeatures(
        resCF.data.data.features,
        resDF.data.data
      );
      console.log("features list", dataList);
      setFeatures(dataList);
    }
    if (customer && product) {
      fetchData();
    }
  }, [customer, product]);

  function handleDownload() {
    console.log("saving features", features);
  }

  function updateFeatures() {
    // do nothing
    console.log("no updates done here");
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
      <h2>Feature Flag Usage Reports</h2>
      <div>
        <CPSelector customers={customers} products={products} {...cfProps} />
      </div>
      {features && features.length > 0 && (
        <div style={{ margin: 30 }}>
          <FeatureTable
            features={features}
            updateFeatures={updateFeatures}
            readOnly={true}
          />
          <div style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleDownload}>
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;
