import {
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
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
  paymentSalarySellerAdmin,
  updateSellerAdmin,
} from "../actions/userActions";
import LoadingBox from "./LoadingBox";
import urlImages from "../api/url";
import MessageBox from "./MessageBox";
const { Option } = Select;

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
  const { sellers, loading, error, parentCallback } = props;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isSalary, setIsSalary] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [createUser, setCreateUser] = useState(null);
  const [dataSource, setDataSource] = useState();
  const [salary, setSalary] = useState();

  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [previewVisible, SetPreviewVisible] = useState(false);
  const [previewImage, SetPreviewImage] = useState("");
  const [keySearch, setkeySearch] = useState("");

  useEffect(() => {
    setDataSource(sellers);
  }, [sellers]);
  useEffect(() => {
    parentCallback(salary);
  }, [salary]);

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

  const onSalary = () => {
    setIsSalary(true);
  };
  const resetSalary = () => {
    setIsSalary(false);
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
  const handleSalaryClick = (e) => {
    const payment = dispatch(paymentSalarySellerAdmin(e));
    payment
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          setSalary(data);
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
      title: "T??n ng?????i d??ng",
      dataIndex: "name",
      width: 200,
      fixed: "left",
    },
    {
      title: "H??nh ???nh",
      dataIndex: ["seller", "logo"],
      width: 100,
      render: (theImageURL) => <img src={`${urlImages}${theImageURL}`} />,
    },
    {
      title: "L????ng c?? b???n",
      dataIndex: ["seller", "salary"],
      width: 200,
    },
    {
      title: "Th?????ng hoa h???ng",
      dataIndex: ["seller", "bonus"],
      width: 200,
    },
    {
      title: "email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phone",
      width: 200,
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
      width: 400,
    },

    {
      title: "Action",
      width: 100,
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
            title="B???n c?? mu???n x??a nh??n vi??n ?"
            onConfirm={() => handleDeleteClick(record._id)}
          >
            <a>
              <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />
            </a>
          </Popconfirm>
          <Popconfirm
            title="X??c nh???n thanh to??n l????ng cho nh??n vi??n ?"
            onConfirm={() => handleSalaryClick(record._id)}
          >
            <a>
              <DollarOutlined style={{ color: "green", marginLeft: 12 }} />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
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
              className="theme-btn-1 btn btn-effect-1 go-top"
              style={{ float: "right", margin: "0 10px 5px" }}
            >
              Th??m nh??n vi??n
            </button>
          </div>
          <Input
            onChange={(e) => {
              const value = e.target.value;
              setkeySearch(value);
            }}
            className="custom-antd-input"
            placeholder="T??m k??m theo t??n nh??n vi??n"
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
            title="Ch???nh s???a nh??n vi??n"
            visible={isEditing}
            width={1600}
            okText="L??u"
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
                    T??n nh??n vi??n:
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
                    L????ng c?? b???n:
                  </h5>
                  <Input
                    size="large"
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
                    S??? ??i???n tho???i:
                  </h5>

                  <Input
                    type="number"
                    className="custom-ant-input"
                    size="large"
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
                    ?????a ch???:
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
            title="Th??m nh??n vi??n"
            visible={isCreate}
            width={1600}
            okText="Ok"
            onCancel={() => {
              resetCreate();
            }}
            onOk={() => {
              // console.log("user", createUser);
              // handleCreateClick(createUser);
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
                      message: "T??n kh??ng ???????c nh???p kho???ng tr???ng",
                    },
                    {
                      required: true,
                      message: "T??n kh??ng ???????c b??? tr???ng",
                    },
                  ]}
                >
                  <Input
                    placeholder=" Nh???p v??o t??n "
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
                      message: "?????nh d???ng email kh??ng h???p l???",
                    },
                    {
                      required: true,
                      message: "Email kh??ng ???????c b??? tr???ng",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nh???p email"
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
                      message: "S??? ??i???n tho???i kh??ng ???????c nh???p kho???ng tr???ng",
                    },
                    {
                      required: true,
                      message: "S??? ??i???n tho???i kh??ng ???????c b??? tr???ng",
                    },
                    {
                      max: 9,
                      message: "S??? ??i???n tho???i ch??? c?? 10 s???",
                    },
                    {
                      min: 9,
                      message: "S??? ??i???n tho???i ph???i ????? 10 s???",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    placeholder="Nh???p s??? ??i???n tho???i"
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
                      message: "?????a ch??? kh??ng ???????c nh???p kho???ng tr???ng",
                    },
                    {
                      required: true,
                      message: "?????a ch??? kh??ng ???????c b??? tr???ng",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nh???p ?????a ch???"
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
                      message: "Password kh??ng ???????c ????? tr???ng",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder=" Nh???p M???t Kh???u"
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
                      message: "Password kh??ng ???????c b??? tr???ng",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("passwords kh??ng gi???ng nhau")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder=" Nh???p l???i m???t kh???u" />
                </Form.Item>
                <h3 class="title_sticky">H??nh ???nh</h3>
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
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    style={{ float: "right" }}
                  >
                    T???O NH??N VI??N
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
export default EmployeeAdmin;
