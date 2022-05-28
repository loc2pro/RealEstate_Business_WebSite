import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
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
import { updateProduct } from "../actions/productActions";
import urlImages from "../api/url";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function Browse(props) {
  const { products, loading, error, parentCallback, parentDeletee } = props;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedRowKeys, SetSelectedRowkeys] = useState([]);
  const [dataSource, setDataSource] = useState();
  const [keySearch, setkeySearch] = useState("");
  useEffect(() => {
    parentCallback(selectedRowKeys);
    parentDeletee(dataSource);
  }, [selectedRowKeys, dataSource]);
  const data = [];
  if (products) {
    for (let item of products) {
      data.push({
        key: item._id,
        name: item.name,
        status: item.status,
        legalDocuments: item.legalDocuments,
        type: item.type,
        price: item.price,
        address: item.address,
        acreage: item.acreage,
        bedroom: item.bedroom,
        toilet: item.toilet,
        description: item.description,
        direction: item.direction,
        floor: item.floor,
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
    const deletee = dispatch(deletePost(id));
    deletee
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          setDataSource(data.product);
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

  const onEditProduct = (record) => {
    setIsEditing(true);
    setEditingProduct({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: 200,
      fixed: "left",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: 50,
      render: (theImageURL) => <img src={`${urlImages}${theImageURL[0]}`} />,
    },
    {
      title: "Loại",
      width: 100,
      dataIndex: "type",
      filters: [
        {
          text: <span>Nhà riêng</span>,
          value: "Nhà riêng",
        },
        {
          text: <span>Nhà mặt phố</span>,
          value: "Nhà mặt phố",
        },
        {
          text: <span>Biệt thự</span>,
          value: "Biệt thự",
        },
        {
          text: <span>Nhà phố thương mại</span>,
          value: "Nhà phố thương mại",
        },
        {
          text: <span>Căn hộ chung cư</span>,
          value: "Nhà mặt phố",
        },
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
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
    {
      title: "Action",
      key: "action",
      width: 50,
      fixed: "right",
      render: (record) => (
        <Space size="middle">
          <a>
            <EyeOutlined
              onClick={() => {
                onEditProduct(record);
              }}
            />
          </a>

          <Popconfirm
            title="Bạn có muốn xóa sản phẩm?"
            onConfirm={() => handleDeleteClick(record.key)}
          >
            <a>
              <DeleteOutlined style={{ color: "red" }} />
            </a>
          </Popconfirm>
        </Space>
      ),
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
          <Modal
            title="Thông tin bài đăng "
            visible={isEditing}
            width={1600}
            okText="Ok"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              resetEditing();
            }}
          >
            <Row>
              <div className="col-6" style={{ padding: "1rem" }}>
                <div class="form-group">
                  <h3 class="title_sticky" id="jumpto_0">
                    Tên sản phẩm:
                  </h3>
                  <Input
                    readOnly
                    style={{ height: "35px", marginBottom: "0" }}
                    value={editingProduct?.name}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, name: e.target.value };
                      });
                    }}
                  />
                </div>

                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Loại sản phẩm:
                  </h5>
                  <select
                    name="type"
                    data-selected={editingProduct?.type}
                    style={{
                      width: "100%",
                      height: "35px",
                      border: "1px solid #d9d9d9",
                      cursor: "not-allowed",
                      textAlign: "center",
                    }}
                  >
                    <option value="Nhà">Nhà</option>
                    <option value="Chung cư">Chung cư</option>
                  </select>
                </div>
                <div class="form-group" style={{ marginTop: "1rem" }}>
                  <h3 class="title_sticky" id="jumpto_0">
                    Trạng thái sản phẩm:
                  </h3>
                  <select
                    name="status"
                    data-selected={editingProduct?.status}
                    style={{
                      width: "100%",
                      height: "35px",
                      border: "1px solid #d9d9d9",
                      textAlign: "center",
                      cursor: "not-allowed",
                    }}
                  >
                    <option value="Bán">Bán</option>
                    <option value="Cho thuê">Cho thuê</option>
                  </select>
                </div>
                <div class="form-group">
                  <h3 class="title_sticky" id="jumpto_0">
                    Giấy tờ pháp lí:
                  </h3>
                  <select
                    disabled
                    name="legalDocuments"
                    data-selected={editingProduct?.legalDocuments}
                    style={{
                      width: "100%",
                      height: "35px",
                      border: "1px solid #d9d9d9",
                      textAlign: "center",
                      cursor: "not-allowed",
                    }}
                  >
                    <option value="Sổ đỏ">Sổ đỏ</option>
                    <option value="Hợp đồng mua bán">Hợp đồng mua bán</option>
                    <option value="Đang chờ sổ">Đang chờ sổ</option>
                  </select>
                </div>
                <div class="form-group">
                  <h3 class="title_sticky" id="jumpto_0">
                    Hướng:
                  </h3>
                  <select
                    disabled
                    name="direction"
                    data-selected={editingProduct?.direction}
                    style={{
                      width: "100%",
                      height: "35px",
                      border: "1px solid #d9d9d9",
                      textAlign: "center",
                      cursor: "not-allowed",
                    }}
                  >
                    <option value="Đông">Đông</option>
                    <option value="Tây">Tây</option>
                    <option value="Nam">Nam </option>
                    <option value="Bắc">Bắc </option>
                    <option value="Đông Bắc">Đông Bắc </option>
                    <option value="Đông Nam">Đông Nam </option>
                    <option value="Tây Nam ">Tây Nam </option>
                    <option value="Tây Bắc">Tây Bắc </option>
                  </select>
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Giá sản phẩm:
                  </h5>
                  <Input
                    readOnly
                    type="number"
                    style={{ height: "35px" }}
                    value={editingProduct?.price}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, price: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-6" style={{ padding: "1rem" }}>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Diện tích:
                  </h5>

                  <Input
                    readOnly
                    type="number"
                    style={{ height: "35px" }}
                    value={editingProduct?.acreage}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, acreage: e.target.value };
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Số tầng:
                  </h5>

                  <Input
                    readOnly
                    style={{ height: "35px", marginBottom: "0" }}
                    value={editingProduct?.floor}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, floor: e.target.value };
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Phòng ngủ:
                  </h5>
                  <Input
                    readOnly
                    type="number"
                    style={{ height: "35px" }}
                    value={editingProduct?.bedroom}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, bedroom: e.target.value };
                      });
                    }}
                  />
                </div>
                <div class="form-group" style={{ marginTop: "1rem" }}>
                  <h5 class="title_sticky" id="jumpto_0">
                    Phòng vệ sinh:
                  </h5>
                  <Input
                    readOnly
                    type="number"
                    style={{ height: "35px" }}
                    value={editingProduct?.toilet}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, toilet: e.target.value };
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Mô tả chi tiết:
                  </h5>
                  <TextArea
                    value={editingProduct?.description}
                    readOnly
                    maxLength={1000}
                    style={{ height: "130px" }}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, description: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </Row>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Browse;
