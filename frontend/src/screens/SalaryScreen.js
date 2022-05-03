import { Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import Salary from "../components/Salary";

function SalaryScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    dispatch(detailsUser(userInfo?._id));
  }, [dispatch, userInfo]);
  return (
    <div>
      <Salary salary={user} />
    </div>
  );
}

export default SalaryScreen;
