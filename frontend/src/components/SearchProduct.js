import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import urlImages from "../api/url";

export default function SearchProduct(props) {
  const { product } = props;
  let time = dayjs();
  let now = dayjs(product.createdAt);
  let df4 = time.diff(now, "day");
  return (
    <div>
      <Link to={`/product/${product._id}`}>
        <div className="featured">
          <div class="box-container">
            <div class="box">
              <div class="image-container">
                <img src={`${urlImages}${product.image}`} alt={product.name} />
                <div class="info">
                  <h3>{df4} Ngày trước</h3>
                  <h3>{product.status}</h3>
                </div>
                <div class="icons">
                  <a href="#" class="fas fa-film">
                    <h3>{product._id}</h3>
                  </a>
                  <a href="#" class="fas fa-camera">
                    <h3>3</h3>
                  </a>
                </div>
              </div>
              <div class="content">
                <div class="price">
                  <h3>
                    {product.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h3>
                  <a href="#" class="fas fa-heart"></a>
                  <a href="#" class="fas fa-envelope"></a>
                  <a href="#" class="fas fa-phone"></a>
                </div>
                <div class="location">
                  <h3>{product.name}</h3>
                  <p>{product.address} </p>
                </div>
                <div class="details">
                  <h3>
                    <i class="fas fa-expand"></i> {product.acreage} m
                    <sup>2</sup>
                  </h3>
                  <h3>
                    <i class="fas fa-bed"></i> {product.bedroom} Phòng Ngủ
                  </h3>
                  <h3>
                    <i class="fas fa-bath"></i> {product.toilet} WC
                  </h3>
                </div>
                <div class="buttons">
                  <a href="#" class="btn">
                    Liên Hệ
                  </a>
                  <a href="#" class="btn">
                    Xem Chi Tiết
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
