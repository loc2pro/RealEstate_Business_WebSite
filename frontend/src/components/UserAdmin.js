import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  createUserAdmin,
  deleteUser,
  updateUser,
} from "../actions/userActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { Option } = Select;

const { TextArea } = Input;
function UserAdmin(props) {
  useEffect(() => {
    document.querySelectorAll("[data-selected]").forEach((e) => {
      e.value = e.dataset.selected;
    });
  });
  const { users, loading, error } = props;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [createUser, setCreateUser] = useState(null);
  const [dataSource, setDataSource] = useState();
  const [keySearch, setkeySearch] = useState("");

  useEffect(() => {
    setDataSource(users);
  }, [users]);

  const handleDeleteClick = (id) => {
    dispatch(deleteUser(id));
    setDataSource(dataSource.filter((item) => item._id !== id));
  };

  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const onCreateUser = () => {
    setIsCreate(true);
  };
  const resetCreate = () => {
    setIsCreate(false);
    setCreateUser(null);
  };

  const handleCreateClick = (e) => {
    const create = dispatch(createUserAdmin(e));
    create
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          setDataSource((pre) => {
            return [...pre, data.user];
          });
          resetCreate();
        } else {
          notification.warning({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
        }
      })
      .catch((err) => {
        console.log(err, "err");
        notification.error({
          description: err.message,
          placement: "bottomRight",
          duration: 3,
        });
      });
  };

  const handleUpdateClick = (e) => {
    const update = dispatch(updateUser(e));
    update
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          setDataSource((dataSource) => {
            return dataSource.map((user) => {
              if (user._id === editingUser._id) {
                return editingUser;
              } else {
                return user;
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

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue="+84"
        style={{
          width: 100,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      with: 200,
      fixed: "left",
    },
    {
      title: "email",
      dataIndex: "email",
      with: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      with: 200,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      with: 400,
    },
    {
      title: "Action",
      with: 50,
      fixed: "right",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <EditOutlined
              onClick={() => {
                onEditUser(record);
              }}
            />
          </a>
          <Popconfirm
            title="Bạn có muốn xóa người dùng ?"
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
          <div className="btn-wrapper animated ">
            <button
              onClick={onCreateUser}
              style={{ float: "right", margin: "0 0 5px" }}
              className="theme-btn-1 btn btn-effect-1 go-top"
            >
              Thêm người dùng
            </button>
          </div>
          <Input
            onChange={(e) => {
              const value = e.target.value;
              setkeySearch(value);
            }}
            className="custom-antd-input"
            placeholder="Tìm kím theo tên người dùng"
            prefix={<SearchOutlined />}
            size="small"
          ></Input>
          <Table
            columns={columns}
            dataSource={dataSource?.filter(
              (data) =>
                !keySearch ||
                data.name.toLowerCase().includes(keySearch.toLowerCase())
            )}
            scroll={{ x: 2000, y: 800 }}
            pagination={{ pageSize: 20 }}
          />
          <Modal
            title="Chỉnh sửa người dùng"
            visible={isEditing}
            width={1600}
            okText="ok"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              handleUpdateClick(editingUser);
              resetEditing();
            }}
          >
            <Row>
              <div className="col-6" style={{ padding: "1rem" }}>
                <div class="form-group">
                  <h3 class="title_sticky" id="jumpto_0">
                    Tên người dùng:
                  </h3>
                  <Input
                    size="large"
                    value={editingUser?.name}
                    onChange={(e) => {
                      setEditingUser((pre) => {
                        return { ...pre, name: e.target.value };
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Email:
                  </h5>
                  <Input
                    size="large"
                    value={editingUser?.email}
                    onChange={(e) => {
                      setEditingUser((pre) => {
                        return { ...pre, email: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-6" style={{ padding: "1rem" }}>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Số điện thoại:
                  </h5>

                  <Input
                    type="number"
                    size="large"
                    className="custom-ant-input"
                    value={editingUser?.phone}
                    onChange={(e) => {
                      setEditingUser((pre) => {
                        return { ...pre, phone: e.target.value };
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    Địa chỉ:
                  </h5>
                  <Input
                    size="large"
                    value={editingUser?.address}
                    onChange={(e) => {
                      setEditingUser((pre) => {
                        return { ...pre, address: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </Row>
          </Modal>
          <Modal
            title="Thêm người dùng"
            visible={isCreate}
            width={1600}
            okText="ok"
            onCancel={() => {
              resetCreate();
            }}
            onOk={() => {
              resetCreate();
            }}
          >
            <Row>
              <Form style={{ width: "100%" }} onFinish={handleCreateClick}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      whitespace: true,
                      message: "Tên không được nhập khoảng trống",
                    },
                    {
                      required: true,
                      message: "Tên không được bỏ trống",
                    },
                  ]}
                >
                  <Input
                    placeholder=" Nhập vào tên "
                    value={createUser?.name}
                    onChange={(e) => {
                      setCreateUser((pre) => {
                        return { ...pre, name: e.target.value };
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Định dạng email không hợp lệ",
                    },
                    {
                      required: true,
                      message: "Email không được bỏ trống",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập email"
                    value={createUser?.email}
                    onChange={(e) => {
                      setCreateUser((pre) => {
                        return { ...pre, email: e.target.value };
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      whitespace: true,
                      message: "Số điện thoại không được nhập khoảng trống",
                    },
                    {
                      required: true,
                      message: "Số điện thoại không được bỏ trống",
                    },
                    {
                      max: 9,
                      message: "Số điện thoại vượt quá giới hạn",
                    },
                    {
                      min: 9,
                      message: "Số điện thoại phải đủ 10 số",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    placeholder="Nhập số điện thoại"
                    type="number"
                    size="large"
                    className="custom-ant-input-number"
                    value={createUser?.phone}
                    onChange={(e) => {
                      setCreateUser((pre) => {
                        return { ...pre, phone: e.target.value };
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      whitespace: true,
                      message: "Địa chỉ không được nhập khoảng trống",
                    },
                    {
                      required: true,
                      message: "Địa chỉ không được bỏ trống",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập địa chỉ"
                    value={createUser?.address}
                    onChange={(e) => {
                      setCreateUser((pre) => {
                        return { ...pre, address: e.target.value };
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Password không được để trống",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder=" Nhập Mật Khẩu"
                    value={createUser?.password}
                    onChange={(e) => {
                      setCreateUser((pre) => {
                        return { ...pre, password: e.target.value };
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Password không được bỏ trống",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("passwords không giống nhau")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder=" Nhập lại mật khẩu" />
                </Form.Item>
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    style={{ float: "right" }}
                  >
                    TẠO NGƯỜI DÙNG
                  </button>
                </div>
              </Form>
            </Row>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default UserAdmin;
