import React from "react";
import { Collapse, List } from "antd";
const { Panel } = Collapse;

const statusMap = {
  "0": "Disabled",
  "1": "Internal",
  "2": "All"
};

export function RenderList({ data }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item extra={statusMap[item.status]}>
          <List.Item.Meta title={item.name} description={item.description} />
        </List.Item>
      )}
    />
  );
}

function SearchResults({ result }) {
  console.log("SR", result);
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={[]}>
        {result.map(r => {
          return (
            <Panel header={r.name} extra={""} key={r.id}>
              <RenderList data={r.features} />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default SearchResults;
