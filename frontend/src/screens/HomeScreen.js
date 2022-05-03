import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Search from "../components/Layout/Search";
import Employee from "../components/Layout/Employee";
import Contact from "../components/Layout/Contact";
import Service from "../components/Layout/Service";
import { Empty } from "antd";
import robot from "../assets/robot.gif";
import Footer from "../components/Layout/Footer";
import { listSellers } from "../actions/userActions";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const listSeller = useSelector((state) => state.listSeller);
  const { loading: loadingSeller, error: errorSeller, sellers } = listSeller;
  useEffect(() => {
    dispatch(listSellers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Search />
          <Service />
          <div class="featured" id="featured">
            <h1 class="heading">
              <span>Bất Động Sản</span> Nổi Bật
            </h1>
          </div>
          {products.length > 0 ? (
            <div
              className="row center"
              style={{ overflowY: "scroll", height: "1000px" }}
            >
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          ) : (
            <div className="row" style={{ height: "300px", width: "100%" }}>
              <div className="row center" style={{ width: "100%" }}>
                <Empty />
              </div>
            </div>
          )}
          <Employee sellers={sellers} />
          <Contact />
          <Footer />
        </div>
      )}
    </div>
  );
}
