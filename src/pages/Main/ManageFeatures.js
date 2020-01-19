import React, { useEffect } from "react";
import CPSelector from "@components/CPSelector";
import FeatureForm from "@components/FeatureForm";
import { notification, Radio } from "antd";
import { serverUrl } from "./utils";
import axios from "axios";
import { connecter } from "@store/manageFeatures";

const notify = (status, name, extra = "") => {
  let msg = "Changes have been Saved!";
  let desc = `Created feature flag ${name}`;

  if (!status) {
    msg = `Encountered ${name}`;
    desc = `Server: ${extra}`;
  }

  notification.open({
    message: msg,
    description: desc
  });
};

function ManageFeatures({ 
  products, 
  packages,
  product, setProduct,
  feature, setFeature,
  features, setFeatures,
  mode, setMode,
  reset, setRest
}) {

  useEffect(() => {
    async function fetchData() {
      // const res = await axios.get(`${serverUrl}/meta/features/${product}`);
      //const data = res.data.data;
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
    console.log("ff change", value);
    setFeature(value);
  }

  function onModeChange(e) {
    console.log("mode", e.target.value);
    setMode(e.target.value);
  }

  function handleSubmit(formData) {
    console.log("ff change", formData);

    async function saveData() {
      try {
        const res = await axios.post(`${serverUrl}/ff`, formData);
        console.log("res", res);
        if (res.data.status === 1) {
          notify(true, formData.name);
          setRest(reset + 1);
        } else {
          notify(false, res.data.message, res.data.data[0].msg);
        }
      } catch (err) {
        notify(false, "backend validation error", "Try posting data again");
      }
    }
    if (formData) {
      saveData();
    }
  }

  const cfProps = {
    product,
    onProductChange,
    features,
    feature,
    onFeatureChange
  };
  console.log("render", features);

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
