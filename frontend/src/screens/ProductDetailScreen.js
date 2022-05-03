import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { detailsProduct } from "../actions/productActions";
import urlImages from "../api/url";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Col, Image, Modal, Row } from "antd";
import ChatBox from "../components/ChatBox";
export default function ProductDetailScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
    console.log(productId);
  }, [dispatch, productId]);
  const addTocartHandler = () => {
    props.history.push(`/cart/${productId}`);
  };

  return (
    <div style={{ background: "#f7f7f7" }}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varial="danger">{error}</MessageBox>
      ) : (
        <>
          <h1
            class="heading"
            style={{ marginBottom: "0.1rem", paddingTop: "20px" }}
          >
            <span>Thông tin</span> chi tiết
          </h1>
          <div className="details">
            <div className="row">
              <div
                className="row center"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <div
                  className="col-8"
                  style={{
                    borderRadius: "10px",
                    background: "white",
                    marginRight: "10px",
                  }}
                >
                  <div className="details-slider" style={{ width: "90%" }}>
                    <Carousel className="main-slider">
                      {product?.product.image.map((item) => (
                        <div className="img-slider">
                          <img
                            style={{ width: "80%" }}
                            src={`${urlImages}${item}`}
                          />
                          <p className="legend">Bất Động Sản Phát Lộc</p>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
                <div
                  className="col-4 "
                  style={{
                    paddingLeft: "2rem",
                    borderRadius: "10px",
                    background: "white",
                    minHeight: "870px",
                  }}
                >
                  <div
                    className="row"
                    style={{ borderBottom: "1px solid #eee" }}
                  >
                    <h3 class="title_sticky" id="jumpto_0">
                      Tên sản phẩm:
                    </h3>
                    <div className="row">
                      <h2
                        style={{
                          color: "red",
                          fontSize: "30px",
                        }}
                      >
                        {product.product.name}
                      </h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="row">
                      <h3 class="title_sticky" id="jumpto_0">
                        Thông tin sản phẩm
                      </h3>
                    </div>
                    <div className="col-6">
                      <ul>
                        <li style={{ marginTop: "1rem" }}>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>
                              <i
                                class="fa fa-circle"
                                style={{
                                  color: "#2196F3",
                                  fontSize: "9px",
                                  marginRight: "1rem",
                                }}
                              ></i>
                            </span>
                            Giá sản phẩm:
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>
                              <i
                                class="fa fa-circle"
                                style={{
                                  color: "#2196F3",
                                  fontSize: "9px",
                                  marginRight: "1rem",
                                }}
                              ></i>
                            </span>
                            Người đăng:
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>
                              <i
                                class="fa fa-circle"
                                style={{
                                  color: "#2196F3",
                                  fontSize: "9px",
                                  marginRight: "1rem",
                                }}
                              ></i>
                            </span>
                            Giấy tờ pháp lí:
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>
                              <i
                                class="fa fa-circle"
                                style={{
                                  color: "#2196F3",
                                  fontSize: "9px",
                                  marginRight: "1rem",
                                }}
                              ></i>
                            </span>
                            Ngày đăng:
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul>
                        <li style={{ marginTop: "1rem" }}>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span style={{ color: "red" }}>
                              {product?.product.price.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {product?.product.user.name}
                          </span>
                        </li>

                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {product.product.legalDocuments}
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {dayjs(product.product.createdAt).format(
                              "DD-MM-YYYY"
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="row"
                      style={{ borderTop: "1px solid #eee" }}
                    >
                      <h3 class="title_sticky" id="jumpto_0">
                        Chi tiết
                      </h3>
                    </div>
                    <div className="col-4">
                      <h4>
                        <i class="fas fa-expand"></i> &nbsp; Diện tích:{" "}
                        {product.product.acreage} &nbsp;m
                        <sup>2</sup>
                      </h4>
                    </div>
                    <div className="col-4">
                      <h4>
                        <i class="fas fa-bed"></i> &nbsp; Phòng ngủ:{" "}
                        {product.product.bedroom}
                      </h4>
                    </div>
                    <div className="col-4">
                      <h4>
                        <i class="fas fa-bath"></i> &nbsp; Nhà vệ sinh:{" "}
                        {product.product.toilet}
                        &nbsp;
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <ul style={{ width: "100%" }}>
                      <li style={{ marginTop: "1rem" }}>
                        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                          <div
                            className="row"
                            style={{ borderTop: "1px solid #eee" }}
                          >
                            <h3 class="title_sticky" id="jumpto_0">
                              Tiện ích
                            </h3>
                          </div>
                          {product.product.utilities.map((item) => (
                            <span class="list_vndes">
                              <i
                                class="fa fa-check"
                                style={{ color: "#4CAF50", fontSize: "11px" }}
                              ></i>{" "}
                              {item}
                            </span>
                          ))}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="card card-body">
                    <ul>
                      <li>
                        <div
                          className="row"
                          style={{ background: "#e5f9e7", width: "100%" }}
                        >
                          <div>
                            <h1>Giá:</h1>
                          </div>
                          <div style={{ color: "red" }}>
                            {product.product.status === "Bán" ? (
                              <div className="price">
                                {product.product.price.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                            ) : (
                              <div className="price">
                                {product.product.price.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                                / Tháng
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div>
                            <h1>Tình Trạng:</h1>
                          </div>
                          <div>
                            {product.product.countInStock > 0 ? (
                              <span className="success ">
                                {product.product.status}
                              </span>
                            ) : (
                              <span className="danger">
                                {product.product.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                      {product.product.countInStock > 0 && (
                        <>
                          <li>
                            <button
                              onClick={addTocartHandler}
                              className="primary block"
                              style={{ marginBottom: "2rem" }}
                            >
                              Lưu tin
                            </button>
                            <button
                              onClick={showModal}
                              className="primary block"
                            >
                              Liên Hệ
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ height: "900px" }}>
              <div className="row center" style={{ width: "100%" }}>
                <div style={{ width: "90%" }}>
                  <div className="row">
                    <ul style={{ width: "100%" }}>
                      <li style={{ marginTop: "1rem" }}>
                        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                          <div
                            className="row"
                            style={{ borderTop: "1px solid #eee" }}
                          >
                            <h3 class="title_sticky" id="jumpto_0">
                              Mô tả chi tiết
                            </h3>
                          </div>
                          <p>{product.product.description}</p>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="row"
                    style={{ marginTop: "2rem", borderTop: "1px solid #eee" }}
                  >
                    <h3 class="title_sticky" id="jumpto_0">
                      Vị trí
                    </h3>
                  </div>
                  <div
                    className="row"
                    style={{ width: "100%", marginBottom: "200px" }}
                  >
                    <div className="row center" style={{ width: "100%" }}>
                      <iframe
                        title="ggmap"
                        src={`https://maps.google.com/maps?q=${product.product.lat},${product.product.lng}&output=embed`}
                        className="ggmap"
                        height="600"
                        width="100%"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          </div>
        </>
      )}
      {product?.product?.seller ? (
        <Modal
          title="Thông tin liên hệ"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="row">
            <div className="col-5"> Tên: </div>
            <div className="col-7"> {product?.product.seller.name} </div>
          </div>
          <div className="row">
            <div className="col-5"> Email: </div>
            <div className="col-7"> {product?.product.seller.email} </div>
          </div>
          <div className="row">
            <div className="col-5"> Số điện thoai: </div>
            <div className="col-7"> +84{product?.product.seller.phone} </div>
          </div>
        </Modal>
      ) : (
        <Modal
          title="Thông tin liên hệ"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          Chưa có thông tin liên hệ !!!
        </Modal>
      )}
    </div>
  );
}
