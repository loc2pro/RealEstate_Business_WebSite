import React from "react";
import { Link } from "react-router-dom";
import urlImages from "../api/url";

function RelatedProducts(props) {
  const { product } = props;
  console.log(product, "dâd");
  return (
    <div className="col-xl-6 col-sm-6 col-12 go-top">
      {product?.browse && product?.countInStock > 0 && (
        <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
          <div className="product-img">
            <Link to="/shop">
              <img src={`${urlImages}${product.image[0]}`} alt={product.name} />
            </Link>
            <div className="real-estate-agent">
              <div className="agent-img">
                <Link to="/team-details">
                  <img src={"assets/img/blog/author.jpg"} alt="#" />
                </Link>
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="product-badge">
              <ul>
                <li className="sale-badg">For Rent</li>
              </ul>
            </div>
            <h2 className="product-title">
              <Link to="/shop">New Apartment Nice View</Link>
            </h2>
            <div className="product-img-location">
              <ul>
                <li>
                  <Link to="/shop">
                    <i className="flaticon-pin" /> Belmont Gardens, Chicago
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
              <li>
                <span>3 </span>
                Bedrooms
              </li>
              <li>
                <span>2 </span>
                Bathrooms
              </li>
              <li>
                <span>3450 </span>
                square Ft
              </li>
            </ul>
            <div className="product-hover-action">
              <ul>
                <li>
                  <a
                    href="#"
                    title="Quick View"
                    data-bs-toggle="modal"
                    data-bs-target="#quick_view_modal"
                  >
                    <i className="flaticon-expand" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    title="Wishlist"
                    data-bs-toggle="modal"
                    data-bs-target="#liton_wishlist_modal"
                  >
                    <i className="flaticon-heart-1" />
                  </a>
                </li>
                <li>
                  <Link to="/shop" title="Compare">
                    <i className="flaticon-add" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-info-bottom">
            <div className="product-price">
              <span>
                $349,00<label>/Month</label>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RelatedProducts;
