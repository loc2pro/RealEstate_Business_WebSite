import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Select,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";
import AWS from "aws-sdk";
import axios from "axios";
import FormData from "form-data";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postProduct } from "../actions/productActions";

const { Option } = Select;
const { TextArea } = Input;
const { Search } = Input;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function Post() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const postProducts = useSelector((state) => state.postProducts);
  // get Geocoding
  const [lat, setLat] = useState(10.8230989);
  const [lng, setLng] = useState(106.6296638);
  //upload images
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [previewVisible, SetPreviewVisible] = useState(false);
  const [previewImage, SetPreviewImage] = useState("");
  //address
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");

  const [utilities, setUtilities] = useState([]);

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

  const onRemoveImage = (file) => {
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
    };

    S3.deleteObject(objParams, function (err, data) {
      if (err) console.log(err, err.stack);
      // error
      else console.log("success"); // deleted
    });
    const _fileList = fileList.filter((t) => t.name !== file.name);
    setFileList(_fileList);
  };

  const [productForm, setProductForm] = useState({
    name: "",
    user: userInfo?._id,
    image: null,
    address: "",
    description: "",
    price: "",
    acreage: "",
    bedroom: "",
    toilet: "",
    floor: "",
    countInStock: 1,
  });
  const handleCreate = (e) => {
    e.preventDefault();
    let listImages = [];
    for (let item of fileList) {
      listImages.push(item.name);
    }
    const data = new FormData();
    data.append("name", productForm.name);
    data.append("user", productForm.user);
    data.append("status", status);
    data.append("type", type);
    data.append("description", productForm.description);
    data.append("price", productForm.price);
    data.append("acreage", productForm.acreage);
    data.append("bedroom", productForm.bedroom);
    data.append("toilet", productForm.toilet);
    data.append("floor", productForm.floor);
    data.append("countInStock", productForm.countInStock);
    data.append("legalDocuments", legalDocuments);
    data.append("direction", direction);
    data.append("city", city);
    data.append("district", district);
    data.append("ward", ward);
    data.append("address", address);
    for (let item of listImages) {
      data.append("image", item);
    }
    for (let item of utilities) {
      data.append("utilities", item);
      console.log(item);
    }
    data.append("lat", lat);
    data.append("lng", lng);
    const create = dispatch(postProduct(data));
    create
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          resetForm();
          setTimeout(() => {
            window.location.reload(false);
          }, 5000);
        } else {
          console.log("data", data);
          notification.warning({
            description: data.message,
            placement: "bottomRight",
            duration: 30,
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

  const resetForm = () => {
    setProductForm({
      name: "",
      user: userInfo?._id,
      status: "",
      type: "",
      description: "",
      price: "",
      acreage: "",
      bedroom: "",
      toilet: "",
      countInStock: 1,
    });
    setFileList([]);
    var options = document.querySelectorAll("#my_select option");
    for (var i = 0, l = options.length; i < l; i++) {
      options[i].selected = options[i].defaultSelected;
    }
  };

  const handleChangedInput = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };
  function handleChange(value) {
    setUtilities(value);
  }
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
  const onFinish = (values) => {
    let listImages = [];
    for (let item of fileList) {
      listImages.push(item.name);
    }
    const data = new FormData();
    data.append("name", productForm.name);
    data.append("user", productForm.user);
    data.append("status", status);
    data.append("type", type);
    data.append("description", productForm.description);
    data.append("price", productForm.price);
    data.append("acreage", productForm.acreage);
    data.append("bedroom", productForm.bedroom);
    data.append("toilet", productForm.toilet);
    data.append("floor", productForm.floor);
    data.append("countInStock", productForm.countInStock);
    data.append("legalDocuments", legalDocuments);
    data.append("direction", direction);
    data.append("city", city);
    data.append("district", district);
    data.append("ward", ward);
    data.append("address", address);
    for (let item of listImages) {
      data.append("image", item);
    }
    for (let item of utilities) {
      data.append("utilities", item);
      console.log(item);
    }
    data.append("lat", lat);
    data.append("lng", lng);
    const create = dispatch(postProduct(data));
    create
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          resetForm();
          setTimeout(() => {
            window.location.reload(false);
          }, 5000);
        } else {
          console.log("data", data);
          notification.warning({
            description: data.message,
            placement: "bottomRight",
            duration: 30,
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

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        defaultValue="VNĐ"
        style={{
          width: 100,
        }}
      >
        <Option value="VNĐ">VNĐ</Option>
      </Select>
    </Form.Item>
  );

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 84,
        }}
      >
        <Option value="84">+84</Option>
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
                <h2>1. Thông tin</h2>
                <p>
                  <small>
                    Các trường này là bắt buộc: Tiêu đề, phương tiện thuộc tính
                  </small>
                </p>
                <div className="row">
                  <div className="col-md-12">
                    <h6>Tên Sản Phẩm</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Tên sản phẩm không được bỏ trống",
                          },
                          {
                            whitespace: true,
                            message:
                              "Tên sản phẩm không được nhập khoảng trống",
                          },
                          { min: 25, message: "Tên sản phẩm quá ngắn" },
                          { max: 70, message: "Tên sản phẩm quá dài" },
                        ]}
                        hasFeedback
                      >
                        <Input
                          size="large"
                          type="name"
                          name="name"
                          placeholder="Tên sản phẩm"
                          value={productForm?.name}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                    </div>
                    <h6>Mô Tả Chi Tiết</h6>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <Form.Item
                        name="Mô tả sản phẩm"
                        rules={[
                          {
                            required: true,
                            message: "Mô tả sản phẩm không được bỏ trống",
                          },
                          {
                            whitespace: true,
                            message:
                              "Mô tả sản phẩm không được nhập khoảng trống",
                          },
                          { min: 20, message: "Mô tả sản phẩm quá ngắn" },
                        ]}
                        hasFeedback
                      >
                        <TextArea
                          name="description"
                          showCount
                          maxLength={1000}
                          placeholder="Mô tả sản phẩm"
                          value={productForm?.description}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                <h6>Giá Sản Phẩm</h6>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "Giá sản phẩm không được bỏ trống",
                          },
                          {
                            whitespace: true,
                            message: "Giá sản phẩm không nhập khoảng trống",
                          },
                          {
                            min: 6,
                            message:
                              "Giá sản phẩm phải lớn hơn hoặc bằng 100.000",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          addonAfter={suffixSelector}
                          size="large"
                          type="number"
                          name="price"
                          placeholder="Giá sản phẩm"
                          value={productForm?.price}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <h2>2. Chi Tiết</h2>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Loại Sản Phẩm</h6>
                    <Form.Item
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn loại sản phẩm",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Loại Sản Phẩm"
                        size="large"
                        style={{ width: "100%" }}
                        onChange={handleChangeType}
                      >
                        <Option value="Nhà riêng">Nhà riêng</Option>
                        <Option value="Nhà mặt phố">Nhà mặt phố</Option>
                        <Option value="Biệt thự">Biệt thự</Option>
                        <Option value="Nhà phố thương mại">
                          Nhà phố thương mại
                        </Option>
                        <Option value="Chung cư"> Căn hộ chung cư</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-lg-6">
                    <h6>Trạng Thái Sản Phẩm</h6>
                    <Form.Item
                      name="status"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn trạng thái sản phẩm",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Trạng Thái Sản Phẩm"
                        size="large"
                        style={{ width: "100%" }}
                        onChange={handleChangeStatus}
                      >
                        <Option value="Bán">Bán</Option>
                        <Option value="Cho thuê">Cho thuê</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div
                    className="col-lg-6"
                    style={{ marginTop: "2rem", marginBottom: "2rem" }}
                  >
                    <h6>Giấy Tờ Pháp Lí</h6>
                    <Form.Item
                      name="legalDocuments"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn giấy tờ pháp lý",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Giấy Tờ Pháp Lí"
                        size="large"
                        style={{ width: "100%" }}
                        onChange={handleChangeLegalDocuments}
                      >
                        <Option value="Sổ đỏ">Sổ đỏ</Option>
                        <Option value="Hợp đồng mua bán">
                          Hợp đồng mua bán
                        </Option>
                        <Option value="Đang chờ sổ">Đang chờ sổ</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div
                    className="col-lg-6"
                    style={{ marginTop: "2rem", marginBottom: "2rem" }}
                  >
                    <h6>Hướng</h6>
                    <Form.Item
                      name="direction"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn hướng sản phẩm",
                        },
                      ]}
                    >
                      <Select
                        defaultValue="Hướng"
                        size="large"
                        style={{ width: "100%" }}
                        onChange={handleChangeDiretion}
                      >
                        <Option value="Đông">Đông</Option>
                        <Option value="Tây">Tây</Option>
                        <Option value="Nam">Nam </Option>
                        <Option value="Bắc">Bắc </Option>
                        <Option value="Đông Bắc">Đông Bắc </Option>
                        <Option value="Đông Nam">Đông Nam </Option>
                        <Option value="Tây Nam ">Tây Nam </Option>
                        <Option value="Tây Bắc">Tây Bắc </Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <h6>Số Tầng</h6>

                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="floor"
                        rules={[
                          {
                            required: true,
                            message: "Số tầng không được bỏ trống",
                          },
                          {
                            whitespace: true,
                            message: "Số tầng không được nhập khoảng trống",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="number"
                          size="large"
                          name="floor"
                          placeholder="Số tầng sản phẩm"
                          value={productForm?.floor}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Diện Tích</h6>

                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="acreage"
                        rules={[
                          {
                            required: true,
                            message: "Diện tích không được bỏ trống",
                          },
                          {
                            whitespace: true,
                            message: "Diện tích không được nhập khoảng trống",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="number"
                          size="large"
                          name="acreage"
                          placeholder="Diện tích sản phẩm"
                          value={productForm?.acreage}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Phòng Ngủ</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="bedroom"
                        rules={[
                          {
                            required: true,
                            message: "Phòng ngủ không được bỏ trống",
                          },
                          {
                            whitespace: true,
                            message: "Phòng ngủ không được nhập khoảng trống",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          size="large"
                          type="number"
                          name="bedroom"
                          placeholder="Phòng ngủ"
                          value={productForm?.bedroom}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Nhà Vệ Sinh</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="toilet"
                        rules={[
                          {
                            required: true,
                            message: "Nhà vệ sinh không được bỏ trống",
                          },
                          {
                            whitespace: true,
                            message: "Nhà vệ sinh không được nhập khoảng trống",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          size="large"
                          type="number"
                          name="toilet"
                          placeholder="Nhà vệ sinh"
                          value={productForm?.toilet}
                          onChange={handleChangedInput}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <h6>Tiện Ích</h6>
                    <Form.Item
                      name="utilities"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn tiện ích sản phẩm",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="ví dụ: gần Trường học,..."
                        defaultValue={["Chợ"]}
                        size="large"
                        onChange={handleChange}
                        optionLabelProp="label"
                        id="my_select"
                      >
                        <Option value="Chợ" label=" Chợ" selected="selected">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Chợ
                          </div>
                        </Option>
                        <Option value="Bệnh viện" label=" Bệnh viện">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Bệnh viện
                          </div>
                        </Option>{" "}
                        <Option value="Siêu thị" label="Siêu thị">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Siêu thị
                          </div>
                        </Option>
                        <Option value="Trường học" label="Trường học">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Trường học
                          </div>
                        </Option>
                        <Option value="Công viên" label="Công viên">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Công viên
                          </div>
                        </Option>
                        <Option value="Sân bay" label="Sân bay">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Sân bay
                          </div>
                        </Option>
                        <Option value="Hồ bơi" label="Hồ bơi">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Hồ bơi
                          </div>
                        </Option>
                        <Option value="Phòng gym" label="Phòng gym">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Phòng gym
                          </div>
                        </Option>{" "}
                        <Option value="Ga tàu" label="Ga tàu">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Ga tàu
                          </div>
                        </Option>{" "}
                        <Option value="Bến xe bus" label="Bến xe bus">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Bến xe bus
                          </div>
                        </Option>{" "}
                        <Option value="Bến xe" label="Bến xe">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Bến xe
                          </div>
                        </Option>
                        <Option value="Quán coffee" label="Quán coffee">
                          <div className="demo-option-label-item">
                            <span
                              role="img"
                              aria-label="China"
                              style={{ margin: "0.3rem" }}
                            >
                              gần
                            </span>
                            Quán coffee
                          </div>
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <h2 style={{ marginTop: "2rem" }}>3. Địa Chỉ</h2>
                <h6>Địa chỉ chi tiết</h6>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="input-item">
                      <Form.Item
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn Tỉnh / Thành phố",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Chọn Tỉnh / Thành phố"
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
                            message: "Vui lòng chọn Quận / Huyện",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Chọn Quận / Huyện"
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
                            message: "Vui lòng chọn Phường / Xã",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Chọn Phường / Xã"
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
                    <h6>Địa Chỉ Cụ Thể</h6>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <Form.Item
                        name="Địa chỉ nhà"
                        rules={[
                          {
                            required: true,
                            message: "Địa chỉ nhà không được bỏ trống",
                          },
                          {
                            whitespace: true,
                            message: "Địa chỉ nhà không được nhập khoảng trống",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="address"
                          size="large"
                          name="address"
                          placeholder="Địa chỉ nhà"
                          value={address}
                          onChange={(value) => setAddress(value.target.value)}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h6>Địa Chỉ Nhận Được</h6>
                    <Search
                      type="address"
                      style={{ height: "80px" }}
                      size="large"
                      placeholder="Địa chỉ nhận được"
                      allowClear
                      enterButton="Tìm kiếm"
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
                <h2>4. Hình Ảnh</h2>
                <h6>Danh sách hình ảnh</h6>
                <div className="row">
                  <div className="col-lg-12">
                    <ImgCrop rotate onModalOk={(file) => OnModalOk(file)}>
                      <Upload
                        onRemove={(file) => {
                          onRemoveImage(file);
                        }}
                        listType="picture-card"
                        fileList={fileList}
                        // onChange={onChange}
                        onPreview={handlePreview}
                        status="success"
                      >
                        {fileList.length < 5 && "+ Upload"}
                      </Upload>
                    </ImgCrop>
                    {images.length > 0 && images.map()}
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
                    Gữi Bài
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={previewVisible}
        title="Chi tiết hình ảnh"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}
