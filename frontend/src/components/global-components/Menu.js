import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userActions";
import {
  addGroundToCart,
  addToCart,
  removeFromCart,
} from "../../actions/cartActions";
import { Link, Router, useHistory } from "react-router-dom";
import urlImages from "../../api/url";
import imgBaner from "../../assets/images/menu-banner-1.jpg";

import Social from "../section-components/social";

function Menu(props) {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const history = useHistory();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [visible, setVisible] = useState(false);

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const groundCategoryList = useSelector((state) => state.groundCategoryList);
  const {
    loading: loadingGroundCategories,
    error: errorGroundCategories,
    categories: groundCategories,
  } = groundCategoryList;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
    history.push("/signin");
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div>
      <header className="ltn__header-area ltn__header-5 ltn__header-transparent--- gradient-color-4---">
        <div className="ltn__header-top-area section-bg-6 top-area-color-white---">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="ltn__top-bar-menu">
                  <ul>
                    <li>
                      <a href="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you">
                        <i className="icon-mail" /> Phatloc@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="locations.html">
                        <i className="icon-placeholder" /> 10 Dương Quảng Hàm,
                        Phường 5, Gò Vấp, TP.HCM
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="top-bar-right text-end">
                  <div className="ltn__top-bar-menu">
                    <ul>
                      <li>
                        <Social />
                      </li>
                      <li>
                        {/* header-top-btn */}
                        <div className="header-top-btn">
                          <Link to="/add-listing">Liên Hệ</Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-white">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="site-logo-wrap">
                  <div className="site-logo go-top">
                    <Link to="/">
                      <img src={publicUrl + "assets/img/logo.png"} alt="Logo" />
                    </Link>
                  </div>
                  <div className="get-support clearfix d-none">
                    <div className="get-support-icon">
                      <i className="icon-call" />
                    </div>
                    <div className="get-support-info">
                      <h6>Get Support</h6>
                      <h4>
                        <a href="tel:+84981074090">0981074090</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col header-menu-column">
                <div className="header-menu d-none d-xl-block">
                  <nav>
                    <div className="ltn__main-menu go-top">
                      <ul>
                        <li className="menu-icon">
                          <Link to="/service">Nhà Đất Bán</Link>
                          <ul>
                            <li>
                              <Link to="/search/type/Chung%20c%C6%B0/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Bán Căn Hộ Chung Cư
                              </Link>
                            </li>
                            <li>
                              <Link to="/search/type/Nhà%20riêng/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Bán Nhà Riêng
                              </Link>
                            </li>
                            <li>
                              <Link to="/search/type/Biệt%20thự/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Bán Biệt Thự
                              </Link>
                            </li>
                            <li>
                              <Link to="/search/type/Nhà%20mặt%20phố/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Bán Nhà Mặt Phố
                              </Link>
                            </li>
                            <li>
                              <Link to="/search/type/Nhà%20phố%20thương%20mại/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Bán Nhà Phố Thương Mại
                              </Link>
                            </li>
                            <li>
                              <Link to="/searchground/type/%C4%90%E1%BA%A5t%20d%E1%BB%B1%20%C3%A1n/status/Bán/name/all/min/0/max/0/order/newest/pageNumber/1">
                                Bán Đất Dự Án
                              </Link>
                            </li>
                            <li>
                              <Link to="/searchground/type/Đất%20nông%20nghiệp/status/Bán/name/all/min/0/max/0/order/newest/pageNumber/1">
                                Bán Đất Nông Nghiệp
                              </Link>
                            </li>
                            <li>
                              <Link to="/searchground/type/%C4%90%E1%BA%A5t%20th%E1%BB%95%20c%C6%B0/status/Bán/name/all/min/0/max/0/order/newest/pageNumber/1">
                                Bán Đất Thổ Cư
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-icon">
                          <Link to="/service">Nhà Đất Cho Thuê</Link>
                          <ul>
                            <li>
                              <Link to="/search/type/Chung%20c%C6%B0/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Cho Thuê Căn Hộ Chung Cư
                              </Link>
                            </li>
                            <li>
                              <Link to="/search/type/Nhà%20riêng/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Cho Thuê Nhà Riêng
                              </Link>
                            </li>
                            <li>
                              <Link to="/search/type/Biệt%20thự/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Cho Thuê Biệt Thự
                              </Link>
                            </li>
                            <li>
                              <Link to="/search/type/Nhà%20mặt%20phố/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Cho Thuê Nhà Mặt Phố
                              </Link>
                            </li>
                            <li>
                              <Link to="/search/type/Nhà%20phố%20thương%20mại/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                                Cho Thuê Nhà Phố Thương Mại
                              </Link>
                            </li>
                            <li>
                              <Link to="/searchground/type/%C4%90%E1%BA%A5t%20d%E1%BB%B1%20%C3%A1n/status/Cho%20thuê/name/all/min/0/max/0/order/newest/pageNumber/1">
                                Cho Thuê Đất Dự Án
                              </Link>
                            </li>
                            <li>
                              <Link to="/searchground/type/Đất%20nông%20nghiệp/status/Cho%20thuê/name/all/min/0/max/0/order/newest/pageNumber/1">
                                Cho Thuê Đất Nông Nghiệp
                              </Link>
                            </li>
                            <li>
                              <Link to="/searchground/type/%C4%90%E1%BA%A5t%20th%E1%BB%95%20c%C6%B0/status/Cho%20thuê/name/all/min/0/max/0/order/newest/pageNumber/1">
                                Cho Thuê Đất Thổ Cư
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/post">Đăng Tin</Link>
                        </li>
                        <li className="menu-icon">
                          <Link to="/blog">Tin Tức</Link>
                        </li>
                        <li>
                          <Link to="/contact">Liên Hệ</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="col ltn__header-options ltn__header-options-2 mb-sm-20">
                {/* header-search-1 */}
                <div className="header-search-wrap">
                  <div className="header-search-1">
                    <div className="search-icon">
                      <i className="icon-search for-search-show" />
                      <i className="icon-cancel  for-search-close" />
                    </div>
                  </div>
                  <div className="header-search-1-form">
                    <form id="#" method="get" action="#">
                      <input
                        type="text"
                        name="search"
                        placeholder="Nhập ở đây..."
                      />
                      <button type="submit">
                        <span>
                          <i className="icon-search" />
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
                {/* user-menu */}
                {userInfo ? (
                  <div className="ltn__drop-menu user-menu">
                    <ul>
                      <li>
                        <Link to="#">
                          <i className="fa-solid fa-user-check"></i>
                        </Link>
                        <ul className="go-top">
                          <li>
                            <Link to="/profile">Tài khoản</Link>
                          </li>
                          <li>
                            <Link to="/post"> Bán nhà đất</Link>
                          </li>
                          <li>
                            <Link to="/login" onClick={signoutHandler}>
                              Đăng Xuất
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="ltn__drop-menu user-menu">
                    <ul>
                      <li>
                        <Link to="#">
                          <i className="icon-user" />
                        </Link>
                        <ul className="go-top">
                          <li>
                            <Link to="/login">Đăng Nhập</Link>
                          </li>
                          <li>
                            <Link to="/register">Đăng Kí</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                )}

                {/* mini-cart */}
                <div className="mini-cart-icon">
                  <a
                    href="#ltn__utilize-cart-menu"
                    className="ltn__utilize-toggle"
                  >
                    <i className="fa-solid fa-heart"></i>
                    {cartItems.length > 0 && <sup>{cartItems.length}</sup>}
                  </a>
                </div>
                {/* mini-cart */}
                {/* Mobile Menu Button */}
                <div className="mobile-menu-toggle d-xl-none">
                  <a
                    href="#ltn__utilize-mobile-menu"
                    className="ltn__utilize-toggle"
                  >
                    <svg viewBox="0 0 800 600">
                      <path
                        d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                        id="top"
                      />
                      <path d="M300,320 L540,320" id="middle" />
                      <path
                        d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                        id="bottom"
                        transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        id="ltn__utilize-mobile-menu"
        className="ltn__utilize ltn__utilize-mobile-menu"
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-head">
            <div className="site-logo">
              <Link to="/">
                <img src={publicUrl + "assets/img/logo.png"} alt="Logo" />
              </Link>
            </div>
            <button className="ltn__utilize-close">×</button>
          </div>
          <div className="ltn__utilize-menu-search-form">
            <form action={"#"}>
              <input type="text" placeholder="Search..." />
              <button>
                <i className="fas fa-search" />
              </button>
            </form>
          </div>
          <div className="ltn__utilize-menu">
            <ul>
              <li>
                <Link to="/">Trag Chủ</Link>
              </li>
              <li>
                <Link to="/service">Nhà Đất Bán</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/search/type/Chung%20c%C6%B0/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Bán Căn Hộ Chung Cư
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/type/Nhà%20riêng/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Bán Nhà Riêng
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/type/Biệt%20thự/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Bán Biệt Thự
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/type/Nhà%20mặt%20phố/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Bán Nhà Mặt Phố
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/type/Nhà%20phố%20thương%20mại/status/Bán/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Bán Nhà Phố Thương Mại
                    </Link>
                  </li>
                  <li>
                    <Link to="/searchground/type/%C4%90%E1%BA%A5t%20d%E1%BB%B1%20%C3%A1n/status/Bán/name/all/min/0/max/0/order/newest/pageNumber/1">
                      Bán Đất Dự Án
                    </Link>
                  </li>
                  <li>
                    <Link to="/searchground/type/Đất%20nông%20nghiệp/status/Bán/name/all/min/0/max/0/order/newest/pageNumber/1">
                      Bán Đất Nông Nghiệp
                    </Link>
                  </li>
                  <li>
                    <Link to="/searchground/type/%C4%90%E1%BA%A5t%20th%E1%BB%95%20c%C6%B0/status/Bán/name/all/min/0/max/0/order/newest/pageNumber/1">
                      Bán Đất Thổ Cư
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/service">Nhà Đất Cho Thuê</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/search/type/Chung%20c%C6%B0/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Cho Thuê Căn Hộ Chung Cư
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/type/Nhà%20riêng/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Cho Thuê Nhà Riêng
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/type/Biệt%20thự/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Cho Thuê Biệt Thự
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/type/Nhà%20mặt%20phố/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Cho Thuê Nhà Mặt Phố
                    </Link>
                  </li>
                  <li>
                    <Link to="/search/type/Nhà%20phố%20thương%20mại/status/Cho%20thuê/name/all/direction/all/min/0/max/0/order/newest/pageNumber/1">
                      Cho Thuê Nhà Phố Thương Mại
                    </Link>
                  </li>
                  <li>
                    <Link to="/searchground/type/%C4%90%E1%BA%A5t%20d%E1%BB%B1%20%C3%A1n/status/Cho%20thuê/name/all/min/0/max/0/order/newest/pageNumber/1">
                      Cho Thuê Đất Dự Án
                    </Link>
                  </li>
                  <li>
                    <Link to="/searchground/type/Đất%20nông%20nghiệp/status/Cho%20thuê/name/all/min/0/max/0/order/newest/pageNumber/1">
                      Cho Thuê Đất Nông Nghiệp
                    </Link>
                  </li>
                  <li>
                    <Link to="/searchground/type/%C4%90%E1%BA%A5t%20th%E1%BB%95%20c%C6%B0/status/Cho%20thuê/name/all/min/0/max/0/order/newest/pageNumber/1">
                      Cho Thuê Đất Thổ Cư
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/blog">Tin Tức</Link>
              </li>
              <li>
                <Link to="/contact">Liên Hệ</Link>
              </li>
            </ul>
          </div>
          <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
            <ul>
              {userInfo ? (
                <Link to="/profile" title="My Account">
                  <span className="utilize-btn-icon">
                    <i className="fa-solid fa-user-check"></i>
                  </span>
                  Tài Khoản
                </Link>
              ) : (
                <Link to="/profile" title="My Account">
                  <span className="utilize-btn-icon">
                    <i className="far fa-user" />
                  </span>
                  Đăng Nhập
                </Link>
              )}
              <li></li>
              <li>
                <Link to="/cart" title="Shoping Cart">
                  <span className="utilize-btn-icon">
                    <i className="fa-solid fa-heart"></i>
                    {cartItems.length > 0 && <sup>{cartItems.length}</sup>}
                  </span>
                  Ưa Thích
                </Link>
              </li>
            </ul>
          </div>
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
      </div>

      {/* Utilize Cart Menu Start */}
      <div
        id="ltn__utilize-cart-menu"
        className="ltn__utilize ltn__utilize-cart-menu"
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-head">
            <span className="ltn__utilize-menu-title">Ưa thích</span>
            <button className="ltn__utilize-close">×</button>
          </div>
          <div className="mini-cart-product-area ltn__scrollbar">
            {cartItems.map((item) => (
              <div className="mini-cart-item clearfix">
                <div className="mini-cart-img go-top">
                  <Link to="/product-details">
                    <img src={`${urlImages}${item.image[0]}`} alt="Image" />
                  </Link>
                  <span
                    className="mini-cart-item-delete"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className="icon-cancel" />
                  </span>
                </div>
                <div className="mini-cart-info go-top">
                  <h6>
                    <Link to="/product-details">{item.name}</Link>
                  </h6>
                  <span className="mini-cart-quantity">
                    {item.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mini-cart-footer">
            <div className="btn-wrapper go-top ">
              <Link to="/cart" className="theme-btn-1 btn btn-effect-1">
                Xem Ưa Thích
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Utilize Cart Menu End */}
    </div>
  );
}

export default Menu;
