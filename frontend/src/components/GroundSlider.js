import React from "react";
import urlImages from "../api/url";
import parse from "html-react-parser";
import { Carousel, Image } from "antd";
function GroundSlider(props) {
  const { ground } = props;
  console.log(ground, "img");
  return (
    <div className="ltn__img-slider-area mb-90">
      <div className="container-fluid">
        <div
          className="row ltn__image-slider-5-active slick-arrow-1 
          slick-arrow-1-inner ltn__no-gutter-all"
        >
          {ground?.ground?.image.map((item) => (
            <div className="col-lg-12">
              <div className="ltn__img-slide-item-4">
                <Image
                  src={`${urlImages}${item}`}
                  alt={item.name}
                  width={700}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroundSlider;
