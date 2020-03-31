import React, { useState } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import { formatDate } from "@components/Utils";
import axios from "axios";
import { serverUrl } from "@api";

import ReactDiffViewer from "react-diff-viewer";

export function RenderDiff({ prev }) {
  const [current, setCurrent] = useState({});

  // request fired once when panel is expanded
  // fetches current customer features (all)
  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${serverUrl}/customer/${prev.id}/all`);
      setCurrent(res.data.data);
    }
    if (prev.id) {
      fetchData();
    }
  }, [prev.id]);

  if (current && prev) {
    delete current.createdAt;
    delete current.updatedAt;
    delete current.__v;

    return (
      <ReactDiffViewer
        oldValue={JSON.stringify(prev, null, 4)}
        newValue={JSON.stringify(current, null, 4)}
        splitView={true}
      />
    );
  }
  return <div> Loading Diff</div>;
}

const genExtra = (date) => (
  <span style={{ fontSize: 12, color: "#757575" }}>
    {`Changed At:${formatDate(date)}`}
  </span>
);

function AuditResults({ result }) {
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={[]}>
        {result.map((r, index) => {
          return (
            <Panel
              header={r.key.name}
              extra={genExtra(r.updatedAt)}
              key={`${r.key.id}_${index}`}
            >
              <RenderDiff prev={r.key} />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default AuditResults;
