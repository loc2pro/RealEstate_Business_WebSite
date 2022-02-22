import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/userActions";

function Header() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  // document.addEventListener("DOMContentLoaded", function () {
  //   let menu = document.querySelector("#menu-bars");
  //   let navbar = document.querySelector(".navbar");

  //   menu.onclick = () => {
  //     navbar.classList.toggle("active");
  //     menu.classList.toggle("fa-times");
  //   };

  //   window.onscroll = () => {
  //     navbar.classList.remove("active");
  //     menu.classList.remove("fa-times");
  //   };
  // });
  return (
    <div>
      <header className="row">
        <a href="/" class="logo">
          <span>Bất Động Sản</span>Phát Lộc
        </a>

        <nav class="navbar">
          <a href="/">Trang Chủ</a>
          <a href="#services">Dịch Vụ</a>
          <a href="/chungcu">Chung Cư</a>
          <a href="/post">Nhà Ở</a>
          <a href="/map">Đất Nền</a>
          <a href="#contact">Liên Hệ</a>
        </nav>

        <div class="icons">
          <div id="menu-bars" class="fas fa-bars"></div>
          <a href="#" class="fas fa-heart"></a>
        </div>
        <div>
          {userInfo ? (
            <div>
              <div className="dropdown">
                <a href="#" style={{ fontSize: "20px" }}>
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </a>
                <ul className="dropdown-content">
                  <li>
                    <a href="/profile" style={{ fontSize: "20px" }}>
                      Thông Tin
                    </a>
                  </li>
                  <li>
                    <a
                      href="#signout"
                      onClick={signoutHandler}
                      style={{ fontSize: "20px" }}
                    >
                      Đăng Xuất
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/signin" style={{ fontSize: "20px", color: "white" }}>
              Login
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
