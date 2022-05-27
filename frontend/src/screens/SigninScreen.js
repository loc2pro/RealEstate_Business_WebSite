import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import Footer from "../components/global-components/footer";
import Menu from "../components/global-components/Menu";
import PageHeader from "../components/global-components/page-header";
import CallToActionV1 from "../components/section-components/call-to-action-v1";
import Signin from "../components/section-components/Signin";


export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <Menu />
      <PageHeader headertitle="Account" subheader="Login" />
      <Signin />
      <CallToActionV1 />
      <Footer />
    </div>
  );
}
