import { UserOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Upload,
  message,
  Space,
} from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";
import AWS from "aws-sdk";
import axios from "axios";
import FormData from "form-data";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const props = {
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
        ContentType: file.type,
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

  const [productForm, setProductForm] = useState({
    name: "",
    user: userInfo?._id,
    image: null,
    status: "",
    type: "",
    address: "",
    description: "",
    price: "",
    acreage: "",
    bedroom: "",
    toilet: "",
    countInStock: 1,
    legalDocuments: "",
  });
  const handleCreate = (e) => {
    console.log(productForm.address, "address");
    e.preventDefault();
    let listImages = [];
    for (let item of fileList) {
      listImages.push(item.originFileObj.name);
    }
    const data = new FormData();
    data.append("name", productForm.name);
    data.append("user", productForm.user);
    data.append("status", productForm.status);
    data.append("type", productForm.type);
    data.append("description", productForm.description);
    data.append("price", productForm.price);
    data.append("acreage", productForm.acreage);
    data.append("bedroom", productForm.bedroom);
    data.append("toilet", productForm.toilet);
    data.append("countInStock", productForm.countInStock);
    data.append("legalDocuments", productForm.legalDocuments);
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
    console.log(e);
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };
  function handleChange(value) {
    setUtilities(value);
  }

  return (
    <>
      <Row>
        <Form enctype="multipart/form-data" style={{ width: "100%" }}>
          <h1 style={{ textAlign: "center", fontSize: "30px", color: "red" }}>
            <a> Nhà ở/ Chung cư</a>
          </h1>
          <div class="contentform">
            <h3
              class="title_sticky"
              style={{ fontWeight: "bold", fontSize: "30px", color: "red" }}
            >
              Thông tin sản phẩm
            </h3>
            <div class="leftcontact">
              <div class="form-group">
                <h3 class="title_sticky">Tên sản phẩm:</h3>
                <Form
                  name="basic"
                  wrapperCol={{ span: 35 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Tên sản phẩm không được bỏ trống",
                      },
                    ]}
                  >
                    <Input
                      maxLength={60}
                      onChange={handleChangedInput}
                      value={productForm.name}
                      name="name"
                      size="large"
                      placeholder="Tên sản phẩm"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                </Form>
              </div>

              <div class="form-group">
                <h3 class="title_sticky">Loại sản phẩm:</h3>
                <select
                  name="type"
                  onChange={handleChangedInput}
                  id="my_select"
                >
                  <option selected="selected" value="0">
                    --- Lựa chọn ---
                  </option>
                  <option value="Nhà riêng">Nhà riêng</option>
                  <option value="Nhà mặt phố">Nhà mặt phố</option>
                  <option value="Biệt thự">Biệt thự</option>
                  <option value="Nhà phố thương mại">Nhà phố thương mại</option>
                  <option value="Chung cư"> Căn hộ chung cư</option>
                </select>
                <div class="validation"></div>
              </div>

              <div class="form-group">
                <h3 class="title_sticky">Trạng thái sản phẩm:</h3>
                <select
                  name="status"
                  onChange={handleChangedInput}
                  id="my_select"
                >
                  <option selected="selected" value="0">
                    --- Lựa chọn ---
                  </option>
                  <option value="Bán">Bán</option>
                  <option value="Cho thuê">Cho thuê</option>
                </select>
                <div class="validation"></div>
              </div>
              <div class="form-group">
                <h3 class="title_sticky">Giấy tờ pháp lí:</h3>
                <select
                  name="legalDocuments"
                  onChange={handleChangedInput}
                  id="my_select"
                >
                  <option selected="selected" value="0">
                    --- Lựa chọn ---
                  </option>
                  <option value="Sổ đỏ">Sổ đỏ</option>
                  <option value="Hợp đồng mua bán">Hợp đồng mua bán</option>
                  <option value="Đang chờ sổ">Đang chờ sổ</option>
                </select>
                <div class="validation"></div>
              </div>

              <div class="form-group">
                <h3 class="title_sticky">Giá: (VNĐ)</h3>
                <Form>
                  <Input
                    onChange={handleChangedInput}
                    type="number"
                    name="price"
                    value={productForm.price}
                    size="large"
                    placeholder="Giá sản phẩm"
                    prefix={<i class="fas fa-hand-holding-usd"></i>}
                    style={{ width: "100%" }}
                  />
                  {/* <NumberFormat
                      customInput={Input}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      onChange={handleChangedInput}
                      name="price"
                      value={productForm.price}
                      // prefix={<i class="fas fa-hand-holding-usd"></i>}
                    /> */}
                </Form>
              </div>
              <div class="form-group">
                <h3 class="title_sticky">
                  Diện tích (m<sup>2</sup>)
                </h3>

                <Form>
                  <Input
                    onChange={handleChangedInput}
                    type="number"
                    name="acreage"
                    value={productForm.acreage}
                    size="large"
                    placeholder="Diện tích"
                    prefix={<i class="far fa-square"></i>}
                    style={{ width: "100%" }}
                  />
                </Form>
              </div>
            </div>
            <div class="rightcontact">
              <div class="form-group">
                <h3 class="title_sticky">Phòng ngủ</h3>
                <Form>
                  <Input
                    onChange={handleChangedInput}
                    type="number"
                    name="bedroom"
                    value={productForm.bedroom}
                    size="large"
                    placeholder="Phòng ngủ"
                    prefix={<i class="fas fa-bed"></i>}
                    style={{ width: "100%" }}
                  />
                </Form>
              </div>
              <div class="form-group">
                <h3 class="title_sticky">Phòng vệ sinh</h3>
                <Form>
                  <Input
                    onChange={handleChangedInput}
                    type="number"
                    name="toilet"
                    value={productForm.toilet}
                    size="large"
                    placeholder="Phòng vệ sinh"
                    prefix={<i class="fas fa-toilet"></i>}
                    style={{ width: "100%" }}
                  />
                </Form>
              </div>
              <div className="form-group">
                <h3 class="title_sticky">Tiện ích</h3>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="ví dụ: gần Trường học,..."
                  defaultValue={["Chợ"]}
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
              </div>
              <div class="form-group">
                <h3 class="title_sticky">Địa chỉ</h3>
                <Row style={{width:"100%"}}>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Chọn tỉnh/ Thành phố"
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
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
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Chọn quận/ huyện"
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
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

                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Chọn phường/ xã"
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
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
                  <Input
                    style={{ marginTop: "20px" }}
                    placeholder="Nhập địa chỉ nhà"
                    value={address}
                    onChange={(value) => setAddress(value.target.value)}
                  />
                  <Search
                    style={{ marginTop: "20px" }}
                    placeholder="Địa chỉ nhận được"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    value={`${address ? address + " ," : ""}${
                      ward ? ward + " ," : ""
                    }${district ? district + " ," : ""}${city}`}
                    onSearch={onSearch}
                  />
                </Row>
              </div>

              {/* <div class="form-group">
                <h3 class="title_sticky">Địa chỉ</h3>
                <Form
                  name="basic"
                  wrapperCol={{ span: 35 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Địa chỉ không được bỏ trống",
                      },
                    ]}
                  >
                    <Input
                      onChange={handleChangedInput}
                      value={productForm.address}
                      name="address"
                      size="large"
                      placeholder="Ví dụ: 4, Đường Dương Quảng Hàm, Phường 5, Quận Gò Vấp"
                      prefix={<i class="fas fa-audio-description"></i>}
                    />
                  </Form.Item>
                </Form>
              </div> */}
              <div class="form-group">
                <h3 class="title_sticky">Mô tả chi tiết</h3>
                <Form
                  name="basic"
                  wrapperCol={{ span: 35 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Chi tiết sản phẩm không được bỏ trống",
                      },
                    ]}
                  >
                    <TextArea
                      style={{ height: "141px" }}
                      showCount
                      maxLength={1000}
                      onChange={handleChangedInput}
                      value={productForm.description}
                      name="description"
                      size="large"
                      placeholder="Mô tả chi tiết sản phẩm"
                      prefix={<i class="fas fa-audio-description"></i>}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="imagecontact">
              <div class="form-group">
                <h3 class="title_sticky">Danh sách hình ảnh</h3>
                <ImgCrop rotate>
                  <Upload
                    {...props}
                    onRemove={(file) => {
                      onRemoveImage(file);
                      return { ...props };
                    }}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={handlePreview}
                    status="success"
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
                </ImgCrop>
                {images.length > 0 && images.map()}
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ width: "100%", borderTop: "1px solid #eee" }}
          >
            <h3
              class="title_sticky"
              style={{ fontWeight: "bold", fontSize: "30px", color: "red" }}
            >
              Vị trí sản phẩm
            </h3>
            <div className="row center" style={{ width: "100%" }}>
              <iframe
                title="ggmap"
                src={`https://maps.google.com/maps?q=${lat},${lng}&output=embed`}
                className="ggmap"
                height="600"
                width="100%"
              ></iframe>
            </div>
          </div>
          <div className="row center">
            <button
              style={{ width: "50%", fontWeight: "bold", fontSize: "30px" }}
              onClick={handleCreate}
              class="bouton-contact"
            >
              Gữi Bài
            </button>
          </div>
        </Form>
      </Row>
      <Modal
        visible={previewVisible}
        title="Chi tiết hình ảnh"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}
