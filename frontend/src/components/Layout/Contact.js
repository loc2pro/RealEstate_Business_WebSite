import React from "react";

export default function Contact() {
  return (
    <div>
      <section class="contact" id="contact">
        <h1 class="heading">
          <span>Thông Tin</span> Liên Hệ
        </h1>

        <div class="icons-container">
          <div class="icons">
            <img src="images/icon-1.png" alt="" />
            <h3>Số Điện Thoại</h3>
            <p>+0981074090</p>
            <p>+0999999999</p>
          </div>

          <div class="icons">
            <img src="images/icon-2.png" alt="" />
            <h3>Địa Chỉ Email</h3>
            <p>Locdev2000@gmail.com</p>
            <p>Phatgngu@gmail.com</p>
          </div>

          <div class="icons">
            <img src="images/icon-3.png" alt="" />
            <h3>Địa Chỉ Văn Phòng</h3>
            <p>12 Nguyễn Văn Bảo, Phường 5, Quận Gò Vấp, TP.HCM</p>
          </div>
        </div>

        <div class="row">
          <form action="">
            <div class="inputBox">
              <input type="text" placeholder="name" />
              <input type="number" placeholder="number" />
            </div>
            <div class="inputBox">
              <input type="email" placeholder="email" />
              <input type="text" placeholder="subject" />
            </div>
            <textarea
              name=""
              placeholder="message"
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <input type="submit" value="send message" class="btn" />
          </form>
          <iframe
            class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8564388348705!2d106.6852621151535!3d10.822296492290423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1643982588784!5m2!1svi!2s"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
