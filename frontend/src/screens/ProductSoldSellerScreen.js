import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductsSeller,
  listProductsSoldSeller,
} from "../actions/productActions";
import ProductSoldSeller from "../components/ProductSoldSeller";

function ProductSoldSellerScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const listProductSeller = useSelector((state) => state.listProductSeller);
  const { loading, error, products } = listProductSeller;

  useEffect(() => {
    dispatch(listProductsSoldSeller(userInfo?._id));
  }, [dispatch]);
  return (
    <div>
      <ProductSoldSeller
        products={products}
        loading={loading}
        error={error}
        userInfo={userInfo}
      />
    </div>
  );
}

export default ProductSoldSellerScreen;
