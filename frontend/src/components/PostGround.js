import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";
import AWS from "aws-sdk";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postGround } from "../actions/groundActions";

const { Option } = Select;
const { Search } = Input;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default function PostGround() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [lat, setLat] = useState(10.8230989);
  const [lng, setLng] = useState(106.6296638);
  //address
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  //img
  const [previewVisible, SetPreviewVisible] = useState(false);
  const [previewImage, SetPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  //Type
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [direction, setDirection] = useState("");
  const [legalDocuments, setLegalDocuments] = useState("");
  function GetCitys() {
    axios
      .get("https://provinces.open-api.vn/api/")
      .then((res) => {
        setCitys(res.data);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  function GetDistricts(code) {
    axios
      .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((res) => {
        setDistricts(res.data.districts);
        setCity(res.data.name);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  function GetWards(code) {
    axios
      .get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then((res) => {
        setWards(res.data.wards);
        setDistrict(res.data.name);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  useEffect(() => {
    GetCitys();
  }, []);

  const onSearch = (value) => {
    axios
      .get(
        //9cbf0bc15d3901b7e043d8f76be8d73f370a82fe629a2d46
        `https://maps.vietmap.vn/api/search?api-version=1.1&apikey=2f7cf1b8d4f0cce9ef2accb74b6c3cd90ac926aa78f90e4c&text=${value}`
      )
      .then(function (response) {
        console.log(response);
        setLng(response.data.data.features[0].bbox[0]);
        setLat(response.data.data.features[0].bbox[1]);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
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
  function OnModalOk(file) {
    if (file) {
      const randomName =
        (Math.random() + 1).toString(36).substring(7) + file.name;
      console.log(randomName);
      AWS.config.update({
        accessKeyId: "AKIAWPLFF2RHPNOWRBHJ",
        secretAccessKey: "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",
      });
      const S3 = new AWS.S3();
      console.log("DEBUG filename", file.name);
      console.log("DEBUG file type", file.type);

      const objParams = {
        Bucket: "nguyenhuuloc-sinhvien-iuh",
        Key: "locdev2000@gmail.com" + "/" + randomName,
        Body: file,
        ContentType: file.type,
      };

      S3.putObject(objParams)
        .on("httpUploadProgress", function ({ loaded, total }) {})
        .send(function (err, data) {
          if (err) {
            console.log("Something went wrong");
            console.log(err.code);
            console.log(err.message);
          } else {
            const image = {
              uid: file.uid,
              name: randomName,
              fileName: randomName,
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModified,
              status: "done",
              thumbUrl:
                "https://nguyenhuuloc-sinhvien-iuh.s3.amazonaws.com/locdev2000%40gmail.com/" +
                randomName,
              url:
                "https://nguyenhuuloc-sinhvien-iuh.s3.amazonaws.com/locdev2000%40gmail.com/" +
                randomName,
            };
            const _fileList = [...fileList];
            _fileList.push(image);
            setFileList(_fileList);
          }
        });
    }
  }

  const [productForm, setProductForm] = useState({
    name: "",
    user: userInfo?._id,
    description: "",
    price: "",
    acreage: "",
    countInStock: 1,
  });
  const onFinish = (e) => {
    let listImages = [];
    for (let item of fileList) {
      listImages.push(item.name);
    }

    const create = dispatch(
      postGround(
        productForm,
        type,
        status,
        legalDocuments,
        address,
        district,
        ward,
        city,
        lat,
        lng,
        listImages
      )
    );
    create
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          resetForm();
        } else {
          console.log("data", data);
          notification.warning({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
        }
      })
      .catch((err) => {
        console.log("dataerr", err);
        notification.error({
          description: err.message,
          placement: "bottomRight",
          duration: 3,
        });
      });
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      user: userInfo?._id,
      image: null,
      description: "",
      price: "",
      acreage: "",
      countInStock: 1,
    });
    setFileList([]);
    var options = document.querySelectorAll("#my_select option");
    for (var i = 0, l = options.length; i < l; i++) {
      options[i].selected = options[i].defaultSelected;
    }
  };

  const handleChangedInput = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (productForm?.address) {
      axios
        .get(
          //9cbf0bc15d3901b7e043d8f76be8d73f370a82fe629a2d46
          `https://maps.vietmap.vn/api/search?api-version=1.1&apikey=2f7cf1b8d4f0cce9ef2accb74b6c3cd90ac926aa78f90e4c&text=${productForm?.address}`
        )
        .then(function (response) {
          console.log(response);
          setLng(response.data.data.features[0].bbox[0]);
          setLat(response.data.data.features[0].bbox[1]);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
  }, [productForm.address]);
  function handleChangeType(value) {
    setType(value);
  }
  function handleChangeStatus(value) {
    setStatus(value);
  }
  function handleChangeLegalDocuments(value) {
    setLegalDocuments(value);
  }
  function handleChangeDiretion(value) {
    setDirection(value);
  }
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 100,
        }}
      >
        <Option value="VN??">VN??</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="ltn__appointment-area pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__appointment-inner">
              <Form onFinish={onFinish}>
                <h2>1. Th??ng tin</h2>
                <p>
                  <small>
                    C??c tr?????ng n??y l?? b???t bu???c: Ti??u ?????, ph????ng ti???n thu???c t??nh
                  </small>
                </p>
                <div className="row">
                  <div className="col-md-12">
                    <h6>T??n S???n Ph???m</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "T??n s???n ph???m kh??ng ???????c b??? tr???ng",
                          },
                          {
                            whitespace: true,
                            message:
                              "T??n s???n ph???m kh??ng ???????c nh???p kho???ng tr???ng",
                          },
                          { min: 25, message: "T??n s???n ph???m qu?? ng???n" },
                          { max: 70, message: "T??n s???n ph???m qu?? d??i" },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="name"
                          name="name"
                          size="large"
                          placeholder="T??n s???n ph???m"
                          value={productForm?.name}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                      {/* <input
                        type="text"
                        name="name"
                        placeholder="T??n s???n ph???m"
                        value={productForm.name}
                        onChange={handleChangedInput}
                      /> */}
                    </div>
                    <h6>M?? T??? Chi Ti???t</h6>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <Form.Item
                        name="M?? t??? s???n ph???m"
                        rules={[
                          {
                            required: true,
                            message: "M?? t??? s???n ph???m kh??ng ???????c b??? tr???ng",
                          },
                          {
                            whitespace: true,
                            message:
                              "M?? t??? s???n ph???m kh??ng ???????c nh???p kho???ng tr???ng",
                          },
                          { min: 20, message: "M?? t??? s???n ph???m qu?? ng???n" },
                        ]}
                        hasFeedback
                      >
                        <TextArea
                          name="description"
                          showCount
                          maxLength={1000}
                          placeholder="M?? t??? s???n ph???m"
                          value={productForm?.description}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                      {/* <textarea
                        name="description"
                        placeholder="M?? t??? chi ti???t"
                        onChange={handleChangedInput}
                        value={productForm.description}
                      /> */}
                    </div>
                  </div>
                </div>
                <h6>Gi?? S???n Ph???m</h6>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "Gi?? s???n ph???m kh??ng ???????c b??? tr???ng",
                          },
                          {
                            whitespace: true,
                            message: "Gi?? s???n ph???m kh??ng nh???p kho???ng tr???ng",
                          },
                          {
                            min: 6,
                            message:
                              "Gi?? s???n ph???m ph???i l???n h??n ho???c b???ng 100.000",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          addonAfter={suffixSelector}
                          type="number"
                          name="price"
                          size="large"
                          placeholder="Gi?? s???n ph???m"
                          value={productForm?.price}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                      {/* <input
                        type="text"
                        name="price"
                        placeholder="Gi?? s???n ph???m"
                        value={productForm.price}
                        onChange={handleChangedInput}
                      /> */}
                    </div>
                  </div>
                </div>
                <h2>2. Chi Ti???t</h2>

                <div className="row">
                  <div className="col-md-4">
                    <h6>Lo???i S???n Ph???m</h6>
                    <Form.Item
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Vui l??ng ch???n lo???i s???n ph???m",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Lo???i S???n Ph???m"
                        style={{ width: "100%" }}
                        onChange={handleChangeType}
                        size="large"
                      >
                        <Option value="?????t d??? ??n">?????t d??? ??n</Option>
                        <Option value="?????t th??? c??">?????t th??? c??</Option>
                        <Option value="?????t n??ng nghi???p">?????t n??ng nghi???p</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-lg-4">
                    <h6>Tr???ng Th??i S???n Ph???m</h6>
                    <Form.Item
                      name="status"
                      rules={[
                        {
                          required: true,
                          message: "Vui l??ng ch???n tr???ng th??i s???n ph???m",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Tr???ng Th??i S???n Ph???m"
                        style={{ width: "100%" }}
                        onChange={handleChangeStatus}
                        size="large"
                      >
                        <Option value="B??n">B??n</Option>
                        <Option value="Cho thu??">Cho thu??</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-lg-4">
                    <h6>Gi???y T??? Ph??p L??</h6>
                    <Form.Item
                      name="legalDocuments"
                      rules={[
                        {
                          required: true,
                          message: "Vui l??ng ch???n gi???y t??? ph??p l??",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Gi???y T??? Ph??p L??"
                        style={{ width: "100%" }}
                        size="large"
                        onChange={handleChangeLegalDocuments}
                      >
                        <Option value="S??? ?????">S??? ?????</Option>
                        <Option value="H???p ?????ng mua b??n">
                          H???p ?????ng mua b??n
                        </Option>
                        <Option value="??ang ch??? s???">??ang ch??? s???</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div
                    className="col-md-12"
                    style={{ marginTop: "2rem", marginBottom: "2rem" }}
                  >
                    <h6>Di???n T??ch</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="acreage"
                        rules={[
                          {
                            required: true,
                            message: "Di???n t??ch kh??ng ???????c b??? tr???ng",
                          },
                          {
                            whitespace: true,
                            message: "Di???n t??ch kh??ng ???????c nh???p kho???ng tr???ng",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="number"
                          size="large"
                          name="acreage"
                          placeholder="Di???n t??ch s???n ph???m"
                          value={productForm?.acreage}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                      {/* <input
                        type="text"
                        name="acreage"
                        placeholder="Di???n t??ch"
                        value={productForm.acreage}
                        onChange={handleChangedInput}
                      /> */}
                    </div>
                  </div>
                </div>

                <h2 style={{ marginTop: "2rem" }}>3. ?????a Ch???</h2>
                <h6>?????a ch??? chi ti???t</h6>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="input-item">
                      <Form.Item
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: "Vui l??ng ch???n T???nh / Th??nh ph???",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Ch???n t???nh/ Th??nh ph???"
                          size="large"
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.label
                              .toLowerCase()
                              .localeCompare(optionB.label.toLowerCase())
                          }
                          options={
                            citys &&
                            citys.map((value) => {
                              return {
                                key: value.name,
                                label: value.name,
                                value: value.code,
                              };
                            })
                          }
                          onChange={(value) => {
                            GetDistricts(value);
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="input-item">
                      <Form.Item
                        name="district"
                        rules={[
                          {
                            required: true,
                            message: "Vui l??ng ch???n Qu???n / Huy???n",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Ch???n qu???n/ huy???n"
                          size="large"
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.label
                              .toLowerCase()
                              .localeCompare(optionB.label.toLowerCase())
                          }
                          options={
                            districts &&
                            districts.map((value) => {
                              return {
                                key: value.name,
                                label: value.name,
                                value: value.code,
                              };
                            })
                          }
                          onChange={(value) => GetWards(value)}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="input-item">
                      <Form.Item
                        name="ward"
                        rules={[
                          {
                            required: true,
                            message: "Vui l??ng ch???n Ph?????ng / X??",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          size="large"
                          placeholder="Ch???n Ph?????ng / X??"
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.label
                              .toLowerCase()
                              .localeCompare(optionB.label.toLowerCase())
                          }
                          options={
                            wards &&
                            wards.map((value) => {
                              return {
                                key: value.name,
                                label: value.name,
                                value: value.name,
                              };
                            })
                          }
                          onChange={(value) => setWard(value)}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "1rem" }}>
                  <div className="col-md-12">
                    <h6>?????a Ch??? C??? Th???</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="?????a ch??? nh??"
                        rules={[
                          {
                            required: true,
                            message: "?????a ch??? nh?? kh??ng ???????c b??? tr???ng",
                          },
                          {
                            whitespace: true,
                            message: "?????a ch??? nh?? kh??ng ???????c nh???p kho???ng tr???ng",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="address"
                          name="address"
                          size="large"
                          placeholder="?????a ch??? nh??"
                          value={address}
                          onChange={(value) => setAddress(value.target.value)}
                        />
                      </Form.Item>
                      {/* <input
                        type="text"
                        name="ltn__name"
                        placeholder="Nh???p ?????a ch??? nh??"
                        value={address}
                        onChange={(value) => setAddress(value.target.value)}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h6>?????a Ch??? Nh???n ???????c</h6>
                    <Search
                      type="address"
                      style={{ height: "80px" }}
                      placeholder="?????a ch??? nh???n ???????c"
                      allowClear
                      enterButton="T??m ki???m"
                      size="large"
                      value={`${address ? address + " ," : ""}${
                        ward ? ward + " ," : ""
                      }${district ? district + " ," : ""}${city}`}
                      onSearch={onSearch}
                    />
                  </div>
                </div>
                <div className="row" style={{ marginTop: "1rem" }}>
                  <div className="col-lg-12">
                    <div className="property-details-google-map mb-60">
                      <iframe
                        src={`https://maps.google.com/maps?q=${lat},${lng}&output=embed`}
                        width="100%"
                        height="100%"
                        frameBorder={0}
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex={0}
                      />
                    </div>
                  </div>
                </div>
                <h2>4. H??nh ???nh</h2>
                <h6>Danh s??ch h??nh ???nh</h6>
                <div className="row">
                  <div className="col-lg-12">
                    <ImgCrop rotate onModalOk={(file) => OnModalOk(file)}>
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={handlePreview}
                        status="success"
                      >
                        {fileList.length < 5 && "+ Upload"}
                      </Upload>
                    </ImgCrop>
                  </div>
                </div>

                <div className="btn-wrapper text-center mt-30">
                  <Button
                    type="danger"
                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    htmlType="submit"
                    style={{
                      color: "black",
                      width: "300px",
                      height: "100px",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                    size="large"
                  >
                    G???i B??i
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={previewVisible}
        title="Chi ti???t h??nh ???nh"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}
