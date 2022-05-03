import { Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignment, listProducts } from "../actions/productActions";
import { listSellers } from "../actions/userActions";
import AssignmentAdmin from "../components/AssignmentAdmin";
import SellerAdmin from "../components/SellerAdmin";
import EmployeeAdmin from "../components/EmployeeAdmin";
function AdminEmployeeScreen() {
  const dispatch = useDispatch();
  const listSeller = useSelector((state) => state.listSeller);
  const { loading: loadingSeller, error: errorSeller, sellers } = listSeller;
  const updateSeller = useSelector((state) => state.updateSeller);
  const { seller } = updateSeller;
  useEffect(() => {
    dispatch(listSellers());
  }, [dispatch]);
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
        Danh sách nhân viên
      </h3>
      <EmployeeAdmin
        sellers={sellers}
        loading={loadingSeller}
        error={errorSeller}
      />
    </div>
  );
}

export default AdminEmployeeScreen;
