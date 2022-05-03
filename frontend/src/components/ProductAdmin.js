import {
  DeleteOutlined,
  DollarCircleOutlined,
  EyeOutlined,
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
import {
  deleteProduct,
  updateInstock,
  updateProduct,
} from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function ProductAdmin(props) {
  const { products, loading, error } = props;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    setDataSource(products);
  }, [products]);

  const handleDeleteClick = (id) => {
    console.log(id, "id");
    dispatch(deleteProduct(id));
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
    console.log(e, "product");
    const update = dispatch(updateProduct(e._id, e));
    update
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          setDataSource((dataSource) => {
            return dataSource.map((product) => {
              if (product._id === editingProduct._id) {
                return editingProduct;
              } else {
                return product;
              }
            });
          });
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
      fixed: "left",
      width: 400,
      dataIndex: "name",
    },
    {
      title: "Loại",
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
      width: 120,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 500,
    },
    {
      title: "Giấy tờ pháp lí",
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
      width: 300,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      width: 150,
      fixed: "right",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
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
            onConfirm={() => handleDeleteClick(record._id)}
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
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 2000, y: 500 }}
          />
          <Modal
            title="Chỉnh sửa sản phẩm "
            visible={isEditing}
            width={1600}
            okText="Cập nhật"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              handleUpdateClick(editingProduct);
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
                    style={{ height: "35px" }}
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
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, type: e.target.value };
                      });
                    }}
                    style={{
                      width: "100%",
                      height: "35px",
                      border: "1px solid #d9d9d9",
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
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, status: e.target.value };
                      });
                    }}
                    style={{
                      width: "100%",
                      height: "35px",
                      border: "1px solid #d9d9d9",
                      textAlign: "center",
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
                    name="legalDocuments"
                    data-selected={editingProduct?.legalDocuments}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, legalDocuments: e.target.value };
                      });
                    }}
                    style={{
                      width: "100%",
                      height: "35px",
                      border: "1px solid #d9d9d9",
                      textAlign: "center",
                    }}
                  >
                    <option value="Sổ đỏ">Sổ đỏ</option>
                    <option value="Hợp đồng mua bán">Hợp đồng mua bán</option>
                    <option value="Đang chờ sổ">Đang chờ sổ</option>
                  </select>
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Giá sản phẩm:
                  </h5>
                  <Input
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
                    Phòng ngủ:
                  </h5>
                  <Input
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

export default ProductAdmin;
