import React, { Component } from "react";
import { Link } from "react-router-dom";
import Social from "../section-components/social";
import Copyright from "./copyright";
import Finalfooter from "./Finalfooter";

class Footer_v1 extends Component {
  componentDidMount() {
    const $ = window.$;

    let publicUrl = process.env.PUBLIC_URL + "/";
    const minscript = document.createElement("script");
    minscript.async = true;
    minscript.src = publicUrl + "assets/js/main.js";

    document.body.appendChild(minscript);

    $(".go-top")
      .find("a")
      .on("click", function () {
        $(".quarter-overlay").fadeIn(1);

        $(window).scrollTop(0);

        setTimeout(function () {
          $(".quarter-overlay").fadeOut(300);
        }, 800);
      });

    $(document).on("click", ".theme-btn-1 ", function () {
      $("div").removeClass("modal-backdrop");
      $("div").removeClass("show");
      $("div").removeClass("fade");
      $("body").attr("style", "");
    });
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgattr = "Footer logo";

    return (
      <footer className="ltn__footer-area  ">
        <div className="footer-top-area  section-bg-2 plr--5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-about-widget">
                  <div className="footer-logo">
                    <div className="site-logo">
                      <img
                        src={publicUrl + "assets/img/logo-2.png"}
                        alt="Logo"
                      />
                    </div>
                  </div>
                  <p>Bất động sản Phát Lộc.</p>
                  <div className="footer-address">
                    <ul>
                      <li>
                        <div className="footer-address-icon">
                          <i className="icon-placeholder" />
                        </div>
                        <div className="footer-address-info">
                          <p>10 Dương Quảng Hàm, Phường 5, Gò Vấp, TP.HCM</p>
                        </div>
                      </li>
                      <li>
                        <div className="footer-address-icon">
                          <i className="icon-call" />
                        </div>
                        <div className="footer-address-info">
                          <p>
                            <a href="tel:+0123-456789">+84981074090</a>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="footer-address-icon">
                          <i className="icon-mail" />
                        </div>
                        <div className="footer-address-info">
                          <p>
                            <a href="mailto:example@example.com">
                              Phatloc@gmail.com
                            </a>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="ltn__social-media mt-20">
                    <Social />
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Công ty</h4>
                  <div className="footer-menu go-top">
                    <ul>
                      <li>
                        <Link to="/contact">Thông tin</Link>
                      </li>
                      <li>
                        <Link to="/blog">Blog</Link>
                      </li>
                      <li>
                        <Link to="/service">Tất cả sản phẩm</Link>
                      </li>
                      <li>
                        <Link to="/contact">Liên hệ</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQ</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Dịch vụ</h4>
                  <div className="footer-menu go-top">
                    <ul>
                      <li>
                        <Link to="/cart">Ưa thích</Link>
                      </li>
                      <li>
                        <Link to="/login">Đăng nhập</Link>
                      </li>
                      <li>
                        <Link to="/about">Điều khoản &amp; Điều kiện</Link>
                      </li>
                      <li>
                        <Link to="/contact">Quảng cáo</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Chăm sóc khách hàng</h4>
                  <div className="footer-menu go-top">
                    <ul>
                      <li>
                        <Link to="/login">Đăng nhập</Link>
                      </li>
                      <li>
                        <Link to="/login">Tài khoản</Link>
                      </li>
                      <li>
                        <Link to="login">Gữi tin</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link to="/contact">Liên hệ</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-12 col-12">
                <div className="footer-widget footer-newsletter-widget">
                  <h4 className="footer-title">Bản tin</h4>
                  <p>
                    Đăng ký tin hàng tuần của chúng tôi và nhận thông tin cập
                    nhật qua email.
                  </p>
                  <div className="footer-newsletter">
                    <form action="#">
                      <input type="email" name="email" placeholder="Email*" />
                      <div className="btn-wrapper">
                        <button className="theme-btn-1 btn" type="submit">
                          <i className="fas fa-location-arrow" />
                        </button>
                      </div>
                    </form>
                  </div>
                  <h5 className="mt-30">Chúng tôi chấp nhận</h5>
                  <img
                    src={publicUrl + "assets/img/icons/payment-4.png"}
                    alt="Payment Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Finalfooter />
      </footer>
    );
  }
}

export default Footer_v1;
