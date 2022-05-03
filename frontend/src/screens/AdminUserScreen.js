import { Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import UserAdmin from "../components/UserAdmin";

function AdminUserScreen() {
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const [createUser, setCreateUser] = useState(null);
  const listUser = useSelector((state) => state.listUser);
  const { loading, users, error } = listUser;
  useEffect(() => {
    dispatch(listUsers());
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
        Danh sách người dùng
      </h3>
      <UserAdmin users={users} loading={loading} error={error} />
     
    </div>
  );
}

export default AdminUserScreen;
