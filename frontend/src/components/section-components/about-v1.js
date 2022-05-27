import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import about from "../../assets/images/about.png";

class AboutV1 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div className="ltn__about-us-area pt-120 pb-90 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <img src={about} alt="About Us Image" />
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-20">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                    Về chúng tôi
                  </h6>
                  <h1 className="section-title">
                    Thị trường Bất động sản Cho thuê Hàng đầu.<span>.</span>
                  </h1>
                  <p>
                    Hơn 39.000 người làm việc cho chúng tôi tại hơn 70 quốc gia
                    trên khắp phạm vi phủ sóng toàn cầu này, kết hợp với các
                    dịch vụ chuyên gia
                  </p>
                </div>
                <ul className="ltn__list-item-half clearfix">
                  <li>
                    <i className="flaticon-home-2" />
                    Thiết Kế Smart Home
                  </li>
                  <li>
                    <i className="flaticon-mountain" />
                    Cảnh đẹp xung quanh
                  </li>
                  <li>
                    <i className="flaticon-heart" />
                    Phong cách sống vượt trội
                  </li>
                  <li>
                    <i className="flaticon-secure" />
                    An ninh 24/7
                  </li>
                </ul>
                <div className="ltn__callout bg-overlay-theme-05  mt-30">
                  <p>"Thông tin liên hệ: Phatloc@gmail.com"</p>
                </div>
                <div className="btn-wrapper animated go-top">
                  <Link to="/contact" className="theme-btn-1 btn btn-effect-1">
                    LIÊN HỆ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutV1;
