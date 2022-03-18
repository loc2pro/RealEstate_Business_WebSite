import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Router } from "react-router-dom";
import { signout } from "../../actions/userActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

function Header() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  document.addEventListener("DOMContentLoaded", function () {
    let menu = document.querySelector("#menu-bars");
    let navbar = document.querySelector(".navbar");

    menu.onclick = () => {
      navbar.classList.toggle("active");
      menu.classList.toggle("fa-times");
    };

    window.onscroll = () => {
      navbar.classList.remove("active");
      menu.classList.remove("fa-times");
    };
  });
  return (
    <div>
      <header className="row">
        <button
          style={{ width: "50px" }}
          type="button"
          className="open-sidebar"
          onClick={() => setSidebarIsOpen(true)}
        >
          <i className="fa fa-bars"></i>
        </button>
        <a href="/" class="logo">
          <span>Bất Động Sản</span>Phát Lộc
        </a>

        <nav class="navbar">
          <a href="/">Trang Chủ</a>
          <a href="#services">Dịch Vụ</a>
          <a href="/map">Chung Cư</a>
          <a href="#">Nhà Ở</a>
          <a href="/ground">Đất Nền</a>
          <a href="/post">Đăng Tin</a>
          <a href="#contact">Liên Hệ</a>
        </nav>

        <div class="icons">
          <div id="menu-bars" class="fas fa-bars"></div>
          <a href="/cart" class="fas fa-heart">
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </a>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
          {userInfo && userInfo.isSeller && (
            <div className="dropdown">
              <Link to="#admin" style={{ fontSize: "20px" }}>
                Seller <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/productlist/seller">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Orders</Link>
                </li>
              </ul>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown" style={{ fontSize: "20px" }}>
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
                <li>
                  <Link to="/support">Support</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className={sidebarIsOpen ? "open" : ""}>
        <ul className="categories">
          <li>
            <strong>Loại Tài Sản</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i class="fas fa-times-circle"></i>
            </button>
          </li>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map((c) => (
              <li key={c}>
                <Link
                  to={`/search/type/${c}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {c}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  );
}

export default Header;
