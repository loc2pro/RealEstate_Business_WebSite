import React, { useEffect } from "react";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Search from "../components/Layout/Search";
import Employee from "../components/Layout/Employee";
import Contact from "../components/Layout/Contact";
import Service from "../components/Service";

export default function ServiceScreen() {
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
          <div class="featured" id="featured">
            <h1 class="heading">
              <span>Bất Động Sản</span> Đặc Trưng
            </h1>
          </div>

          <div className="row center">
            <div className="row">
              <div className="col-4">Phân Loại Tìm Kiếm</div>
              <div className="col-8">
                {products.map((product) => (
                  <Service key={product._id} product={product}></Service>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
