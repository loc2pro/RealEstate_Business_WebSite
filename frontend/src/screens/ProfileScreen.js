import { UserOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Card, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import Footer from "../components/global-components/footer";
import Menu from "../components/global-components/Menu";
import PageHeader from "../components/global-components/page-header";
import CallToActionV1 from "../components/section-components/call-to-action-v1";
import Account from "../components/shop-components/Account";

const { Meta } = Card;

export default function ProfiltScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Sai mật khẩu");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          phone,
          address,
          password,
        })
      );
    }
  };
  return (
    <div>
      <Menu />
      <PageHeader headertitle="Thông tin cá nhân" />
      <Account />
      <CallToActionV1 />
      <Footer />
    </div>
  );
}
