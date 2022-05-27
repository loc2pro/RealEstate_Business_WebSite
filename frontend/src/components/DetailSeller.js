import React from "react";
import { Link } from "react-router-dom";
import urlImages from "../api/url";
import Menu from "./global-components/Menu";
import Page_header from "./global-components/page-header";

function DetailSeller(props) {
  const { seller } = props;
  console.log(seller, "tád");
  return (
    <div className="ltn__team-details-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="ltn__team-details-member-info text-center mb-40">
              <div className="team-details-img">
                <img
                  src={`${urlImages}${seller?.seller?.logo}`}
                  alt={seller?.name}
                />
              </div>
              <h2>{seller?.name}</h2>
              <h6 className="text-uppercase ltn__secondary-color">
                Nhân Viên Bất Động Sản
              </h6>
              <div className="ltn__social-media-3">
                <ul>
                  <li>
                    <a href="facebook.com" title="Facebook">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="Twitter.com" title="Twitter">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="Linkedin.com" title="Linkedin">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="ltn__team-details-member-info-details">
              <h2>THÔNG TIN CHI TIẾT</h2>
              <div className="row">
                <div className="col-lg-6">
                  <div className="ltn__team-details-member-about">
                    <ul>
                      <li>
                        <strong>Vị trí:</strong> Nhân viên
                      </li>
                      <li>
                        <strong>Kinh nghiệm:</strong> 10+ Năm
                      </li>
                      <li>
                        <strong>Địa chỉ:</strong> {seller?.address}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="ltn__team-details-member-about">
                    <ul>
                      <li>
                        <strong>Email:</strong> {seller?.email}
                      </li>
                      <li>
                        <strong>Phone:</strong> +84 {seller?.phone}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              <p>
                Phát Lộc mang đến những gói giải pháp đầu tư và phát triển cho
                các sản phẩm bất động sản một cách chuyên nghiệp, tận tâm; mang
                lại lợi ích cao nhất cho nhà đầu tư. Cung cấp nhiều chọn lựa đa
                dạng, phù hợp cho bất cứ ai có nhu cầu tìm kiếm một “tổ ấm” đầy
                đủ tiện ích nội ngoại khu, một môi trường an toàn, tự nhiên với
                các giá trị phát triển bền vững. Thông qua mỗi dự án được phát
                triển, Phát Lộc muốn đem lại cho cộng đồng một cuộc sống ngày
                càng nâng cao chất lượng, hoàn thiện và tốt đẹp hơn bằng uy tín
                của mình.
              </p>
              <div className="row ltn__custom-gutter mt-50 mb-20">
                <div className="col-xl-4 col-sm-6 col-12 go-top">
                  <div className="ltn__feature-item ltn__feature-item-6 text-center">
                    <div className="ltn__feature-icon">
                      <span>
                        <i className="icon-tire" />
                      </span>
                    </div>
                    <div className="ltn__feature-info">
                      <h4>
                        <Link to="/service">Mua Nhà</Link>
                      </h4>
                      <Link className="ltn__service-btn" to="/service-details">
                        Thêm <i className="flaticon-right-arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-6 text-center active">
                    <div className="ltn__feature-icon">
                      <span>
                        <i className="icon-mechanic" />
                      </span>
                    </div>
                    <div className="ltn__feature-info go-top">
                      <h4>
                        <Link to="/team">Bán Nhà</Link>
                      </h4>

                      <Link className="ltn__service-btn" to="/service-details">
                        Thêm <i className="flaticon-right-arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-6 text-center">
                    <div className="ltn__feature-icon">
                      <span>
                        <i className="icon-wheel-1" />
                      </span>
                    </div>
                    <div className="ltn__feature-info go-top">
                      <h4>
                        <Link to="/service-details">Dịch vụ</Link>
                      </h4>
                      <Link className="ltn__service-btn" to="/service-details">
                        Thêm <i className="flaticon-right-arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSeller;
