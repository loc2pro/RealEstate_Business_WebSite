import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import BgLogin from "../images/bg-login.svg";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(" Password and comfirm password are not match ");
    } else {
      dispatch(register(name, email,phone,address, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <div className="signin">
        <div class="img-bg">
          <img src={BgLogin} alt="Bất Động Sản Phát Lộc" />
        </div>
        <div class="noi-dung">
          <div class="form">
            <h2>Trang Đăng Ký</h2>
            <form className="form" onSubmit={submitHandler}>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <div class="input-form">
                <label htmlFor="Name">Tên</label>
                <input
                  type="Name"
                  id="Name"
                  placeholder=" Nhập vào tên của bạn"
                  required
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div class="input-form">
                <label htmlFor="email">Email đăng nhập</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div class="input-form">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="phone"
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </div>
              <div class="input-form">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="address"
                  id="address"
                  placeholder="Nhập địa chỉ"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
              <div class="input-form">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  placeholder=" Nhập mật khẩu"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="input-form">
                <label htmlFor="confirmPassword"> Nhập lại mật khẩu</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder=" Nhập lại mật khẩu"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              <div class="input-form">
                <input type="submit" value="Đăng Ký" />
              </div>
              <div class="input-form">
                <p>
                  Bạn đã có tài khoản ? 
                <Link to={`/signin?redirect=${redirect}`}>Đăng nhập</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
