import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import urlImages from "../api/url";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      console.log("Cart", productId);
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  // const checkoutHandler = () => {
  //   // props.history.push("/signin?redirect=shipping");
  //   props.history.push("/");
  // };
  const removeFromCartHandler = (id) => {
    //delete action
    dispatch(removeFromCart(id));
  };
  return (
    <div className="row top">
      <div className="col-9">
        <h1 style={{ color: "red" }}>Sản Phẩm Ưa Thích</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Chưa có sản phẩm ưa thích. <Link to="/">Quay về trang chủ</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.product}
                style={{
                  border: "1px solid gray",
                  margin: "1rem",
                  borderRadius: "2rem",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                <div
                  className="row"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={`${urlImages}${item.image[0]}`}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    {item.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <div>
                    <button
                      style={{ marginRight: "1rem" }}
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Xóa sản phẩm
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-3">
        <div className="card card-body" style={{ marginTop: "6rem" }}>
          <ul>
            <li style={{ textAlign: "center" }}>
              <h2>
                Tổng Tiền ({cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm):
              </h2>
              <h2>
                {cartItems
                  .reduce((a, c) => a + c.price * c.qty, 0)
                  .toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
              </h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
