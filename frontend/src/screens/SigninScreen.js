import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import BgLogin from "../images/bg-login.svg";

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
      <div className="signin">
        <div class="img-bg">
          <img src={BgLogin} alt="Bất Động Sản Phát Lộc" />
        </div>
        <div class="noi-dung">
          <div class="form">
            <h2>Trang Đăng Nhập</h2>
            <form className="form" onSubmit={submitHandler}>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <div class="input-form">
                <label htmlFor="email">Email Đăng Nhập</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div class="input-form">
                <label htmlFor="password">Mật Khẩu</label>
                <input
                  type="password"
                  id="password"
                  placeholder=" Nhập Mật Khẩu"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div class="nho-dang-nhap">
                <label>
                  <input type="checkbox" name="" /> Nhớ Đăng Nhập
                </label>
              </div>
              <div class="input-form">
                <input type="submit" value="Đăng Nhập" />
              </div>
              <div class="input-form">
                <p>
                  Bạn Chưa Có Tài Khoản? <a href="/register">Đăng Ký</a>
                </p>
              </div>
            </form>
            <h3>Đăng Nhập Bằng Mạng Xã Hội</h3>
            <ul class="icon-dang-nhap">
              <li>
                <i class="fab fa-facebook" aria-hidden="true"></i>
              </li>
              <li>
                <i class="fab fa-google" aria-hidden="true"></i>
              </li>
              <li>
                <i class="fab fa-twitter" aria-hidden="true"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
    </div>
  );
}
