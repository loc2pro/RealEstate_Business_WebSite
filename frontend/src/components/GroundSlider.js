import { Image } from "antd";
import React, { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import urlImages from "../api/url";
function GroundSlider(props) {
  const { ground } = props;
  const [current, setCurrent] = useState(0);
  const length = ground?.ground?.image?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (
    !Array.isArray(ground?.ground?.image) ||
    ground?.ground?.image?.length <= 0
  ) {
    return null;
  }
  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {ground?.ground?.image?.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <Image
                src={`${urlImages}${slide}`}
                alt={slide.name}
                width={700}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}

export default GroundSlider;
