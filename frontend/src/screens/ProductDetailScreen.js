import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { detailsProduct } from "../actions/productActions";
import urlImages from "../api/url";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Col, Image, Modal, Row } from "antd";
import ChatBox from "../components/ChatBox";
import Menu from "../components/global-components/Menu";
import Page_header from "../components/global-components/page-header";
import ProductDetail from "../components/ProductDetail";
import ProductSlider from "../components/ProductSlider";

export default function ProductDetailScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
    console.log(productId);
  }, [dispatch, productId]);
  const addTocartHandler = () => {
    props.history.push(`/cart/${productId}`);
  };

  return (
    <>
      <Menu />
      <Page_header headertitle="Chi tiết sản phẩm" customclass="mb-0" />

      <ProductSlider product={product} />
      <ProductDetail product={product} />
    </>
  );
}
