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
import { deleteGround, updateGround } from "../actions/groundActions";
import { deleteProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import urlImages from "../api/url";
import MessageBox from "./MessageBox";
const { TextArea } = Input;

function GroundAdmin(props) {
  const { grounds, loading, error } = props;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [keySearch, setkeySearch] = useState("");
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    setDataSource(grounds);
  }, [grounds]);

  const handleDeleteClick = (id) => {
    dispatch(deleteGround(id));
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
    const update = dispatch(updateGround(e._id, e));
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
      title: "T??n s???n ph???m",
      dataIndex: "name",
      width: 400,
      fixed: "left",
    },
    {
      title: "H??nh ???nh",
      dataIndex: "image",
      render: (theImageURL) => <img src={`${urlImages}${theImageURL[0]}`} />,
    },
    {
      title: "Lo???i",
      dataIndex: "type",
      filters: [
        {
          text: <span>?????t d??? ??n</span>,
          value: "?????t d??? ??n",
        },
        {
          text: <span>?????t th??? c??</span>,
          value: "?????t th??? c??",
        },
        {
          text: <span>?????t n??ng nghi???p</span>,
          value: "?????t n??ng nghi???p",
        },
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      filterSearch: (input, record) => record.value.indexOf(input) > -1,
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
      width: 120,
    },
    {
      title: "?????a ch???",
      width: 500,
      dataIndex: "address",
    },
    {
      title: "Gi???y t??? ph??p l??",
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
      width: 300,
    },
    {
      title: "Kho",
      dataIndex: "countInStock",
      width: 150,
    },
    {
      title: "Gi??",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      width: 150,
      fixed: "right",
    },
    {
      key: "7",
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
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
          <Input
            onChange={(e) => {
              const value = e.target.value;
              setkeySearch(value);
            }}
            className="custom-antd-input"
            placeholder="T??m k??m theo t??n s???n ph???m, lo???i, tr???ng th??i"
            prefix={<SearchOutlined />}
            size="small"
          ></Input>
          <Table
            columns={columns}
            dataSource={dataSource?.filter(
              (data) =>
                !keySearch ||
                data.name.toLowerCase().includes(keySearch.toLowerCase()) ||
                data.type.toLowerCase().includes(keySearch.toLowerCase()) ||
                data.status.toLowerCase().includes(keySearch.toLowerCase())
            )}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 2000, y: 500 }}
          />
          <Modal
            title="Ch???nh s???a s???n ph???m "
            visible={isEditing}
            width={1600}
            okText="C???p nh???t"
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
                    style={{ height: "140px" }}
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

export default GroundAdmin;
