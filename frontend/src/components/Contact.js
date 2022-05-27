import React from "react";

function Contact() {
  return (
    <div className="ltn__contact-address-area mb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <img src={"assets/img/icons/10.png"} alt="Icon Image" />
              </div>
              <h3>Địa Chỉ Email</h3>
              <p>
                Locdev2000@gmail.com <br />
                Phatbui12@gmail.com
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <img src={"assets/img/icons/11.png"} alt="Icon Image" />
              </div>
              <h3>Số Điện Thoại Liên Hệ</h3>
              <p>
                +84 981074090 <br /> +987-6543210
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <img src={"assets/img/icons/12.png"} alt="Icon Image" />
              </div>
              <h3>Địa chỉ</h3>
              <p>
                10 Dương Quảng Hàm, Phường 5 <br />
                Gò Vấp, HCM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
