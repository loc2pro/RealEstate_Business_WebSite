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

  return (
    // <div
    //   className="row"
    //   style={{ justifyContent: "center", marginBottom: "1rem" }}
    // >
    //   <Space direction="vertical">
    //     <Search
    //       placeholder="Tìm kiếm"
    //       enterButton="Search"
    //       size="large"
    //       suffix={suffix}
    //       onSearch={submitHandler}
    //       onChange={(e) => setName(e.target.value)}
    //       style={{ width: 450 }}
    //     />
    //   </Space>
    // </div>
    <div className="ltn__search-widget mb-30">
      <form action="#" onSubmit={submitHandler}>
        <input
          type="text"
          name="search"
          placeholder="Tìm kiếm theo tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    </div>
  );
}
