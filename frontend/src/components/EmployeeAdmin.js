import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
  Table,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSellerAdmin,
  deleteSellerAdmin,
  updateSellerAdmin,
} from "../actions/userActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const { TextArea } = Input;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function EmployeeAdmin(props) {
  const { sellers, loading, error } = props;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [createUser, setCreateUser] = useState(null);
  const [dataSource, setDataSource] = useState();
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [previewVisible, SetPreviewVisible] = useState(false);
  const [previewImage, SetPreviewImage] = useState("");
  useEffect(() => {
    setDataSource(sellers);
  }, [sellers]);

  const handleDeleteClick = (id) => {
    console.log(id);
    dispatch(deleteSellerAdmin(id));
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
    const create = dispatch(createSellerAdmin(e, fileList[0].name));
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
          setFileList([]);
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
    const update = dispatch(updateSellerAdmin(e));
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
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => SetPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    SetPreviewImage(file.url || file.preview);
    SetPreviewVisible(true);
  };
  const propss = {
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      AWS.config.update({
        accessKeyId: "AKIAWPLFF2RHPNOWRBHJ",
        secretAccessKey: "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",
      });

      const S3 = new AWS.S3();
      console.log("DEBUG filename", file.name);
      console.log("DEBUG file type", file.type);

      const objParams = {
        Bucket: "nguyenhuuloc-sinhvien-iuh",
        Key: "locdev2000@gmail.com" + "/" + file.name,
        Body: file,
        ContentType: file.type, // TODO: You should set content-type because AWS SDK will not automatically set file MIME
      };

      S3.putObject(objParams)
        .on("httpUploadProgress", function ({ loaded, total }) {
          onProgress(
            {
              percent: Math.round((loaded / total) * 100),
            },
            file
          );
        })
        .send(function (err, data) {
          if (err) {
            onError();
            console.log("Something went wrong");
            console.log(err.code);
            console.log(err.message);
          } else {
            onSuccess(data.response, file);
          }
        });
    },
  };
  const onRemoveImage = (file) => {
    AWS.config.update({
      accessKeyId: "AKIAWPLFF2RHPNOWRBHJ",
      secretAccessKey: "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",
      //   sessionToken: ""
    });

    const S3 = new AWS.S3();
    console.log("DEBUG filename", file.name);
    console.log("DEBUG file type", file.type);

    const objParams = {
      Bucket: "nguyenhuuloc-sinhvien-iuh",
      Key: "locdev2000@gmail.com" + "/" + file.name,
    };

    S3.deleteObject(objParams, function (err, data) {
      if (err) console.log(err, err.stack);
      // error
      else console.log("success"); // deleted
    });
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "Lương cơ bản",
      dataIndex: ["seller", "salary"],
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
            title="Bạn có muốn xóa nhân viên ?"
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
            Thêm nhân viên
          </button>
          <Table columns={columns} dataSource={dataSource} />
          <Modal
            title="Chỉnh sửa nhân viên"
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
                    Tên nhân viên:
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
                    Lương cơ bản:
                  </h5>
                  <Input
                    style={{ height: "35px" }}
                    value={editingUser?.seller?.salary}
                    onChange={(e) => {
                      setEditingUser((pre) => {
                        return {
                          ...pre,
                          seller: { salary: e.target.value },
                        };
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
            title="Thêm nhân viên"
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
                    Tên nhân viên:
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
                <div className="">
                  <div class="form-group">
                    <h3 class="title_sticky">Hình ảnh</h3>
                    <ImgCrop rotate>
                      <Upload
                        {...propss}
                        onRemove={(file) => {
                          onRemoveImage(file);
                          return { ...propss };
                        }}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={handlePreview}
                        status="success"
                      >
                        {fileList.length < 1 && "+ Upload"}
                      </Upload>
                    </ImgCrop>
                    {images.length > 0 && images.map()}
                  </div>
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
export default EmployeeAdmin;
