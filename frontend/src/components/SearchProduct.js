import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import urlImages from "../api/url";

export default function SearchProduct(props) {
  const { product } = props;
  const dispatch = useDispatch();

  let time = dayjs();
  let now = dayjs(product.createdAt);
  let df4 = time.diff(now, "day");
  console.log(product, "test");
  const handleAddToCart = (e) => () => {
    console.log(e, "cart");
    dispatch(addToCart(e));
  };
  return (
    <div className="col-xl-6 col-sm-6 col-12">
      {product?.browse && product?.countInStock > 0 && (
        <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
          <div className="product-img go-top">
            <Link to={`/product/${product._id}`}>
              <img
                src={`${urlImages}${product?.image[0]}`}
                alt={product.name}
              />
            </Link>
            <div className="real-estate-agent">
              <div className="agent-img">
                <Link to={`/team-details/${product?.seller?._id}`}>
                  <img
                    src={`${urlImages}${product?.seller?.seller?.logo}`}
                    alt={product?.seller?.name}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="product-badge">
              <ul>
                <li className="sale-badg">{product?.status}</li>
              </ul>
            </div>
            <h2 className="product-title go-top">
              <Link to={`/product/${product._id}`}>{product?.name}</Link>
            </h2>
            <div className="product-img-location go-top">
              <ul>
                <li>
                  <Link to={`/product/${product._id}`}>
                    <i className="flaticon-pin" />
                    {product?.ward}, {product?.district}, {product?.city}
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
              <li>
                <span> {product?.bedroom}</span>
                Phòng ngủ
              </li>
              <li>
                <span> {product?.toilet} </span>
                WC
              </li>
              <li>
                <span>{product?.acreage}</span>
                m2
              </li>
            </ul>
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
          <div className="product-info-bottom">
            <div className="product-price">
              <span>
                {product.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
    // <div>
    //   {product?.browse && product?.countInStock > 0 && (
    //     <Link to={`/product/${product._id}`}>
    //       <div className="featured">
    //         <div class="box-container">
    //           <div class="box">
    //             <div class="image-container">
    //               <img
    //                 src={`${urlImages}${product.image[0]}`}
    //                 alt={product.name}
    //               />
    //               <div class="info">
    //                 {df4 == 0 ? <h3>Hôm nay</h3> : <h3>{df4} Ngày trước</h3>}
    //                 <h3>{product.status}</h3>
    //               </div>
    //               <div class="icons">
    //                 <a href="#" class="fas fa-film">
    //                   <h3>{product.type}</h3>
    //                 </a>
    //                 <a href="#" class="fas fa-camera">
    //                   <h3>{product.image.length}</h3>
    //                 </a>
    //               </div>
    //             </div>
    //             <div class="content">
    //               <div class="price">
    //                 <h3>
    //                   {product.price.toLocaleString("it-IT", {
    //                     style: "currency",
    //                     currency: "VND",
    //                   })}
    //                 </h3>
    //                 <a href="#" class="fas fa-heart"></a>
    //                 <a href="#" class="fas fa-envelope"></a>
    //                 <a href="#" class="fas fa-phone"></a>
    //               </div>
    //               <div class="location">
    //                 <h3>{product.name}</h3>
    //                 <p>
    //                   <i
    //                     class="fas fa-map-marker-alt"
    //                     style={{ marginRight: "1rem" }}
    //                   ></i>
    //                   {product.address}, {product.ward}, {product.district},
    //                   {product.city}
    //                 </p>
    //               </div>
    //               <div class="details">
    //                 <h3>
    //                   <i class="fas fa-expand"></i> {product.acreage} m
    //                   <sup>2</sup>
    //                 </h3>
    //                 <h3>
    //                   <i class="fas fa-bed"></i> {product.bedroom} Phòng Ngủ
    //                 </h3>
    //                 <h3>
    //                   <i class="fas fa-bath"></i> {product.toilet} WC
    //                 </h3>
    //               </div>
    //               <div class="buttons">
    //                 <a href="#" class="btn">
    //                   Liên Hệ
    //                 </a>
    //                 <a href="#" class="btn">
    //                   Xem Chi Tiết
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Link>
    //   )}
    // </div>
  );
}
