import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listGroundsSeller,
  listGroundsSoldSeller,
} from "../actions/groundActions";
import {
  listProductsSeller,
  listProductsSoldSeller,
} from "../actions/productActions";
import GroundSeller from "../components/GroundSeller";
import GroundSoldSeller from "../components/GroundSoldSeller";
import ProductSeller from "../components/ProductSeller";
import ProductSoldSeller from "../components/ProductSoldSeller";
const { TabPane } = Tabs;

function ProductSellerScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const listProductSeller = useSelector((state) => state.listProductSeller);
  const { loading, error, products } = listProductSeller;
  const listProductSoldSeller = useSelector(
    (state) => state.listProductSoldSeller
  );
  const {
    loading: soldLoading,
    error: soldError,
    products: soldProduct,
  } = listProductSoldSeller;

  const listGroundSeller = useSelector((state) => state.listGroundSeller);
  const {
    loading: loadingGround,
    error: errorGround,
    grounds,
  } = listGroundSeller;
  const listGroundSoldSeller = useSelector(
    (state) => state.listGroundSoldSeller
  );
  const {
    loading: soldGroundLoading,
    error: soldGroundError,
    grounds: soldGround,
  } = listGroundSoldSeller;

  const [dataSource, setDataSource] = useState();

  //List product
  useEffect(() => {
    dispatch(listProductsSeller(userInfo?._id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(listProductsSoldSeller(userInfo?._id));
  }, [dispatch, dataSource]);
  //List ground
  useEffect(() => {
    dispatch(listGroundsSeller(userInfo?._id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(listGroundsSoldSeller(userInfo?._id));
  }, [dispatch, dataSource]);

  //function callback parent
  const callbackProduct = (chilData) => {
    setDataSource(chilData);
  };
  return (
    <div>
      <h3
        class="title_sticky"
        id="jumpto_0"
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          color: "red",
          marginLeft: "2rem",
        }}
      >
        Danh sách sản phẩm
      </h3>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="Large"
        style={{ fontWeight: "bold", fontSize: "60px" }}
      >
        <TabPane tab="Sản phẩm chưa bán" key="1">
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="Large"
            style={{ fontWeight: "bold", fontSize: "60px" }}
          >
            <TabPane tab=" Nhà Ở/ Chung Cư" key="1">
              <ProductSeller
                products={products}
                loading={loading}
                error={error}
                userInfo={userInfo}
                parentCallback={callbackProduct}
              />
            </TabPane>
            <TabPane tab=" Đất" key="2">
              <GroundSeller
                grounds={grounds}
                loading={loadingGround}
                error={errorGround}
                userInfo={userInfo}
                parentCallback={callbackProduct}
              />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Sản phẩm đã bán" key="2">
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="Large"
            style={{ fontWeight: "bold", fontSize: "60px" }}
          >
            <TabPane tab=" Nhà Ở/ Chung Cư" key="1">
              <ProductSoldSeller
                products={soldProduct}
                loading={soldLoading}
                error={soldError}
                userInfo={userInfo}
              />
            </TabPane>
            <TabPane tab=" Đất" key="2">
              <GroundSoldSeller
                grounds={soldGround}
                loading={soldGroundLoading}
                error={soldGroundError}
                userInfo={userInfo}
                parentCallback={callbackProduct}
              />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProductSellerScreen;
