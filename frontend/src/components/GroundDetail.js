import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { detailsGround, listGrounds } from "../actions/groundActions";
import urlImages from "../api/url";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function GroundDetail(props) {
  const { ground } = props;
  const dispatch = useDispatch();

  const groundList = useSelector((state) => state.groundList);
  const { grounds } = groundList;
  const listSeller = useSelector((state) => state.listSeller);
  const { loading: loadingSeller, error: errorSeller, sellers } = listSeller;

  useEffect(() => {
    dispatch(listGrounds());
  }, [dispatch]);

  return (
    <div className="ltn__shop-details-area pb-10">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
              <div className="ltn__blog-meta">
                <ul>
                  <li className="ltn__blog-category">
                    <Link className="bg-orange" to="#">
                      {ground?.ground?.status}
                    </Link>
                  </li>
                  <li className="ltn__blog-date">
                    <i className="far fa-calendar-alt" />
                    {dayjs(ground?.ground?.createdAt).format("DD-MM-YYYY")}
                  </li>
                </ul>
              </div>
              <h1> {ground?.ground?.name}</h1>
              <label>
                <span className="ltn__secondary-color">
                  <i className="flaticon-pin" />
                </span>{" "}
                {ground?.ground?.address}, {ground?.ground?.ward},{" "}
                {ground?.ground?.district}, {ground?.ground?.city}
              </label>
              <h4 className="title-2">Mô tả</h4>
              <p>{ground?.ground?.description}</p>
              <h4 className="title-2">Chi tiết sản phẩm</h4>
              <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                <ul>
                  <li>
                    <label>BDS ID:</label> <span>{ground?.ground?._id}</span>
                  </li>
                  <li>
                    <label>Diện tích: </label>{" "}
                    <span>{ground?.ground?.acreage}</span>
                  </li>{" "}
                  <li>
                    <label> Giấy tờ pháp lí:</label>{" "}
                    <span>{ground?.ground?.legalDocuments} </span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <label> Người bán:</label>{" "}
                    <span>{ground?.ground?.user?.name} </span>
                  </li>
                  <li>
                    <label>Loại:</label> <span>{ground?.ground?.status} </span>
                  </li>
                  <li>
                    <label>Giá:</label> <span>{ground?.ground?.price} </span>
                  </li>
                </ul>
              </div>

              <h4 className="title-2">Vị trí</h4>
              <div className="property-details-google-map mb-60">
                <iframe
                  src={`https://maps.google.com/maps?q=${ground?.ground?.lat},${ground?.ground?.lng}&output=embed`}
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
          <div className="col-lg-4">
            <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
              {/* Author Widget */}
              <div className="widget ltn__author-widget">
                <div className="ltn__author-widget-inner text-center">
                  <img
                    src={`${urlImages}${ground?.ground?.seller?.seller?.logo}`}
                    alt={ground?.ground?.seller?.name}
                  />
                  <h5>{ground?.ground?.seller?.name}</h5>
                  <small>Nhân viên bất động sản</small>
                  <div className="product-ratting">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li className="review-total">
                        {" "}
                        <a href="#"> ( 10 Đánh Giá )</a>
                      </li>
                    </ul>
                  </div>
                  <p>Số điện thoại: +84 {ground?.ground?.seller?.phone}</p>
                  <p>Email: {ground?.ground?.seller?.email}</p>
                  <div className="ltn__social-media">
                    <ul>
                      <li>
                        <a href="#" title="Facebook">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Twitter">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Linkedin">
                          <i className="fab fa-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Youtube">
                          <i className="fab fa-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Social Media Widget */}
              <div className="widget ltn__social-media-widget">
                <h4 className="ltn__widget-title ltn__widget-title-border-2">
                  Theo Dõi Chúng Tôi
                </h4>
                <div className="ltn__social-media-2">
                  <ul>
                    <li>
                      <a href="#" title="Facebook">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Twitter">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Linkedin">
                        <i className="fab fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Instagram">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Tagcloud Widget */}
              <div className="widget ltn__tagcloud-widget go-top">
                <h4 className="ltn__widget-title ltn__widget-title-border-2">
                  Tags Phổ Biến
                </h4>
                <ul>
                  {grounds?.map((item) => (
                    <li>
                      <Link to="/services">{item.type}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div>
//       {loading ? (
//         <LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox varial="danger">{error}</MessageBox>
//       ) : (
//         <div className="details">
//           {/* <div className="row"><Link to="/">Quay về trang chủ</Link></div> */}

//           <div className="row" style={{ marginTop: "10rem" }}>
//             <div className="row center" style={{ width: "100%" }}>
//               <div className="details-slider" style={{ width: "90%" }}>
//                 <Carousel className="main-slider">
//                   {ground?.ground.image.map((item) => (
//                     <div>
//                       <img src={`${urlImages}${item}`} />
//                       <p className="legend">Bất Động Sản Phát Lộc</p>
//                     </div>
//                   ))}
//                 </Carousel>
//               </div>
//             </div>
//             <div className="row center" style={{ width: "100%" }}>
//               <div style={{ width: "90%" }}>
//                 <div className="col-8">
//                   <div
//                     className="row"
//                     style={{ borderBottom: "1px solid #eee" }}
//                   >
//                     <h3 class="title_sticky" id="jumpto_0">
//                       Tên sản phẩm:
//                     </h3>
//                     <div className="row">
//                       <h2
//                         style={{
//                           color: "red",
//                           fontSize: "30px",
//                         }}
//                       >
//                         {ground.ground.name}
//                       </h2>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="row">
//                       <h3 class="title_sticky" id="jumpto_0">
//                         Thông tin sản phẩm
//                       </h3>
//                     </div>
//                     <div className="col-6">
//                       <ul>
//                         <li style={{ marginTop: "1rem" }}>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             <span>
//                               <i
//                                 class="fa fa-circle"
//                                 style={{
//                                   color: "#2196F3",
//                                   fontSize: "9px",
//                                   marginRight: "1rem",
//                                 }}
//                               ></i>
//                             </span>
//                             Giá sản phẩm:
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             <span>
//                               <i
//                                 class="fa fa-circle"
//                                 style={{
//                                   color: "#2196F3",
//                                   fontSize: "9px",
//                                   marginRight: "1rem",
//                                 }}
//                               ></i>
//                             </span>
//                             Người đăng:
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             <span>
//                               <i
//                                 class="fa fa-circle"
//                                 style={{
//                                   color: "#2196F3",
//                                   fontSize: "9px",
//                                   marginRight: "1rem",
//                                 }}
//                               ></i>
//                             </span>
//                             Số điện thoại:
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             <span>
//                               <i
//                                 class="fa fa-circle"
//                                 style={{
//                                   color: "#2196F3",
//                                   fontSize: "9px",
//                                   marginRight: "1rem",
//                                 }}
//                               ></i>
//                             </span>
//                             Email liên hệ:
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             <span>
//                               <i
//                                 class="fa fa-circle"
//                                 style={{
//                                   color: "#2196F3",
//                                   fontSize: "9px",
//                                   marginRight: "1rem",
//                                 }}
//                               ></i>
//                             </span>
//                             Giấy tờ pháp lí:
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             <span>
//                               <i
//                                 class="fa fa-circle"
//                                 style={{
//                                   color: "#2196F3",
//                                   fontSize: "9px",
//                                   marginRight: "1rem",
//                                 }}
//                               ></i>
//                             </span>
//                             Ngày đăng:
//                           </span>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="col-6">
//                       <ul>
//                         <li style={{ marginTop: "1rem" }}>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             <span style={{ color: "red" }}>
//                               {ground.ground.price.toLocaleString("it-IT", {
//                                 style: "currency",
//                                 currency: "VND",
//                               })}
//                             </span>
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             {ground.user.name}
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             {ground.user.phone}
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             {ground.user.email}
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             {ground.ground.legalDocuments}
//                           </span>
//                         </li>
//                         <li>
//                           <span
//                             style={{ fontSize: "15px", fontWeight: "bold" }}
//                           >
//                             {dayjs(ground.ground.createdAt).format(
//                               "DD-MM-YYYY"
//                             )}
//                           </span>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <ul style={{ width: "100%" }}>
//                       <li style={{ marginTop: "1rem" }}>
//                         <span style={{ fontSize: "15px", fontWeight: "bold" }}>
//                           <div
//                             className="row"
//                             style={{ borderTop: "1px solid #eee" }}
//                           >
//                             <h3 class="title_sticky" id="jumpto_0">
//                               Mô tả chi tiết
//                             </h3>
//                           </div>
//                           <p>{ground.ground.description}</p>
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="col-4">
//                   <div className="card card-body">
//                     <ul>
//                       <li>
//                         <div className="row">
//                           <div>
//                             <h1>Giá:</h1>
//                           </div>
//                           <div style={{ color: "red" }}>
//                             {ground.ground.status === "Bán" ? (
//                               <div className="price">
//                                 {ground.ground.price.toLocaleString("it-IT", {
//                                   style: "currency",
//                                   currency: "VND",
//                                 })}
//                               </div>
//                             ) : (
//                               <div className="price">
//                                 {ground.ground.price.toLocaleString("it-IT", {
//                                   style: "currency",
//                                   currency: "VND",
//                                 })}
//                                 / Tháng
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </li>
//                       <li>
//                         <div className="row">
//                           <div>
//                             <h1>Tình Trạng:</h1>
//                           </div>
//                           <div>
//                             {ground.ground.countInStock > 0 ? (
//                               <span className="success ">
//                                 {ground.ground.status}
//                               </span>
//                             ) : (
//                               <span className="danger">
//                                 {ground.ground.status}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </li>

//                       <li>
//                         <button
//                           onClick={addTocartHandler}
//                           className="primary block"
//                         >
//                           Thêm vào ưa thích
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div
//                   className="row"
//                   style={{ marginTop: "2rem", borderTop: "1px solid #eee" }}
//                 >
//                   <h3 class="title_sticky" id="jumpto_0">
//                     Vị trí
//                   </h3>
//                 </div>
//                 <div className="row" style={{ width: "100%" }}>
//                   <div className="row center" style={{ width: "100%" }}>
//                     <iframe
//                       title="ggmap"
//                       src={`https://maps.google.com/maps?q=${ground.ground.lat},${ground.ground.lng}&output=embed`}
//                       className="ggmap"
//                       height="600"
//                       width="100%"
//                     ></iframe>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
