import React, { useEffect } from "react";
import CPSelector from "@components/CPSelector";
import FeatureForm from "@components/FeatureForm";
import { Radio } from "antd";
import { connecter } from "@store/manageFeatures";

function ManageFeatures({ 
  products, 
  packages,
  product, setProduct,
  feature, setFeature,
  features, setFeatures,
  mode, setMode,
  reset,
  save,
}) {

  // dev in progress
  useEffect(() => {
    async function fetchData() {
      setFeatures([]);
    }
    if (product) {
      fetchData();
    }
  }, [product]);

  function onProductChange(value) {
    setProduct(value);
  }

  function onFeatureChange(value) {
    setFeature(value);
  }

  function onModeChange(e) {
    setMode(e.target.value);
  }

  function handleSubmit(formData) {
    if (formData) {
      save(formData);
    }
  }

  const cfProps = {
    product,
    onProductChange,
    features,
    feature,
    onFeatureChange
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h2>Manage Feature Flags</h2>
      <div style={{ height: 60 }}>
        <ModeToggle mode={mode} onModeChange={onModeChange} />
        {mode ? (
          ""
        ) : (
          <CPSelector customers={{}} products={products} {...cfProps} />
        )}
      </div>

      <div style={{ margin: 30 }}>
        <FeatureForm
          feature={feature}
          products={products}
          packages={packages}
          onSubmit={handleSubmit}
          reset={reset}
        />
      </div>
    </div>
  );
}

function ModeToggle({ mode, onModeChange }) {
  return (
    <div style={{ float: "right", marginTop: -40 }}>
      <Radio.Group
        defaultValue={mode}
        buttonStyle="solid"
        onChange={onModeChange}
      >
        <Radio.Button value={true}>Create</Radio.Button>
        <Radio.Button value={false}>Update</Radio.Button>
      </Radio.Group>
    </div>
  );
}

export default connecter(ManageFeatures);
