import React from "react";
import { Tabs, Radio } from "antd";
import Post from "../Post";
import PostGround from "../PostGround";

const { TabPane } = Tabs;

export default function NavTab() {
  return (
    <div style={{ marginTop: "9rem" }}>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="Large"
        style={{ fontWeight: "bold", fontSize: "60px" }}
      >
        <TabPane tab="Nhà Ở/ Chung Cư" key="1">
          <Post />
        </TabPane>
        <TabPane tab="Đất" key="2">
          <PostGround />
        </TabPane>
      </Tabs>
    </div>
  );
}
