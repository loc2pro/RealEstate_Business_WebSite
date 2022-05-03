import { Input, notification, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateInstock } from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function AssignmentAdmin(props) {
  const { products, loading, error, parentCallback, sourceData } = props;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dataSource, setDataSource] = useState();
  const [selectedRowKeys, SetSelectedRowkeys] = useState([""]);
  useEffect(() => {
    parentCallback(selectedRowKeys);
  }, [selectedRowKeys]);
  const data = [];
  if (products) {
    for (let item of products) {
      if (!item.seller) {
        data.push({
          key: item._id,
          name: item.name,
          status: item.status,
          legalDocuments: item.legalDocuments,
          type: item.type,
          price: item.price,
          address: item.address,
        });
      }
    }
  }
  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    SetSelectedRowkeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          SetSelectedRowkeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          SetSelectedRowkeys(newSelectedRowKeys);
        },
      },
    ],
  };

  useEffect(() => {
    setDataSource(products);
  }, [products]);

 
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "Loại",
      dataIndex: "type",
      filters: [
        {
          text: <span>Nhà</span>,
          value: "Nhà",
        },
        {
          text: <span>Chung cư</span>,
          value: "Chung cư",
        },
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
      width: 50,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: <span>Bán</span>,
          value: "Bán",
        },
        {
          text: <span>Cho thuê</span>,
          value: "Cho thuê",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
      width: 80,
    },
    {
      title: "Giấy tờ ",
      dataIndex: "legalDocuments",
      filters: [
        {
          text: <span>Sổ đỏ</span>,
          value: "Sổ đỏ",
        },
        {
          text: <span>Hợp đồng mua bán</span>,
          value: "Hợp đồng mua bán",
        },
        {
          text: <span>Đang chờ sổ</span>,
          value: "Đang chờ sổ",
        },
      ],
      onFilter: (value, record) => record.legalDocuments.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
      width: 100,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      width: 60,
      fixed: "right",
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
            rowSelection={rowSelection}
            onChange={onChange}
            pagination={{ pageSize: 20 }}
            scroll={{ x: 1500, y: 700 }}
          />
        </div>
      )}
    </div>
  );
}

export default AssignmentAdmin;
