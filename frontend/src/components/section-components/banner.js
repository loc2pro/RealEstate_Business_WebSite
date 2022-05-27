import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import bg from "../../assets/bg.svg";
import imgRight from "../../assets/images/21.jpg";
import imgLeft from "../../assets/images/21left.jpg";

class Banner extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";

    return (
      <div className="ltn__slider-area ltn__slider-3  section-bg-1 go-top">
        <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
          {/* ltn__slide-item */}
          <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3">
            <div className="ltn__slide-item-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 align-self-center">
                    <div className="slide-item-info">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <div className="slide-video mb-50 d-none">
                          <a
                            className="ltn__video-icon-2 ltn__video-icon-2-border"
                            href="https://www.youtube.com/embed/tlThdr3O5Qo"
                            data-rel="lightcase:myCollection"
                          >
                            <i className="fa fa-play" />
                          </a>
                        </div>
                        <h6 className="slide-sub-title white-color--- animated">
                          <span>
                            <i className="fas fa-home" />
                          </span>{" "}
                          Real Estate Phát Lộc
                        </h6>
                        <h1 className="slide-title animated ">
                          Tìm Ngồi Nhà Trong Mơ <br /> Của Bạn
                        </h1>
                        <div className="slide-brief animated">
                          <p>
                            Chúng tôi chuyển đổi chữ tín và niềm tin khách hàng
                            thành sản phẩm chất lượng và dịch vụ thương mại tốt
                            nhất..
                          </p>
                        </div>
                        <div className="btn-wrapper animated ">
                          <Link
                            to="/about"
                            className="theme-btn-1 btn btn-effect-1 go-top"
                          >
                            Liên Hệ
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="slide-item-img">
                      <img src={imgRight} alt="#" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ltn__slide-item */}
          <div className="ltn__slide-item ltn__slide-item-2  ltn__slide-item-3-normal ltn__slide-item-3">
            <div className="ltn__slide-item-inner  text-right text-end">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 align-self-center">
                    <div className="slide-item-info">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <h6 className="slide-sub-title white-color--- animated">
                          <span>
                            <i className="fas fa-home" />
                          </span>{" "}
                          Real Estate Phát Lộc
                        </h6>
                        <h1 className="slide-title animated ">
                          Địa Chỉ <br />
                          Uy Tín
                        </h1>
                        <div className="slide-brief animated">
                          <p>
                            Khách hàng là trung tâm, Chuyên nghiệp và Sáng tạo
                            trong công việc, Thân thiện và luôn luôn hướng đến
                            tương lai. Để thành công và phát triển bền vững.
                          </p>
                        </div>
                        <div className="btn-wrapper animated">
                          <Link
                            to="/service"
                            className="theme-btn-1 btn btn-effect-1"
                          >
                            DỊCH VỤ
                          </Link>
                          <Link
                            to="/about"
                            className="btn btn-transparent btn-effect-3"
                          >
                            LIÊN HỆ
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="slide-item-img slide-img-left">
                      <img src={imgLeft} alt="#" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    );
  }
}

export default Banner;
