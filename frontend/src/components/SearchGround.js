import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addGroundToCart } from "../actions/cartActions";
import urlImages from "../api/url";

export default function SearchGround(props) {
  const { ground } = props;
  const dispatch = useDispatch();

  let time = dayjs();
  let now = dayjs(ground?.createdAt);
  let df4 = time.diff(now, "day");
  console.log(ground, "test");
  const handleAddToCart = (e) => () => {
    console.log(e, "cart");
    dispatch(addGroundToCart(e));
  };
  return (
    <div className="col-xl-6 col-sm-6 col-12">
      {ground?.browse && ground?.countInStock > 0 && (
        <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
          <div className="product-img go-top">
            <Link to={`/groundDetails/${ground._id}`}>
              <img src={`${urlImages}${ground?.image[0]}`} alt={ground.name} />
            </Link>
            <div className="real-estate-agent">
              <div className="agent-img">
                <Link to={`/team-details/${ground?.seller?._id}`}>
                  <img
                    src={`${urlImages}${ground?.seller?.seller?.logo}`}
                    alt={ground?.seller?.name}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="product-badge">
              <ul>
                <li className="sale-badg">{ground?.status}</li>
              </ul>
            </div>
            <h2 className="product-title go-top">
              <Link to={`/groundDetails/${ground._id}`}>{ground?.name}</Link>
            </h2>
            <div className="product-img-location go-top">
              <ul>
                <li>
                  <Link to={`/groundDetails/${ground._id}`}>
                    <i className="flaticon-pin" />
                    {ground?.ward}, {ground?.district}, {ground?.city}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="product-hover-action">
              <ul>
                <li>
                  <a title="Ưa thích" onClick={handleAddToCart(ground._id)}>
                    <i className="flaticon-heart-1" />
                  </a>
                </li>
                <li>
                  <span className="go-top">
                    <Link
                      to={`/groundDetails/${ground._id}`}
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
                {ground.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
