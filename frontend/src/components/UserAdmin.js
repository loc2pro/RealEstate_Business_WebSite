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
import {
  createUserAdmin,
  deleteUser,
  updateUser,
} from "../actions/userActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
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
  useEffect(() => {
    setDataSource(users);
  }, [users]);

  const handleDeleteClick = (id) => {
    console.log(id);
    dispatch(deleteUser(id));
    setDataSource(dataSource.filter((item) => item._id !== id));
  };

  const onEditUser = (record) => {
    console.log("record", record);
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
    console.log(e, "usertest");
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

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Action",
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
          <button
            onClick={onCreateUser}
            style={{ float: "right", margin: "0 0 5px" }}
          >
            Thêm người dùng
          </button>
          <Table columns={columns} dataSource={dataSource} />
          <Modal
            title="Chỉnh sửa người dùng"
            visible={isEditing}
            width={1600}
            okText="Lưu"
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
                    style={{ height: "35px" }}
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
                    style={{ height: "35px" }}
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
                    style={{ height: "35px" }}
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
                    style={{ height: "35px" }}
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
            okText="Lưu"
            onCancel={() => {
              resetCreate();
            }}
            onOk={() => {
              console.log("user", createUser);
              handleCreateClick(createUser);
            }}
          >
            <Row>
              <div className="col-6" style={{ padding: "1rem" }}>
                <div class="form-group">
                  <h3 class="title_sticky" id="jumpto_0">
                    Tên người dùng:
                  </h3>
                  <Input
                    style={{ height: "35px" }}
                    value={createUser?.name}
                    onChange={(e) => {
                      setCreateUser((pre) => {
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
                    style={{ height: "35px" }}
                    value={createUser?.email}
                    onChange={(e) => {
                      setCreateUser((pre) => {
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
                    style={{ height: "35px" }}
                    value={createUser?.phone}
                    onChange={(e) => {
                      setCreateUser((pre) => {
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
                    style={{ height: "35px" }}
                    value={createUser?.address}
                    onChange={(e) => {
                      setCreateUser((pre) => {
                        return { ...pre, address: e.target.value };
                      });
                    }}
                  />
                </div>
                <div class="form-group">
                  <h5 class="title_sticky" id="jumpto_0">
                    password:
                  </h5>
                  <Input
                    type="password"
                    style={{ height: "35px" }}
                    value={createUser?.password}
                    onChange={(e) => {
                      setCreateUser((pre) => {
                        return { ...pre, password: e.target.value };
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

export default UserAdmin;
