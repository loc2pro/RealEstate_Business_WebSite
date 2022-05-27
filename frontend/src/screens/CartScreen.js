import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addGroundToCart,
  addToCart,
  removeFromCart,
} from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import urlImages from "../api/url";
import Menu from "../components/global-components/Menu";
import Page_header from "../components/global-components/page-header";
import Finalfooter from "../components/global-components/Finalfooter";
import CallToActionV1 from "../components/section-components/call-to-action-v1";
import Favorite from "../components/shop-components/Favorite";
import Footer from "../components/global-components/footer";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const groundId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

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
  return (
    <div>
      <Menu />
      <Page_header headertitle="Ưa Thích" />
      <Favorite productId={productId} groundId={groundId} qty={qty} />
    </div>
  );
}
