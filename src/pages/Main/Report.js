import React, { useState, useEffect } from "react";
import CPSelector from "@components/CPSelector";
import SearchResults from "@components/SearchResults";
import { Button } from "antd";
import { serverUrl } from "./utils";
import axios from "axios";

function Report({ customers, products }) {
  const [customer, setCustomer] = useState(undefined);
  const [product, setProduct] = useState(undefined);
  const [features, setFeatures] = useState([]);
  const [productList, setProductList] = useState(products);
  const [feature, setFeature] = useState(undefined);
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const params = {
        customer: customer || "all",
        product: product || "all",
        feature: feature || "all"
      };
      // customer  + product
      const res = await axios.post(`${serverUrl}/search/`, params);
      console.log("response", res);
      setResult(res.data.data || []);
    }
    if (customer || product || feature) {
      fetchData();
    }
  }, [customer, product, feature]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${serverUrl}/meta/features/${product}`);
      const data = res.data.data;
      // for all scenario
      data.push({ name: "All", id: "all" });
      if (data && data.length) {
        setFeatures(data);
      }
    }
    if (product) {
      fetchData();
    }
  }, [product]);

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
    } else {
      setProductList(products);
    }
  }

  function onProductChange(value) {
    setProduct(value);
  }

  function handleDownload() {
    console.log("saving features", features);
  }

  function onFeatureChange(value) {
    setFeature(value);
  }

  const cfProps = {
    customer,
    product,
    onCustomerChange,
    onProductChange,
    features,
    feature,
    onFeatureChange
  };
  console.log("render", features);

  // choose all
  customers["all"] = { name: "All", id: "all" };

  return (
    <div style={{ textAlign: "left" }}>
      <h2>Feature Flag Usage Reports</h2>
      <div>
        <CPSelector customers={customers} products={productList} {...cfProps} />
      </div>
      {result && result.length > 0 && (
        <div style={{ margin: 30 }}>
          <SearchResults result={result} />
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
