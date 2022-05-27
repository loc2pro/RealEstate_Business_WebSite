import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, listProductsAdmin } from "../actions/productActions";
import ProductAdmin from "../components/ProductAdmin";
import { Button, Modal, notification, Row, Table, Tabs } from "antd";
import { listGrounds } from "../actions/groundActions";
import GroundAdmin from "../components/GroundAdmin";

const { TabPane } = Tabs;

function ProductAdminScreen() {
  const dispatch = useDispatch();
  const listAdmin = useSelector((state) => state.listAdmin);
  const { loading, error, products } = listAdmin;
  const groundList = useSelector((state) => state.groundList);
  const { loading: loadingGround, error: errorGround, grounds } = groundList;
  // List Product
  useEffect(() => {
    dispatch(listProductsAdmin());
  }, [dispatch]);
  // List Ground
  useEffect(() => {
    dispatch(listGrounds());
  }, [dispatch]);
  console.log(grounds);
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
        Tất cả sản phẩm
      </h3>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="Large"
        style={{ fontWeight: "bold", fontSize: "60px" }}
      >
        <TabPane tab=" Nhà Ở/ Chung Cư" key="1">
          <ProductAdmin products={products} loading={loading} error={error} />
        </TabPane>
        <TabPane tab=" Đất" key="2">
          <GroundAdmin
            grounds={grounds}
            loading={loadingGround}
            error={errorGround}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProductAdminScreen;
