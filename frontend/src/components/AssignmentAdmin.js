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
      title: "T??n s???n ph???m",
      dataIndex: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "Lo???i",
      dataIndex: "type",
      filters: [
        {
          text: <span>Nh??</span>,
          value: "Nh??",
        },
        {
          text: <span>Chung c??</span>,
          value: "Chung c??",
        },
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
      width: 50,
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "status",
      filters: [
        {
          text: <span>B??n</span>,
          value: "B??n",
        },
        {
          text: <span>Cho thu??</span>,
          value: "Cho thu??",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
      width: 80,
    },
    {
      title: "Gi???y t??? ",
      dataIndex: "legalDocuments",
      filters: [
        {
          text: <span>S??? ?????</span>,
          value: "S??? ?????",
        },
        {
          text: <span>H???p ?????ng mua b??n</span>,
          value: "H???p ?????ng mua b??n",
        },
        {
          text: <span>??ang ch??? s???</span>,
          value: "??ang ch??? s???",
        },
      ],
      onFilter: (value, record) => record.legalDocuments.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
      width: 100,
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
      width: 150,
    },
    {
      title: "Gi??",
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
