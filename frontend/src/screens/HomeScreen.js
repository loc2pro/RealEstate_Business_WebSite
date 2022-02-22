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

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

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
              <span>Tài Sản</span> Đặc Trưng
            </h1>
          </div>

          <div className="row center">
            {products.map((product) => (
                <Product key={product._id} product={product}></Product>
            ))}
          </div>
          <Employee />
          <Contact />
        </div>
      )}
    </div>
  );
}
