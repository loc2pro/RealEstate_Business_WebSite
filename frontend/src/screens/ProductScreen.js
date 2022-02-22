import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import { userProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { Carousel } from "react-responsive-carousel";
import dayjs from "dayjs";
export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addTocartHandler = () => {
    props.history.push(`/cart/${productId}}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varial="danger">{error}</MessageBox>
      ) : (
        <div className="details">
          {/* <div className="row"><Link to="/">Quay về trang chủ</Link></div> */}

          <div className="row" style={{ marginTop: "10rem" }}>
            <div className="row center" style={{ width: "100%" }}>
              <div className="details-slider" style={{ width: "90%" }}>
                <Carousel className="main-slider">
                  <div>
                    <img src={product.product.image} />
                    <p className="legend">Bất Động Sản Phát Lộc</p>
                  </div>
                  <div>
                    <img src={product.product.image} />
                    <p className="legend">Bất Động Sản Phát Lộc</p>
                  </div>
                  <div>
                    <img src={product.product.image} />
                    <p className="legend">Bất Động Sản Phát Lộc</p>
                  </div>
                </Carousel>
              </div>
            </div>
            <div className="row center" style={{ width: "100%" }}>
              <div className="row" style={{ width: "80%" }}>
                <div className="col-6">
                  <div
                    className="row"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <h2 style={{ color: "red", fontSize: "30px" }}>
                      {product.product.name}
                    </h2>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <ul>
                        <li style={{ marginTop: "1rem" }}>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>&#10004;</span> Giá:
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>&#10004;</span> Người đăng:
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>&#10004;</span> Số điện thoại:
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>&#10004;</span> Email liên hệ:
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            <span>&#10004;</span> Ngày đăng:
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
                              {product.product.price.toLocaleString("it-IT", {
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
                            {product.user.name}
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {product.user.phone}
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {product.user.email}
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
                    <ul>
                      <li style={{ marginTop: "1rem" }}>
                        <Rating
                          rating={product.product.rating}
                          numReviews={product.product.numReviews}
                        ></Rating>
                      </li>
                      <li style={{ marginTop: "1rem" }}>
                        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                          <span>&#10004;</span> Mô tả chi tiết: &nbsp;
                          <p>{product.product.description}</p>
                        </span>
                      </li>

                      <div className="row">
                        <div className="col-4">
                          <h3>
                            Diện tích: &nbsp;
                            <i class="fas fa-expand">
                              {product.product.acreage}
                            </i>
                            &nbsp;m<sup>2</sup>
                          </h3>
                        </div>
                        <div className="col-4">
                          <h3>
                            Phòng ngủ: &nbsp;
                            <i class="fas fa-bed">{product.product.bedroom}</i>
                            &nbsp;
                          </h3>
                        </div>
                        <div className="col-4">
                          <h3>
                            Nhà vệ sinh: &nbsp;
                            <i class="fas fa-bath">{product.product.toilet}</i>
                            &nbsp;
                          </h3>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card card-body">
                    <ul>
                      <li>
                        <div className="row">
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
                            >
                              Thêm vào ưa thích
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ marginTop:"2rem" }}
                >
                  <h2 style={{ color: "blue", fontSize: "30px" }}>
                    Vị trí
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
