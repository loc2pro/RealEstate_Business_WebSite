import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import urlImages from "../api/url";

export default function Product(props) {
  const { product } = props;
  const dispatch = useDispatch();

  let time = dayjs();
  let now = dayjs(product.createdAt);
  let df4 = time.diff(now, "day");
  console.log(product);
  const handleAddToCart = (e) => () => {
    console.log(e, "cart");
    dispatch(addToCart(e));
  };
  return (
    <div>
      {product?.browse && product?.countInStock > 0 && (
        <div className="col-lg-12">
          <div className="ltn__product-item ltn__product-item-4 text-center---">
            <div className="product-img go-top">
              <Link to={`/product/${product._id}`}>
                <img
                  src={`${urlImages}${product.image[0]}`}
                  alt={product.name}
                />
              </Link>
              <div className="product-badge">
                <ul>
                  {product.status == "Bán" ? (
                    <li className="sale-badge bg-green">{product.status}</li>
                  ) : (
                    <li className="sale-badge bg-green---">{product.status}</li>
                  )}
                </ul>
              </div>
              <div className="product-badge-left">
                <ul>
                  {df4 == 0 ? (
                    <li className="sale-badge bg-green---">Hôm nay</li>
                  ) : (
                    <li className="sale-badge bg-green---">{df4} Ngày trước</li>
                  )}
                </ul>
              </div>
              <div className="product-img-location-gallery">
                <div className="product-img-location">
                  <ul>
                    <li>
                      <Link to={`/product/${product._id}`}>
                        <i className="flaticon-pin" /> {product.address},{" "}
                        {product.ward}, {product.district}, {product.city}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="product-img-gallery go-top">
                  <ul>
                    <li>
                      <Link to={`/product/${product._id}`}>
                        <i className="fas fa-camera" /> {product.image.length}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="product-info">
              <div className="product-price">
                <span>
                  {product.status == "Bán" ? (
                    product.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  ) : (
                    <div>
                      {product.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                      / <label> Tháng</label>
                    </div>
                  )}
                </span>
              </div>
              <h2 className="product-title go-top">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </h2>
              <div className="product-description">
                <p>{product.legalDocuments}</p>
              </div>
              <ul className="ltn__list-item-2 ltn__list-item-2-before">
                <li>
                  <span>
                    {product.bedroom} <i className="flaticon-bed" />
                  </span>
                  Phòng ngủ
                </li>
                <li>
                  <span>
                    {product.toilet} <i className="flaticon-clean" />
                  </span>
                  WC
                </li>
                <li>
                  <span>
                    {product.acreage}
                    <i className="flaticon-square-shape-design-interface-tool-symbol" />
                  </span>
                  m2
                </li>
              </ul>
            </div>
            <div className="product-info-bottom">
              <div className="real-estate-agent">
                <div className="agent-img go-top">
                  <Link to={`/team-details/${product?.seller?._id}`}>
                    <img
                      src={`${urlImages}${product?.seller?.seller?.logo}`}
                      alt={product?.seller?.name}
                    />
                  </Link>
                </div>
                <div className="agent-brief go-top">
                  <h6>
                    <Link to={`/team-details/${product?.seller?._id}`}>
                      {product?.seller?.name}
                    </Link>
                  </h6>
                  <small>Nhân viên</small>
                </div>
              </div>
              <div className="product-hover-action">
                <ul>
                  <li>
                    <a title="Ưa thích" onClick={handleAddToCart(product._id)}>
                      <i className="flaticon-heart-1" />
                    </a>
                  </li>
                  <li>
                    <span className="go-top">
                      <Link
                        to={`/product/${product._id}`}
                        title="Thông tin chi tiết"
                      >
                        <i className="flaticon-expand" />
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
