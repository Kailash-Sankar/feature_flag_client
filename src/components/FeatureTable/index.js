import React from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;
import * as styles from "./index.module.less";

const text = <p style={{ paddingLeft: 24 }}>Feature realted attributes</p>;

const statusMap = {
  "0": "Disabled",
  "1": "Internal",
  "2": "All"
};

export function StatusSelector({ fid, value, onChange }) {
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

export function FeatureBar({ feature, pos, onUpdate, readOnly }) {
  function onChange(e) {
    const fid = e.target["data-id"];
    const value = e.target.value;
    onUpdate(fid, pos, value);
  }

  const handleClick = (event) => event.stopPropagation();

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
            header={<RenderHeader data={f} />}
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

export function RenderHeader({ data }) {
  return (
    <div style={{ display: "inline-block" }}>
      <div>{data.name}</div>
      <div className={styles.sub}>{data.description}</div>
    </div>
  );
}

export default FeatureTable;
