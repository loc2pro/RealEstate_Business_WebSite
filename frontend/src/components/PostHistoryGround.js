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
      fixed: "left",
      title: "T??n s???n ph???m",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Lo???i",
      dataIndex: "type",
    },
    {
      key: "3",
      title: "Tr???ng th??i",
      dataIndex: "status",
    },
    {
      key: "4",
      title: "?????a ch???",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Gi??",
      dataIndex: "price",
    },
    {
      key: "6",
      title: "Tr???ng th??i b??n",
      dataIndex: "countInStock",
    },
    {
      key: "7",
      fixed: "right",
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          {record.browse && record.countInStock == 1 ? (
            <Popconfirm
              title="B???n c?? mu???n chuy???n trang ????? xem th??ng tin?"
              onConfirm={() => handleClick(record._id)}
            >
              <a>
                <EyeOutlined />
              </a>
            </Popconfirm>
          ) : (
            <Popconfirm title="S???n ph???m c???a b???n ch??a ???????c duy???t?">
              <a disabled>
                <EyeOutlined />
              </a>
            </Popconfirm>
          )}
          {record.browse && record.countInStock == 1 ? (
            <a>
              <EditOutlined
                onClick={() => {
                  onEditProduct(record);
                }}
              />
            </a>
          ) : (
            <a disabled>
              <EditOutlined />
            </a>
          )}

          <Popconfirm
            title="B???n c?? mu???n x??a s???n ph???m?"
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
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 2000, y: 700 }}
          />
          <Modal
            title="Ch???nh s???a s???n ph???m "
            visible={isEditing}
            width={1600}
            okText="L??u"
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
                    T??n s???n ph???m:
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
                    Lo???i s???n ph???m:
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
                    <option value="?????t d??? ??n">?????t d??? ??n</option>
                    <option value="?????t th??? c??">?????t th??? c??</option>
                    <option value="?????t n??ng nghi???p">?????t n??ng nghi???p</option>
                  </select>
                </div>
                <div class="form-group" style={{ marginTop: "1rem" }}>
                  <h3 class="title_sticky" id="jumpto_0">
                    Tr???ng th??i s???n ph???m:
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
                    <option value="B??n">B??n</option>
                    <option value="Cho thu??">Cho thu??</option>
                  </select>
                </div>
                <div class="form-group">
                  <h3 class="title_sticky" id="jumpto_0">
                    Gi???y t??? ph??p l??:
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
                    <option value="S??? ?????">S??? ?????</option>
                    <option value="H???p ?????ng mua b??n">H???p ?????ng mua b??n</option>
                    <option value="??ang ch??? s???">??ang ch??? s???</option>
                  </select>
                </div>
              </div>
              <div className="col-6" style={{ padding: "1rem" }}>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Gi?? s???n ph???m:
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
                    Di???n t??ch:
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
                    M?? t??? chi ti???t:
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
