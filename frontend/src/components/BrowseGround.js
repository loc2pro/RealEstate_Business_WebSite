import {
  DeleteOutlined,
  EyeOutlined,
  CheckOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/postActions";
import { updateBrowse } from "../actions/productActions";
import urlImages from "../api/url";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function BrowseGround(props) {
  const { grounds, loading, error, parentCallback } = props;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedRowKeys, SetSelectedRowkeys] = useState([]);
  const [keySearch, setkeySearch] = useState("");
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    parentCallback(selectedRowKeys);
  }, [selectedRowKeys]);
  const data = [];
  if (grounds) {
    for (let item of grounds) {
      data.push({
        key: item._id,
        name: item.name,
        status: item.status,
        legalDocuments: item.legalDocuments,
        type: item.type,
        price: item.price,
        address: item.address,
        image: item.image,
      });
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
        text: "Chọn ô chẳn",
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
        text: "Chọn ô lẻ",
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

  const handleDeleteClick = (id) => {
    dispatch(deletePost(id));
    setDataSource(dataSource.filter((item) => item._id !== id));
  };

  const onEditProduct = (record) => {
    setIsEditing(true);
    setEditingProduct({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };
  const handleUpdateClick = (e) => {
    const update = dispatch(updateBrowse(e._id));
    update
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          setDataSource(
            dataSource.filter((item) => item._id !== data.product._id)
          );
        } else {
          notification.warning({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          description: err.message,
          placement: "bottomRight",
          duration: 3,
        });
      });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: 40,
      render: (theImageURL) => <img src={`${urlImages}${theImageURL[0]}`} />,
    },
    {
      title: "Loại",
      dataIndex: "type",
      filters: [
        {
          text: <span>Đất dự án</span>,
          value: "Đất dự án",
        },
        {
          text: <span>Đất thổ cư</span>,
          value: "Đất thổ cư",
        },
        {
          text: <span>Đất nông nghiệp</span>,
          value: "Đất nông nghiệp",
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
          <Input
            onChange={(e) => {
              const value = e.target.value;
              setkeySearch(value);
            }}
            className="custom-antd-input"
            placeholder="Tìm kím theo tên sản phẩm, loại, trạng thái"
            prefix={<SearchOutlined />}
            size="small"
          ></Input>
          <Table
            columns={columns}
            dataSource={data?.filter(
              (data) =>
                !keySearch ||
                data.name.toLowerCase().includes(keySearch.toLowerCase()) ||
                data.type.toLowerCase().includes(keySearch.toLowerCase()) ||
                data.status.toLowerCase().includes(keySearch.toLowerCase())
            )}
            rowSelection={rowSelection}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 2000, y: 500 }}
          />
        </div>
      )}
    </div>
  );
}

export default BrowseGround;
