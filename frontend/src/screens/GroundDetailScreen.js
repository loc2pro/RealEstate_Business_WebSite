import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { detailsGround } from "../actions/groundActions";
import urlImages from "../api/url";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function GroundDetailScreen(props) {
  const dispatch = useDispatch();
  const groundId = props.match.params.id;
  const groundDetails = useSelector((state) => state.groundDetails);
  const { loading, error, ground } = groundDetails;

  useEffect(() => {
    dispatch(detailsGround(groundId));
  }, [dispatch, groundId]);
  const addTocartHandler = () => {
    props.history.push(`/cart/${groundId}`);
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
                  {ground?.ground.image.map((item) => (
                    <div>
                      <img src={`${urlImages}${item}`} />
                      <p className="legend">Bất Động Sản Phát Lộc</p>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="row center" style={{ width: "100%" }}>
              <div style={{ width: "90%" }}>
                <div className="col-8">
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
                        {ground.ground.name}
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
                            Số điện thoại:
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
                            Email liên hệ:
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
                              {ground.ground.price.toLocaleString("it-IT", {
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
                            {ground.user.name}
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {ground.user.phone}
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {ground.user.email}
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {ground.ground.legalDocuments}
                          </span>
                        </li>
                        <li>
                          <span
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            {dayjs(ground.ground.createdAt).format(
                              "DD-MM-YYYY"
                            )}
                          </span>
                        </li>
                      </ul>
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
                              Mô tả chi tiết
                            </h3>
                          </div>
                          <p>{ground.ground.description}</p>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card card-body">
                    <ul>
                      <li>
                        <div className="row">
                          <div>
                            <h1>Giá:</h1>
                          </div>
                          <div style={{ color: "red" }}>
                            {ground.ground.status === "Bán" ? (
                              <div className="price">
                                {ground.ground.price.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                            ) : (
                              <div className="price">
                                {ground.ground.price.toLocaleString("it-IT", {
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
                            {ground.ground.countInStock > 0 ? (
                              <span className="success ">
                                {ground.ground.status}
                              </span>
                            ) : (
                              <span className="danger">
                                {ground.ground.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          onClick={addTocartHandler}
                          className="primary block"
                        >
                          Thêm vào ưa thích
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ marginTop: "2rem", borderTop: "1px solid #eee" }}
                >
                  <h3 class="title_sticky" id="jumpto_0">
                    Vị trí
                  </h3>
                </div>
                <div className="row" style={{ width: "100%" }}>
                  <div className="row center" style={{ width: "100%" }}>
                    <iframe
                      title="ggmap"
                      src={`https://maps.google.com/maps?q=${ground.ground.lat},${ground.ground.lng}&output=embed`}
                      className="ggmap"
                      height="600"
                      width="100%"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
