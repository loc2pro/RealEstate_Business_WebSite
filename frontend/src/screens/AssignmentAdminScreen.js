import { Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignment, listProducts } from "../actions/productActions";
import { listSellers } from "../actions/userActions";
import AssignmentAdmin from "../components/AssignmentAdmin";
import SellerAdmin from "../components/SellerAdmin";

function AssignmentAdminScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const listSeller = useSelector((state) => state.listSeller);
  const { loading: loadingSeller, error: errorSeller, sellers } = listSeller;
  const [sellerId, setSellerId] = useState([null]);
  const [productId, setProductId] = useState([null]);
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, dataSource]);
  useEffect(() => {
    dispatch(listSellers());
  }, [dispatch]);
  const handleAssignment = () => {
    const create = dispatch(assignment(productId, sellerId));
    create
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          setDataSource(data.assignment._id);
          setProductId(null);
        } else {
          notification.warning({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          description: err.message,
          placement: "bottomRight",
          duration: 3,
        });
      });
  };
  //function callback parent
  const callbackSeller = (chilData) => {
    setSellerId(chilData);
  };
  const callbackProduct = (chilData) => {
    setProductId(chilData);
  };
  console.log(sellerId, "test seller ID");
  console.log(productId, "test product ID");

  return (
    <div className="assignment">
      <div className="Assignment center" style={{ witdh: "100%" }}>
        <div
          className="col-8"
          style={{ borderRight: "1px solid gray", padding: "0.5rem 1rem" }}
        >
          <h3
            class="title_sticky"
            id="jumpto_0"
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "blue",
            }}
          >
            Danh sách sản phẩm
          </h3>
          <AssignmentAdmin
            products={products}
            loading={loading}
            error={error}
            parentCallback={callbackProduct}
            sourceData={dataSource}
          />
        </div>
        <div className="col-4" style={{ padding: "0.5rem 1rem 1rem 1rem" }}>
          <h3
            class="title_sticky"
            id="jumpto_0"
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "blue",
            }}
          >
            Danh sách nhân viên
          </h3>
          <SellerAdmin
            sellers={sellers}
            loading={loadingSeller}
            error={errorSeller}
            parentCallback={callbackSeller}
          />
          {sellerId && productId ? (
            <Button
              type="primary"
              block
              style={{
                marginTop: "100px",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              onClick={handleAssignment}
            >
              Phân công
            </Button>
          ) : (
            <Button
              disabled
              type="primary"
              block
              style={{
                marginTop: "100px",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              // onClick={handleAssignment}
            >
              Phân công
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignmentAdminScreen;
