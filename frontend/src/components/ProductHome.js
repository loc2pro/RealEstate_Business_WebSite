import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { listSellers } from "../actions/userActions";
import ModelDetails from "./ModelDetails";
import Product from "./Product";

function ProductHome() {
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
      <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2--- text-center">
                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                  Sản phẩm
                </h6>
                <h1 className="section-title">Danh sách nổi bật</h1>
              </div>
            </div>
          </div>
          <div className="row ltn__product-slider-item-four-active-full-width slick-arrow-1">
            {/* ltn__product-item */}
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHome;
