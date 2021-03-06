import {
  DeleteOutlined,
  EyeOutlined,
  CheckOutlined,
  DollarCircleOutlined,
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
import { updateInstockGrounds } from "../actions/groundActions";
import { deletePost } from "../actions/postActions";
import { updateBrowse, updateInstock } from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function GroundSeller(props) {
  const { grounds, loading, error, parentCallback } = props;
  console.log(grounds, "products");
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    setDataSource(grounds?.ground);
  }, [grounds]);

  useEffect(() => {
    parentCallback(dataSource);
  }, [dataSource]);

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
    const update = dispatch(updateInstockGrounds(e._id));
    update
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          console.log(data, "data");
          setDataSource(
            dataSource.filter((item) => item._id !== data.ground._id)
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
      key: "1",
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
      title: "Gi???y t??? ph??p l??",
      dataIndex: "legalDocuments",
    },
    {
      key: "6",
      title: "Gi??",
      dataIndex: "price",
    },
    {
      key: "7",
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            title="X??c nh???n s???n ph???m ???? b??n"
            onConfirm={() => handleUpdateClick(record)}
          >
            <a>
              <DollarCircleOutlined style={{ color: "green" }} />
            </a>
          </Popconfirm>
          <a>
            <EyeOutlined
              onClick={() => {
                onEditProduct(record);
              }}
            />
          </a>

          <Popconfirm
            title="B???n c?? mu???n x??a s???n ph???m?"
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
            title="Th??ng tin s???n ph???m "
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
                    T??n s???n ph???m:
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
                    Lo???i s???n ph???m:
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
                    <option value="Nh??">Nh??</option>
                    <option value="Chung c??">Chung c??</option>
                  </select>
                </div>
                <div class="form-group" style={{ marginTop: "1rem" }}>
                  <h3 class="title_sticky" id="jumpto_0">
                    Tr???ng th??i s???n ph???m:
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
                    <option value="B??n">B??n</option>
                    <option value="Cho thu??">Cho thu??</option>
                  </select>
                </div>
                <div class="form-group">
                  <h3 class="title_sticky" id="jumpto_0">
                    Gi???y t??? ph??p l??:
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
                    <option value="S??? ?????">S??? ?????</option>
                    <option value="H???p ?????ng mua b??n">H???p ?????ng mua b??n</option>
                    <option value="??ang ch??? s???">??ang ch??? s???</option>
                  </select>
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Gi?? s???n ph???m:
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
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    S??? ??i???n tho???i kh??ch h??ng:
                  </h5>
                  <Input
                    disabled
                    value={editingProduct?.user.phone}
                    style={{ height: "35px" }}
                    maxLength={1000}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, user: { phone: e.target.value } };
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Email kh??ch h??ng:
                  </h5>
                  <Input
                    disabled
                    value={editingProduct?.user.email}
                    style={{ height: "35px" }}
                    maxLength={1000}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, user: { email: e.target.value } };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-6" style={{ padding: "1rem" }}>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    ?????a ch??? kh??ch h??ng:
                  </h5>
                  <Input
                    disabled
                    value={editingProduct?.user.address}
                    style={{ height: "35px" }}
                    maxLength={1000}
                    onChange={(e) => {
                      setEditingProduct((pre) => {
                        return { ...pre, user: { address: e.target.value } };
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Di???n t??ch:
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
                    Ph??ng ng???:
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
                    Ph??ng v??? sinh:
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
                    M?? t??? chi ti???t:
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

export default GroundSeller;
