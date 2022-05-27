import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

class Testimonial extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";

    return (
      <div
        className="ltn__testimonial-area section-bg-1--- bg-image-top pt-115 pb-70"
        data-bs-bg={publicUrl + "assets/img/bg/20.jpg"}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2--- text-center">
                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                  Lời chứng thực của chúng tôi
                </h6>
                <h1 className="section-title">Phản hồi của khách hàng</h1>
              </div>
            </div>
          </div>
          <div className="row ltn__testimonial-slider-5-active slick-arrow-1">
            <div className="col-lg-4">
              <div className="ltn__testimonial-item ltn__testimonial-item-7">
                <div className="ltn__testimoni-info">
                  <p>
                    <i className="flaticon-left-quote-1" />
                    Phát Lộc mang đến những gói giải pháp đầu tư và phát triển
                    cho các sản phẩm bất động sản một cách chuyên nghiệp, tận
                    tâm; mang lại lợi ích cao nhất cho nhà đầu tư. Cung cấp
                    nhiều chọn lựa đa dạng, phù hợp cho bất cứ ai có nhu cầu tìm
                    kiếm một “tổ ấm” đầy đủ tiện ích nội ngoại khu, một môi
                    trường an toàn, tự nhiên với các giá trị phát triển bền
                    vững. Thông qua mỗi dự án được phát triển.
                  </p>
                  <div className="ltn__testimoni-info-inner">
                    <div className="ltn__testimoni-name-designation">
                      <h5>Phát Bùi</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__testimonial-item ltn__testimonial-item-7">
                <div className="ltn__testimoni-info">
                  <p>
                    <i className="flaticon-left-quote-1" />
                    Bất động sản là niềm đam mê của chúng tôi đầu tư và phát
                    triển cho các sản phẩm bất động sản một cách chuyên nghiệp,
                    tận tâm; mang lại lợi ích cao nhất cho nhà đầu tư. Và trên
                    tất cả chúng tôi là chuyên gia trong lĩnh vực mà chúng tôi
                    hoạt động với nhiều giải pháp cung cấp nhiều chọn lựa đa
                    dạng. Phát Lộc muốn đem lại cho cộng đồng một cuộc sống ngày
                    càng nâng cao chất lượng.
                  </p>
                  <div className="ltn__testimoni-info-inner">
                    <div className="ltn__testimoni-name-designation">
                      <h5>Phát Bùi</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__testimonial-item ltn__testimonial-item-7">
                <div className="ltn__testimoni-info">
                  <p>
                    <i className="flaticon-left-quote-1" />
                    Dịch vụ tư vấn và thiết kế phong thủy nhà ở, văn phòng. Nhằm
                    mang lại kiến thức thực tiễn đến cho mọi người tin vào phong
                    thuỷ. Giúp bạn có một cuộc sống tốt đẹp hơn từ sự bố trí
                    khoa học khi áp dụng phong thuỷ. Xóa bỏ mọi RÀO CẢN , bức
                    phá THÀNH CÔNG, Mọi việc sẽ thuận lợi, công danh, sự nghiệp
                    tiền tài và hạnh phúc viên mãn sẽ nhanh chóng đến với
                    bạn.Hoàn thiện và tốt đẹp hơn bằng uy tín của mình
                  </p>
                  <div className="ltn__testimoni-info-inner">
                    <div className="ltn__testimoni-name-designation">
                      <h5>Phát Bùi</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      </div>
    );
  }
}

export default Testimonial;
