import React from "react";
import s1 from "../../assets/s-1.svg";
import s2 from "../../assets/s-2.svg";
import s3 from "../../assets/s-3.svg";

export default function Service() {
  return (
    <div>
      <section class="services" id="services">
        <h1 class="heading">
          Dịch Vụ <span>Của Chúng Tôi</span>
        </h1>

        <div class="box-container">
          <div class="box">
            <img src={s1} />
            <h3>Mua Nhà</h3>
            <p>
              Bạn đang cần mua nhà, hãy tìm đến ngay với Lộc Phát. Dịch vụ bất
              động sản uy tín.
            </p>
            <a href="/service" class="btn">
              Xem Thêm
            </a>
          </div>

          <div class="box">
            <img src={s2} />
            <h3>Thuê Nhà</h3>
            <p>
              Bạn đang cần thuê nhà, chung cư. Bất động sản Lộc Phát là một sự
              lựa chọn.
            </p>
            <a href="/service" class="btn">
              Xem Thêm
            </a>
          </div>

          <div class="box">
            <img src={s3} />
            <h3>Bán Nhà</h3>
            <p>
              Bạn có thể đăng tin bất kì sản phẩm trên trang web của chúng tôi.
            </p>
            <a href="/post" class="btn">
              Đăng Tin
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
