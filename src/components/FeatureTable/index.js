import React from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

const text = <p style={{ paddingLeft: 24 }}>Feature realted attributes</p>;

const statusMap = {
  "0": "Disabled",
  "1": "Internal",
  "2": "All"
};

function StatusSelector({ fid, value, onChange }) {
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={0} data-id={fid}>
        Disabled
      </Radio>
      <Radio value={1} data-id={fid}>
        Internal
      </Radio>
      <Radio value={2} data-id={fid}>
        All
      </Radio>
    </Radio.Group>
  );
}

function FeatureBar({ feature, pos, onUpdate, readOnly }) {
  function onChange(e) {
    const fid = e.target["data-id"];
    const value = e.target.value;
    console.log("feature id", fid);
    onUpdate(fid, pos, value);
  }

  const handleClick = event => event.stopPropagation();

  return (
    <div onClick={handleClick}>
      {readOnly ? (
        <span>{statusMap[feature.status]}</span>
      ) : (
        <StatusSelector
          value={feature.status}
          onChange={onChange}
          fid={feature.id}
        />
      )}
    </div>
  );
}

function FeatureTable({ features, updateFeatures, readOnly = false }) {
  return (
    <Collapse bordered={false} defaultActiveKey={[]}>
      {features.map((f, index) => {
        return (
          <Panel
            header={f.name}
            extra={
              <FeatureBar
                feature={f}
                pos={index}
                onUpdate={updateFeatures}
                readOnly={readOnly}
              />
            }
            key={f.id}
          >
            {text}
          </Panel>
        );
      })}
    </Collapse>
  );
}

export default FeatureTable;
