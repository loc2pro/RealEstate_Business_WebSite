import React from "react";

export default function Footer() {
  return (
    <div>
      <section class="footer">
        <div class="footer-container">
          <div class="box-container">
            <div class="box">
              <h3>Chi Nhánh Địa Phương</h3>
              <a href="#">Hà Nội</a>
              <a href="#">Hồ Chí Minh</a>
              <a href="#">Đà Nẵnh</a>
              <a href="#">Huế</a>
              <a href="#">Cần Thơ</a>
            </div>

            <div class="box">
              <h3>Đường Dẫn Nhanh</h3>
              <a href="#">Trang Chủ</a>
              <a href="#">Dịch vụ</a>
              <a href="#">Chung Cư</a>
              <a href="#">Nhà Ở</a>
              <a href="#">Đất Nền</a>
              <a href="#">Liên Hệ</a>
            </div>

            <div class="box">
              <h3>Liên Kết Phụ</h3>
              <a href="#">Tài Khoản</a>
              <a href="#">Sở Thích</a>
              <a href="#">...</a>
            </div>

            <div class="box">
              <h3>Theo Dõi Chúng Tôi</h3>
              <a href="facebook.com/locdev2000">facebook</a>
              <a href="#">twitter</a>
              <a href="#">instagram</a>
              <a href="#">linkedin</a>
            </div>
          </div>

          <div class="credit">
            created by <span>  PhatLoc </span> | all rights reserved
          </div>
        </div>
      </section>
    </div>
  );
}
