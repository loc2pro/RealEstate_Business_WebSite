import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

class FeaturesV1 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    let customClass = this.props.customClass ? this.props.customClass : "";

    return (
      <div className={customClass}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2--- text-center">
                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                  Dịch vụ của chúng tôi
                </h6>
                <h1 className="section-title">Dịch vụ chính</h1>
              </div>
            </div>
          </div>
          <div className="row ltn__custom-gutter--- justify-content-center go-top">
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
                <div className="ltn__feature-icon">
                  <img
                    src={publicUrl + "assets/img/icons/icon-img/21.png"}
                    alt="#"
                  />
                </div>
                <div className="ltn__feature-info">
                  <h3>
                    <Link to="/service">Mua nhà</Link>
                  </h3>
                  <Link className="ltn__service-btn" to="/service">
                    Tìm
                    <i className="flaticon-right-arrow" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1 active">
                <div className="ltn__feature-icon">
                  <img
                    src={publicUrl + "assets/img/icons/icon-img/22.png"}
                    alt="#"
                  />
                </div>
                <div className="ltn__feature-info">
                  <h3>
                    <Link to="/service">Thuê nhà</Link>
                  </h3>
                  <Link className="ltn__service-btn" to="/service">
                    Tìm
                    <i className="flaticon-right-arrow" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
                <div className="ltn__feature-icon">
                  <img
                    src={publicUrl + "assets/img/icons/icon-img/23.png"}
                    alt="#"
                  />
                </div>
                <div className="ltn__feature-info">
                  <h3>
                    <Link to="/post">Bán Nhà</Link>
                  </h3>
                  <Link className="ltn__service-btn" to="/post">
                    Tìm
                    <i className="flaticon-right-arrow" />
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

export default FeaturesV1;
