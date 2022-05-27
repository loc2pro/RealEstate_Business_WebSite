import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Banner3 from "../../assets/images/banner-3.jpg";
class FaqV1 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div className="ltn__faq-area mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="ltn__faq-inner ltn__faq-inner-2">
                <div id="accordion_2">
                  {/* card */}
                  <div className="card">
                    <h6
                      className="collapsed ltn__card-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-item-2-1"
                      aria-expanded="false"
                    >
                      Làm thế nào để mua một sản phẩm?
                    </h6>
                    <div
                      id="faq-item-2-1"
                      className="collapse"
                      data-bs-parent="#accordion_2"
                    >
                      <div className="card-body">
                        <p>
                          Khách hàng có thể liên hệ nhân viên trong các sản phẩm
                          để xem trực tiếp sản phẩm.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* card */}
                  <div className="card">
                    <h6
                      className="ltn__card-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-item-2-2"
                      aria-expanded="true"
                    >
                      Làm cách nào để tôi có thể liên hệ trang web của bạn?
                    </h6>
                    <div
                      id="faq-item-2-2"
                      className="collapse show"
                      data-bs-parent="#accordion_2"
                    >
                      <div className="card-body">
                        <p>
                          Bạn có thể liên hệ với chúng tôi bằng cách click vào
                          phần liên hệ ở cuối góc bên phải
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* card */}
                  <div className="card">
                    <h6
                      className="collapsed ltn__card-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-item-2-3"
                      aria-expanded="false"
                    >
                      Tôi là một người dùng mới. Tôi nên bắt đầu như thế nào?
                    </h6>
                    <div
                      id="faq-item-2-3"
                      className="collapse"
                      data-bs-parent="#accordion_2"
                    >
                      <div className="card-body">
                        <p>
                          Bên chúng tôi cung cấp 3 dịch vụ chính là mua, cho
                          thuê và bán nhà, đất ...
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* card */}
                  <div className="card">
                    <h6
                      className="collapsed ltn__card-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-item-2-5"
                      aria-expanded="false"
                    >
                      Thông tin chi tiết của tôi có được bảo mật không?
                    </h6>
                    <div
                      id="faq-item-2-5"
                      className="collapse"
                      data-bs-parent="#accordion_2"
                    >
                      <div className="card-body">
                        <p>Mọi thông tin của bạn đều được bảo mật 100%.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="need-support text-center mt-100">
                  <h2>Vẫn cần trợ giúp? Liên hệ với bộ phận hỗ trợ 24/7:</h2>
                  <div className="btn-wrapper mb-30 go-top">
                    <Link to="/contact" className="theme-btn-1 btn">
                      Liên Hệ Chúng Tôi
                    </Link>
                  </div>
                  <h3>
                    <i className="fas fa-phone" /> +84 981074090
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="sidebar-area ltn__right-sidebar">
                {/* Newsletter Widget */}
                <div className="widget ltn__search-widget ltn__newsletter-widget">
                  <h6 className="ltn__widget-sub-title">// Quảng Cáo</h6>
                  <h4 className="ltn__widget-title">Bản Tin</h4>
                  <form action="#">
                    <input type="text" name="search" placeholder="Tìm Kiếm" />
                    <button type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </form>
                  <div className="ltn__newsletter-bg-icon">
                    <i className="fas fa-envelope-open-text" />
                  </div>
                </div>
                {/* Banner Widget */}
                <div className="widget ltn__banner-widget go-top">
                  <Link to="shop.html">
                    <img src={Banner3}/>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FaqV1;
