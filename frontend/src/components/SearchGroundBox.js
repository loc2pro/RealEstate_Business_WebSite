import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function SearchGroundBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    console.log(e);
    props.history.push(`/searchground/name/${name}`);
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
    <div className="ltn__search-widget mb-30">
      <form action="#" onSubmit={submitHandler}>
        <input
          type="text"
          name="search"
          placeholder="Tìm kiếm theo tên"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    </div>
  );
}
