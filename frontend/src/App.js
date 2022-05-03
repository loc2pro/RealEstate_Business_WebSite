import "antd/dist/antd.css";
import $ from "jquery";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { listGroundCategories } from "./actions/groundActions";
import { listProductCategories } from "./actions/productActions";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
//admin
import Main from "./components/Dashboard/Main";
import Header from "./components/Layout/Header";
import PostGround from "./components/PostGround";
import Billing from "./pages/Billing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Rtl from "./pages/Rtl";
import Tables from "./pages/Tables";
import AdminUserScreen from "./screens/AdminUserScreen";
import AdminEmployeeScreen from "./screens/AdminEmployeeScreen";

import AssignmentAdminScreen from "./screens/AssignmentAdminScreen";
import BrowseScreen from "./screens/BrowseScreen";
import CartScreen from "./screens/CartScreen";
import GroundDetailScreen from "./screens/GroundDetailScreen";
import GroundScreen from "./screens/GroundScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderSreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderSreen from "./screens/PlaceOrderSreen";
import PostHistoryScreen from "./screens/PostHistoryScreen";
import PostScreen from "./screens/PostScreen";
import ProductAdminScreen from "./screens/ProductAdminScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import ProductSellerScreen from "./screens/ProductSellerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SearchScreen from "./screens/SearchScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import SupportScreen from "./screens/SupportScreen";
import SalaryScreen from "./screens/SalaryScreen";
import TestScreen from "./screens/TestScreen";
function App() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(listGroundCategories());
  }, [dispatch]);

  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop()) {
        $("#backtop").fadeIn();
      } else {
        $("#backtop").fadeOut();
      }
    });
    $("#backtop").click(function () {
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        10
      );
    });
  });
  return (
    <BrowserRouter>
      {userInfo?.isAdmin || userInfo?.isSeller ? (
        <div>
          <Route path="/sign-up" exact component={SigninScreen} />
          <Route path="/sign-in" exact component={RegisterScreen} />
          <Main>
            <Route exact path="/admin/dashboard" component={Home} />
            <Route exact path="/tables" component={Tables} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/rtl" component={Rtl} />
            <Route exact path="/profileSeller" component={Profile} />
            {/* admin */}
            <Route path="/admin/browse" component={BrowseScreen}></Route>
            <Route
              path="/admin/listproduct"
              component={ProductAdminScreen}
            ></Route>
            <Route
              path="/admin/assignment"
              component={AssignmentAdminScreen}
            ></Route>
            <Route path="/admin/user" component={AdminUserScreen}></Route>
            <Route
              path="/admin/employee"
              component={AdminEmployeeScreen}
            ></Route>
            {/* seller  */}
            <Route path="/seller/support" component={SupportScreen}></Route>
            <Route
              path="/seller/listproduct"
              component={ProductSellerScreen}
            ></Route>
            <Route path="/seller/salary" component={SalaryScreen}></Route>
            {/* <Redirect from="*" to="/admin/dashboard" /> */}
          </Main>
        </div>
      ) : (
        <div className="grid-container">
          <Header />
          <main style={{ marginTop: "7.5rem", minHeight: "600px" }}>
            <div id="backtop">
              <i class="fas fa-chevron-up"></i>
            </div>
            <Route
              path="/search/name/:name?"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/type/:type"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/type/:type/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/type/:type/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
              component={SearchScreen}
              exact
            ></Route>
            {/* SearchGround */}
            <Route
              path="/searchground/name/:name?"
              component={GroundScreen}
              exact
            ></Route>
            <Route
              path="/searchground/type/:type"
              component={GroundScreen}
              exact
            ></Route>
            <Route
              path="/searchground/type/:type/name/:name"
              component={GroundScreen}
              exact
            ></Route>
            <Route
              path="/searchground/type/:type/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
              component={GroundScreen}
              exact
            ></Route>

            {/* user  */}
            <Route path="/postHistory" component={PostHistoryScreen}></Route>
            <Route path="/postGround" component={PostGround}></Route>
            <Route path="/post" component={PostScreen}></Route>
            <Route path="/ground" component={GroundScreen}></Route>
            <Route
              path="/groundDetails/:id"
              component={GroundDetailScreen}
            ></Route>
            <Route path="/service" component={SearchScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductDetailScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderSreen}></Route>
            <Route path="/order/:id" component={OrderSreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/map" component={TestScreen} exact></Route>
          </main>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
