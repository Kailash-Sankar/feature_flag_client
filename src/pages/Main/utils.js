import React from "react";
import { Icon } from "antd";
import { Spacer } from "@components/Utils";
import * as styles from "./index.module.less";

export const serverUrl = "http://localhost:3000/api";

// combine saved customer features with product features
export const combineFeatures = (saved, base) => {
  const tempMap = {};
  saved.forEach(s => {
    tempMap[s.id] = 1;
  });
  const features = saved;
  features.push(...base.filter(b => (tempMap[b.id] ? false : true)));
  return features;
};

export const TopBar = () => {
  return (
    <div className={styles.userWrap}>
      <Icon type="user" />
      <Spacer width={20} />
      <Icon type="logout" />
    </div>
  );
};

export const packages = {
  "0": { id: 0, name: "Custom" },
  "1": { id: 1, name: "Silver" },
  "2": { id: 2, name: "Gold" },
  "3": { id: 3, name: "Diamond" }
};
