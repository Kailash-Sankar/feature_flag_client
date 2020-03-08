import React, { useEffect } from "react";
import CPSelector from "@components/CPSelector";
import AuditResults from "@components/AuditResults";
import { Button, Empty } from "antd";
import { connecter } from "@store/audit";

function Audit({ 
  customers, 
  products, 
  customer, setCustomer,
  product, setProduct,
  features,
  productList, setProductList,
  feature, setFeature,
  result,
  search,
  fetchFeatures,
  }) {

  // add option to select all
  customers["all"] = { name: "All", id: "all" };
  products["all"] = { name: "All", id: "all" };

  // search 
  useEffect(() => {
    if (customer || product || feature) {
      search({customer, product, feature});
    }
  }, [customer, product, feature]);

  // get features list
  useEffect(() => {
    if (product) {
      fetchFeatures(product);
    }
  }, [product]);

  function onCustomerChange(value) {
  
    setCustomer(value);
    setProduct("all");

    // skip for all mode
    if (value !== "all") {
      const temp = { all: { name: "All", id: "all" } };
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

  return (
    <div style={{ textAlign: "left" }}>
      <h2>Audit Records</h2>
      <div>
        <CPSelector customers={customers} products={productList} {...cfProps} />
      </div>
      {result && result.length > 0 ? (
        <div style={{ margin: 30 }}>
          <AuditResults result={result} />
          <div style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleDownload}>
              Download
            </Button>
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

export default connecter(Audit);
