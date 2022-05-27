import { Image } from "antd";
import React, { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import urlImages from "../api/url";

const ProductSlider = ({ product }) => {
  console.log(product, "img");
  const [current, setCurrent] = useState(0);
  const length = product?.product?.image?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (
    !Array.isArray(product?.product?.image) ||
    product?.product?.image?.length <= 0
  ) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {product?.product?.image?.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <Image src={`${urlImages}${slide}`} alt={slide.name} width={700} />
            )}
          </div>
        );
      })}
    </section>
  );
};
export default ProductSlider;
