import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/images/4.jpg";
import img from "../assets/images/31.jpg";

function Blog() {
  return (
    <div className="ltn__blog-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ltn__blog-list-wrap">
              {/* Blog Item */}
              <div className="ltn__blog-item ltn__blog-item-5 go-top">
                <div className="ltn__blog-img">
                  <Link to="/blog-details">
                    <img src={img} />
                  </Link>
                </div>
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-category">
                        <Link to="/blog-grid">Business</Link>
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <Link to="/blog-details">
                      CĂN HỘ THE EVERRICH INFINITY MẶT TIỀN AN DƯƠNG VƯƠNG
                    </Link>
                  </h3>
                  <div className="ltn__blog-meta">
                    <ul>
                      <li>
                        <Link to="/blog-details">
                          <i className="far fa-eye" />
                          232 Lượt Xem
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog-details">
                          <i className="far fa-comments" />
                          35 Comments
                        </Link>
                      </li>
                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt" />
                        22-4-2022
                      </li>
                    </ul>
                  </div>
                  <p>
                    Cư dân căn hộ The EverRich Infinity sẽ được tận hưởng những
                    dịch vụ, tiện ích đẳng cấp 5 sao như: hồ bơi hiện đại sky
                    pool, làn đường đi bộ, tập thể dục thể thao, sảnh đón khách
                    sang trọng – nơi mà bạn vừa được nghe nhạc vừa được thư giãn
                    trong khi chờ đợi bạn bè, người thân, nhà hàng, café ngoài
                    trời, gym, vui chơi giải trí, spa thư giãn, siêu thị là một
                    trong những dịch vụ không thể thiếu, BBQ ngoài trời, dịch vụ
                    dọn vệ sinh chung cư, giặt ủi, dịch vụ photocopy, phòng
                    chiếu phim, phòng sáng tạo cho trẻ em… luôn luôn sẵn sàng để
                    phục vụ nhu cầu đa dạng của các chủ nhân thành đạt.
                  </p>
                  <div className="ltn__blog-meta-btn">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-author">
                          <Link to="/blog-grid">
                            <img src={avatar} />
                            Đăng bởi: Nguyễn Hữu Lộc
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="ltn__blog-btn">
                      <Link to="/blog-details">
                        <i className="fas fa-arrow-right" />
                        Đọc thêm
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ltn__blog-list-wrap">
              {/* Blog Item */}
              <div className="ltn__blog-item ltn__blog-item-5 go-top">
                <div className="ltn__blog-img">
                  <Link to="/blog-details">
                    <img src={img} />
                  </Link>
                </div>
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-category">
                        <Link to="/blog-grid">Business</Link>
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <Link to="/blog-details">
                      DỰ ÁN CĂN HỘ CAO CẤP MILLENNIUM BẾN VÂN ĐỒN QUẬN 4
                    </Link>
                  </h3>
                  <div className="ltn__blog-meta">
                    <ul>
                      <li>
                        <Link to="/blog-details">
                          <i className="far fa-eye" />
                          232 Lượt Xem
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog-details">
                          <i className="far fa-comments" />
                          35 Comments
                        </Link>
                      </li>
                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt" />
                        22-4-2022
                      </li>
                    </ul>
                  </div>
                  <p>
                    Dự án căn hộ Millennium sở hữu một tầm nhìn không giới hạn
                    tuyệt đẹp đẹp mà không phải dự án nào cũng có được. Tại đây,
                    bạn có thể ngắm nhìn vẻ đẹp lung linh huyền ảo, sống động
                    của thành phố về đêm, đón chào bình minh tươi sáng với những
                    âm thanh rộn ràng, tấp nập của ngày mới hay thả hồn theo
                    dòng sông Sài Gòn thơ mộng. Dự án căn hộ Millennium sở hữu
                    những tiện ích đẳng cấp: Đầy đủ các dịch vụ, tiện ích,
                    thương mại, Hồ bơi đạt chuẩn quốc tế . Dịch vụ quản lý và
                    vận hành đẳng cấp quốc tế, bao gồm: 1. Hồ nước cảnh quan. 2.
                    Sân vườn nội bộ. 3. Gym. 4. Hồ bơi.
                  </p>
                  <div className="ltn__blog-meta-btn">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-author">
                          <Link to="/blog-grid">
                            <img src={avatar} />
                            Đăng bởi: Nguyễn Hữu Lộc
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="ltn__blog-btn">
                      <Link to="/blog-details">
                        <i className="fas fa-arrow-right" />
                        Đọc thêm
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ltn__blog-list-wrap">
              {/* Blog Item */}
              <div className="ltn__blog-item ltn__blog-item-5 go-top">
                <div className="ltn__blog-img">
                  <Link to="/blog-details">
                    <img src={img} />
                  </Link>
                </div>
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-category">
                        <Link to="/blog-grid">Business</Link>
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <Link to="/blog-details">
                      DỰ ÁN ĐẤT NỀN RIO BONITO QUẬN 9 – GIÁ CHỈ TỪ 1.6 TỶ
                    </Link>
                  </h3>
                  <div className="ltn__blog-meta">
                    <ul>
                      <li>
                        <Link to="/blog-details">
                          <i className="far fa-eye" />
                          232 Lượt Xem
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog-details">
                          <i className="far fa-comments" />
                          35 Comments
                        </Link>
                      </li>
                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt" />
                        22-4-2022
                      </li>
                    </ul>
                  </div>
                  <p>
                    Thiết kế Phòng khách dự án Rio Bonito cực kỳ sang trọng,
                    xứng tầm đẳng cấp của chủ nhân. Đây là khoảng không gian rất
                    được chú trọng, nơi tụ họp gia đình sau 1 ngày làm việc rất
                    vả. Thật tuyệt vời khi gia đình bạn cùng nhau trò chuyện,
                    cùng xem một chương trình truyền hình, giúp cho những người
                    thân trong gia đình gần gũi và gắn kết với nhau hơn.
                  </p>
                  <div className="ltn__blog-meta-btn">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-author">
                          <Link to="/blog-grid">
                            <img src={avatar} />
                            Đăng bởi: Nguyễn Hữu Lộc
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="ltn__blog-btn">
                      <Link to="/blog-details">
                        <i className="fas fa-arrow-right" />
                        Đọc thêm
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* sidebar  */}
          <div className="col-lg-4 go-top">
            <aside className="sidebar-area blog-sidebar ltn__right-sidebar">
              {/* Author Widget */}
              <div className="widget ltn__author-widget">
                <div className="ltn__author-widget-inner text-center">
                  <img src={avatar} />
                  <h5>Nguyễn Hữu Lộc</h5>
                  <small>Admin</small>
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
                          <i className="fas fa-star-half-alt" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="far fa-star" />
                        </a>
                      </li>
                      <li className="review-total">
                        {" "}
                        <a href="#"> ( 1 Reviews )</a>
                      </li>
                    </ul>
                  </div>
                  <p>Quản lí điều hành BĐS Phát Lộc</p>
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

              {/* Form Widget */}
              <div className="widget ltn__form-widget">
                <h4 className="ltn__widget-title ltn__widget-title-border-2">
                  Liên Hệ
                </h4>
                <form action="#">
                  <input type="text" name="yourname" placeholder="Tên*" />
                  <input type="text" name="youremail" placeholder="Emai*" />
                  <textarea
                    name="yourmessage"
                    placeholder="Lời Nhắn..."
                    defaultValue={""}
                  />
                  <button type="submit" className="btn theme-btn-1">
                    Gữi
                  </button>
                </form>
              </div>

              {/* Social Media Widget */}
              <div className="widget ltn__social-media-widget">
                <h4 className="ltn__widget-title ltn__widget-title-border-2">
                  Thông tin liên hệ
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
                  Tags
                </h4>
                <ul>
                  <li>
                    <Link to="/blog-grid">Popular</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">desgin</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">ux</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">usability</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">develop</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">icon</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">Car</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">Service</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">Repairs</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">Auto Parts</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">Oil</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">Dealer</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">Oil Change</Link>
                  </li>
                  <li>
                    <Link to="/blog-grid">Body Color</Link>
                  </li>
                </ul>
              </div>
              {/* Banner Widget */}
              <div className="widget ltn__banner-widget d-none go-top">
                <Link to="/shop">
                  <img src={"assets/img/banner/2.jpg"} alt="#" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
