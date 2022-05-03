import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    console.log(e);
    props.history.push(`/search/name/${name}`);
  };
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 20,
        color: "#1890ff",
      }}
    />
  );
  return (
    <div
      className="row"
      style={{ justifyContent: "center", marginBottom: "1rem" }}
    >
      <Space direction="vertical">
        <Search
          placeholder="Tìm kiếm"
          enterButton="Search"
          size="large"
          suffix={suffix}
          onSearch={submitHandler}
          onChange={(e) => setName(e.target.value)}
          style={{ width: 450 }}
        />
      </Space>
    </div>
  );
}
