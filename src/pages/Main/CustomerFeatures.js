import React, { useState, useEffect } from "react";
import CPSelector from "@components/CPSelector";
import FeatureTable from "@components/FeatureTable";
import { Button, Spin, notification, Empty } from "antd";
import { Spacer } from "@components/Utils";

import { serverUrl, combineFeatures } from "./utils";
import axios from "axios";

function getPackageFeatures() {
  return {
    "0": [],
    "1": {
      ad_slates: {
        id: "ad_slates",
        status: 2
      }
    },
    "2": [],
    "3": []
  };
}

const notify = (customerName, product) => {
  notification.open({
    message: "Changes have been Saved!",
    description: `Updated feature flags of ${customerName} for ${product}`
  });
};

function CustomerFeatures({ customers, products, packages }) {
  const [customer, setCustomer] = useState(undefined);
  const [product, setProduct] = useState(undefined);
  const [features, setFeatures] = useState([]);
  const [reset, setReset] = useState(1);
  const [saving, setSaving] = useState(false);
  const [productList, setProductList] = useState({});

  const [pack, setPack] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const resCF = await axios.get(
        `${serverUrl}/customer/${customer}/${product}`
      );
      const resDF = await axios.get(`${serverUrl}/meta/features/${product}`);
      const dataList = combineFeatures(
        resCF.data.data.features || [],
        resDF.data.data || []
      );
      console.log("features list", dataList);
      setFeatures(dataList);
    }
    if (customer && product) {
      fetchData();
    }
  }, [customer, product, reset]);

  function onCustomerChange(value) {
    console.log("value", value);
    setCustomer(value);

    // skip for all mode
    if (value !== "all") {
      setProduct(undefined);
      const temp = {};
      customers[value].products.forEach(p => {
        temp[p] = products[p];
      });
      setProductList(temp);
    }
  }

  function applyPackage(packageFeatures) {
    const newFeatures = [];
    features.forEach(f => {
      const ff = packageFeatures[f.id];
      if (ff) {
        newFeatures.push({ ...f, status: ff.status });
      } else {
        newFeatures.push(f);
      }
    });
    setFeatures(newFeatures);
  }

  function onProductChange(value) {
    setProduct(value);
  }

  function onPackageChange(value) {
    setPack(value);
    const packageFeatures = getPackageFeatures();
    console.log("pkg", value, packageFeatures);
    applyPackage(packageFeatures[value]);
  }

  function handleSave() {
    console.log("saving features", features);
    setSaving(true);
    axios
      .post(`${serverUrl}/customer/${customer}/${product}`, {
        features: features
      })
      .then(function(response) {
        console.log(response);
        setSaving(false);
        notify(customers[customer].name, products[product].name);
      })
      .catch(function(error) {
        console.log(error);
      });
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
    product,
    onCustomerChange,
    onProductChange,
    packages,
    pack,
    onPackageChange
  };
  console.log("render", features);

  return (
    <div style={{ textAlign: "left" }}>
      <h2>Customer Feature Mapping</h2>
      <div>
        <CPSelector customers={customers} products={productList} {...cfProps} />
      </div>
      {features.length > 0 ? (
        <div style={{ margin: 30 }}>
          <FeatureTable features={features} updateFeatures={updateFeatures} />
          <div style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Spacer />
            <Button onClick={handleReset}>Reset</Button>
            <Spacer />
            {saving && <Spin />}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 100 }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
}

export default CustomerFeatures;
