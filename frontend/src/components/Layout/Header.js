import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Router, useHistory } from "react-router-dom";
import { signout } from "../../actions/userActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

function Header(props) {
  const history = useHistory();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [visible, setVisible] = useState(false);

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const groundCategoryList = useSelector((state) => state.groundCategoryList);
  const {
    loading: loadingGroundCategories,
    error: errorGroundCategories,
    categories: groundCategories,
  } = groundCategoryList;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
    history.push("/signin");
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
    <div className="header">
      <div className="row">
        <Button
          className="menu"
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
          style={{ width: "5rem", height: "4.5rem" }}
        />
        <a href="/" class="logo">
          <span>Bất Động Sản</span>Phát Lộc
        </a>

        <nav class="navbar">
          <a href="/">Trang Chủ</a>
          <a href="#services">Dịch Vụ</a>
          <a href="/service">Chung Cư</a>
          <a href="/service">Nhà Ở</a>
          <a href="/ground">Đất Nền</a>
          {userInfo && <a href="/post">Đăng Tin</a>}
          <a href="/map">Liên Hệ</a>
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
                    <a href="/postHistory" style={{ fontSize: "20px" }}>
                      Bài đăng
                    </a>
                  </li>
                  <li>
                    <a
                      href="/signin"
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
                  <Link to="/seller/listproduct">Sản phẩm</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Hóa đơn</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Thưởng hoa hồng</Link>
                </li>
                <li>
                  <Link to="/seller/support">Hổ trợ khách hàng</Link>
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
                  <Link to="/dashboard">Thống kê</Link>
                </li>
                <li>
                  <Link to="/admin/listproduct">Sản phẩm</Link>
                </li>
                <li>
                  <Link to="/admin/browse">Duyệt bài</Link>
                </li>
                <li>
                  <Link to="/admin/assignment">Phân công</Link>
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
      </div>
      <Drawer
        title="Loại tài sản"
        placement="left"
        width={window.innerWidth > 1200 ? 350 : "auto"}
        onClose={onClose}
        visible={visible}
      >
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
        {loadingGroundCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorGroundCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          groundCategories.map((c) => (
            <li key={c}>
              <Link
                to={`/searchground/type/${c}`}
                onClick={() => setSidebarIsOpen(false)}
              >
                {c}
              </Link>
            </li>
          ))
        )}
      </Drawer>
    </div>
  );
}

export default Header;
