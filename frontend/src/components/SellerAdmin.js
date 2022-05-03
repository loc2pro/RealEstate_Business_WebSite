import { Input, Modal, notification, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/postActions";
import { updateInstock } from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function SelllerAdmin(props) {
  const { sellers, loading, error, parentCallback } = props;
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState();
  const [selectedRowKeys, SetSelectedRowkeys] = useState([]);
  const data = [];
  if (sellers) {
    for (let item of sellers) {
      data.push({
        key: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        address: item.address,
      });
    }
  }
  useEffect(() => {
    parentCallback(selectedRowKeys);
  }, [selectedRowKeys]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    SetSelectedRowkeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    setDataSource(sellers);
  }, [sellers]);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "email",
      dataIndex: "email",
      width: 100,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 100,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 200,
    },
  ];
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={{ ...rowSelection, type: "radio" }}
            scroll={{ x: 900, y: 400 }}
          />
        </div>
      )}
    </div>
  );
}

export default SelllerAdmin;
