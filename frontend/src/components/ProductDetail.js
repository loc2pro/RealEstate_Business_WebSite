import dayjs from "dayjs";
import React, { useEffect } from "react";
import urlImages from "../api/url";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function ProductDetail(props) {
  const { product } = props;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const listSeller = useSelector((state) => state.listSeller);
  const { loading: loadingSeller, error: errorSeller, sellers } = listSeller;

  useEffect(() => {
    dispatch(listProducts());
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
                      {product?.product?.status}
                    </Link>
                  </li>
                  <li className="ltn__blog-date">
                    <i className="far fa-calendar-alt" />
                    {dayjs(product?.product?.createdAt).format("DD-MM-YYYY")}
                  </li>
                </ul>
              </div>
              <h1> {product?.product?.name}</h1>
              <label>
                <span className="ltn__secondary-color">
                  <i className="flaticon-pin" />
                </span>{" "}
                {product?.product?.address}, {product?.product?.ward},{" "}
                {product?.product?.district}, {product?.product?.city}
              </label>
              <h4 className="title-2">Mô tả</h4>
              <p>{product?.product?.description}</p>
              <h4 className="title-2">Chi tiết sản phẩm</h4>
              <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                <ul>
                  <li>
                    <label>BDS ID:</label> <span>{product?.product?._id}</span>
                  </li>
                  <li>
                    <label>Diện tích: </label>{" "}
                    <span>{product?.product?.acreage}</span>
                  </li>
                  <li>
                    <label>Phòng ngủ:</label>{" "}
                    <span>{product?.product?.bedroom}</span>
                  </li>
                  <li>
                    <label>WC:</label> <span>{product?.product?.toilet}</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <label> Giấy tờ pháp lí:</label>{" "}
                    <span>{product?.product?.legalDocuments} </span>
                  </li>
                  <li>
                    <label> Người bán:</label>{" "}
                    <span>{product?.product?.user?.name} </span>
                  </li>
                  <li>
                    <label>Loại:</label>{" "}
                    <span>{product?.product?.status} </span>
                  </li>
                  <li>
                    <label>Giá:</label> <span>{product?.product?.price} </span>
                  </li>
                </ul>
              </div>

              <h4 className="title-2 mb-10">Tiện ích</h4>
              <div className="property-details-amenities mb-60">
                <div className="row">
                  {product?.product?.utilities.map((item) => (
                    <div className="col-lg-4 col-md-6">
                      <div className="ltn__menu-widget">
                        <ul>
                          <li>
                            <label className="checkbox-item">
                              {item}
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <h4 className="title-2">Vị trí</h4>
              <div className="property-details-google-map mb-60">
                <iframe
                  src={`https://maps.google.com/maps?q=${product?.product?.lat},${product?.product?.lng}&output=embed`}
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
                    src={`${urlImages}${product?.product?.seller?.seller?.logo}`}
                    alt={product?.product?.seller?.name}
                  />
                  <h5>{product?.product?.seller?.name}</h5>
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
                  <p>Số điện thoại: +84 {product?.product?.seller?.phone}</p>
                  <p>Email: {product?.product?.seller?.email}</p>
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
                  {products?.map((item) => (
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

export default ProductDetail;
