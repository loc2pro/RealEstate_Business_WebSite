import { notification, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";
import AWS from "aws-sdk";
import axios from "axios";
import FormData from "form-data";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postGround } from "../actions/groundActions";

export default function PostGround() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [lat, setLat] = useState(10.8230989);
  const [lng, setLng] = useState(106.6296638);

  const [fileList, setFileList] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    success: false,
    message: "",
  });
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 6000);
    }
  }, [toast]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const props = {
    customRequest({ file, onError, onProgress, onSuccess }) {
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
  });
  const handleCreate = (e) => {
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
    data.append("address", productForm.address);
    data.append("description", productForm.description);
    data.append("price", productForm.price);
    data.append("acreage", productForm.acreage);
    for (let item of listImages) {
      data.append("image", item);
    }
    data.append("lat", lat);
    data.append("lng", lng);
    console.log("data", productForm);
    console.log("image", listImages);
    const createe = dispatch(postGround(data));
    createe
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
      image: null,
      status: "",
      type: "",
      address: "",
      description: "",
      price: "",
      acreage: "",
    });
    setFileList([]);
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

  return (
    <div>
      <div className="row" style={{ width: "100%" }}>
        <div className="row center" style={{ width: "100%" }}>
          <form enctype="multipart/form-data" style={{ width: "80%" }}>
            <h1 style={{ textAlign: "center", fontSize: "30px", color: "red" }}>
              <span> Đăng Bài </span>
            </h1>

            <div class="contentform">
              <div class="leftcontact">
                <div class="form-group">
                  <p>Tên Tài Sản</p>
                  <span class="icon-case">
                    <i class="fas fa-home"></i>
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={productForm.name}
                    onChange={handleChangedInput}
                    data-rule="required"
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>Loại</p>
                  <span class="icon-case">
                    <i class="fas fa-align-center"></i>
                  </span>
                  <select
                    name="type"
                    onChange={handleChangedInput}
                    style={{
                      width: "94%",
                      float: "right",
                      marginTop: "5px",
                      textAlign: "center",
                    }}
                  >
                    <option value="0">--- Lựa chọn ---</option>
                    <option value="Đất dự án">Đất dự án</option>
                    <option value="Đất thổ cư">Đất thổ cư</option>
                    <option value="Đất nông nghiệp">Đất nông nghiệp</option>
                  </select>
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>Trạng Thái</p>
                  <span class="icon-case">
                    <i class="fas fa-exclamation"></i>
                  </span>
                  <select
                    name="status"
                    onChange={handleChangedInput}
                    style={{
                      width: "94%",
                      float: "right",
                      marginTop: "5px",
                      textAlign: "center",
                    }}
                  >
                    <option value="0">--- Lựa chọn ---</option>
                    <option value="Bán">Bán</option>
                    <option value="Cho thuê">Cho thuê</option>
                  </select>
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>Giá (VND)</p>
                  <span class="icon-case">
                    <i class="fas fa-hand-holding-usd"></i>
                  </span>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={productForm.price}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>
              </div>

              <div class="rightcontact">
                <div class="form-group">
                  <p>
                    Diện tích (m<sup>2</sup>)
                  </p>
                  <span class="icon-case">
                    <i class="far fa-square"></i>
                  </span>
                  <input
                    type="number"
                    name="acreage"
                    id="acreage"
                    value={productForm.acreage}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <p>Mô tả chi tiết</p>
                  <span class="icon-case">
                    <i class="fas fa-audio-description"></i>
                  </span>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={productForm.description}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>Địa chỉ</p>
                  <span class="icon-case">
                    <i class="fas fa-map-pin"></i>
                  </span>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={productForm.address}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <p>Danh sách hình ảnh</p>
                  <ImgCrop>
                    <Upload
                      {...props}
                      onRemove={(file) => {
                        onRemoveImage(file);
                        return { ...props };
                      }}
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                  <div class="validation"></div>
                </div>
              </div>
            </div>
            <div className="row" style={{ width: "100%" }}>
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
            <button onClick={handleCreate} class="bouton-contact">
              Đăng Bài
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
