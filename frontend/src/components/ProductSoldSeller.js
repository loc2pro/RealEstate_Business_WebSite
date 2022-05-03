import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Input, Modal, Popconfirm, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/postActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function ProductSoldSeller(props) {
  const { products, loading, error, userInfo } = props;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    setDataSource(products?.product);
  }, [products]);

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

  const columns = [
    {
      key: "1",
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Loại",
      dataIndex: "type",
    },
    {
      key: "3",
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      key: "4",
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Giấy tờ pháp lí",
      dataIndex: "legalDocuments",
    },
    {
      key: "6",
      title: "Giá",
      dataIndex: "price",
    },
    {
      key: "7",
      title: "Action",
      key: "action",
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
          <Table columns={columns} dataSource={dataSource} />
          <Modal
            title="Thông tin sản phẩm "
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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

export default ProductSoldSeller;
