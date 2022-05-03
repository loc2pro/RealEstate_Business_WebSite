import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
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
import { useHistory } from "react-router-dom";
import {
  deletePost,
  deletePostGrounds,
  updatePost,
  updatePostGrounds,
} from "../actions/postActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function PostHistoryGround(props) {
  useEffect(() => {
    document.querySelectorAll("[data-selected]").forEach((e) => {
      e.value = e.dataset.selected;
    });
  });
  const { grounds, loading, error } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    setDataSource(grounds?.ground);
  }, [grounds.ground]);

  const handleDeleteClick = (id) => {
    dispatch(deletePostGrounds(id));
    setDataSource(dataSource.filter((item) => item._id !== id));
  };
  const handleClick = (id) => {
    history.push(`/groundDetails/${id}`);
  };
  const onEditProduct = (record) => {
    console.log("record", record);
    setIsEditing(true);
    setEditingProduct({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };
  const handleUpdateClick = (e) => {
    console.log("update", e);
    const update = dispatch(updatePostGrounds(e._id, e));
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
      title: "Giá",
      dataIndex: "price",
    },
    {
      key: "6",
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          {record.browse ? (
            <Popconfirm
              title="Bạn có muốn chuyển trang để xem thông tin?"
              onConfirm={() => handleClick(record._id)}
            >
              <a>
                <EyeOutlined />
              </a>
            </Popconfirm>
          ) : (
            <Popconfirm title="Sản phẩm của bạn chưa được duyệt?">
              <a disabled>
                <EyeOutlined />
              </a>
            </Popconfirm>
          )}
          <a>
            <EditOutlined
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
              <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />
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
            title="Chỉnh sửa sản phẩm "
            visible={isEditing}
            width={1600}
            okText="Lưu"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              handleUpdateClick(editingProduct);
              console.log(editingProduct, "editng");
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
                    <option value="Đất dự án">Đất dự án</option>
                    <option value="Đất thổ cư">Đất thổ cư</option>
                    <option value="Đất nông nghiệp">Đất nông nghiệp</option>
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
              </div>
              <div className="col-6" style={{ padding: "1rem" }}>
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

export default PostHistoryGround;
