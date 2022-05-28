import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addGroundToCart,
  addToCart,
  removeFromCart,
} from "../../actions/cartActions";
import urlImages from "../../api/url";

function Favorite(props) {
  const { productId, groundId, qty } = props;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  useEffect(() => {
    if (groundId) {
      dispatch(addGroundToCart(groundId, qty));
    }
  }, [dispatch, groundId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  console.log(cartItems, "1");
  return (
    <div className="liton__shoping-cart-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                <table className="table">
                  <tbody>
                    {cartItems.map((item) => (
                      <tr>
                        <td
                          className="cart-product-remove"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          x
                        </td>
                        <td className="cart-product-image">
                          {item.type ? (
                            <Link to={`/groundDetails/${item.product}`}>
                              <img
                                src={`${urlImages}${item.image[0]}`}
                                alt={item.name}
                              />
                            </Link>
                          ) : (
                            <Link to={`/product/${item.product}`}>
                              <img
                                src={`${urlImages}${item.image[0]}`}
                                alt={item.name}
                              />
                            </Link>
                          )}
                        </td>
                        <td className="cart-product-info">
                          <h4>
                            {item.type ? (
                              <Link to={`/groundDetails/${item.product}`}>
                                {item.name}
                              </Link>
                            ) : (
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            )}
                          </h4>
                        </td>
                        <td className="cart-product-subtotal">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
