import $ from "jquery";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, useHistory } from "react-router-dom";
import { listGroundCategories } from "./actions/groundActions";
import { listProductCategories } from "./actions/productActions";
import "antd/dist/antd.css";
import "./styles.scss";

//admin
import Main from "./components/Dashboard/Main";
import PostGround from "./components/PostGround";
import Billing from "./pages/Billing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Rtl from "./pages/Rtl";
import Tables from "./pages/Tables";
import AdminEmployeeScreen from "./screens/AdminEmployeeScreen";
import AdminUserScreen from "./screens/AdminUserScreen";
import AssignmentAdminScreen from "./screens/AssignmentAdminScreen";
import BrowseScreen from "./screens/BrowseScreen";
import CartScreen from "./screens/CartScreen";
import DetailSellerScreen from "./screens/DetailSellerScreen";
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
import SalaryScreen from "./screens/SalaryScreen";
import SearchScreen from "./screens/SearchScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import SupportScreen from "./screens/SupportScreen";
import TestScreen from "./screens/TestScreen";
import ShopSideBarScreen from "./screens/ShopSideBarScreen";
import ShopSideBar from "./components/ShopSideBar";
import FaqV1 from "./components/faq";
import GroundSideBarScreen from "./screens/GroundSideBarScreen";
import ContactScreen from "./screens/ContactScreen";
import TeamScreen from "./screens/TeamScreen";
import BlogScreen from "./screens/BlogScreen";
import ForgotPassWordScreen from "./screens/ForgotPassWordScreen";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

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
        <div>
          <Route
            path="/search/name/:name?"
            component={ShopSideBarScreen}
            exact
          ></Route>
          <Route
            path="/search/type/:type"
            component={ShopSideBarScreen}
            exact
          ></Route>
          <Route
            path="/search/type/:type/name/:name"
            component={ShopSideBarScreen}
            exact
          ></Route>
          <Route
            path="/search/type/:type/status/:status/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={ShopSideBarScreen}
            exact
          ></Route>
          <Route
            path="/search/type/:type/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={ShopSideBarScreen}
            exact
          ></Route>
          <Route
            path="/search/type/:type/status/:status/name/:name/direction/:direction/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={ShopSideBarScreen}
            exact
          ></Route>
          {/* SearchGround */}
          <Route
            path="/searchground/name/:name?"
            component={GroundSideBarScreen}
            exact
          ></Route>
          <Route
            path="/searchground/type/:type"
            component={GroundSideBarScreen}
            exact
          ></Route>
          <Route
            path="/searchground/type/:type/name/:name"
            component={GroundSideBarScreen}
            exact
          ></Route>
          <Route
            path="/searchground/type/:type/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={GroundSideBarScreen}
            exact
          ></Route>{" "}
          <Route
            path="/searchground/type/:type/status/:status/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={GroundSideBarScreen}
            exact
          ></Route>
          {/* user  */}
          <Route path="/postHistory" component={PostHistoryScreen}></Route>
          <Route path="/postGround" component={PostGround}></Route>
          <Route path="/post" component={PostScreen}></Route>
          <Route path="/ground" component={GroundSideBarScreen}></Route>
          <Route
            path="/groundDetails/:id"
            component={GroundDetailScreen}
          ></Route>
          <Route path="/service" component={ShopSideBarScreen}></Route>
          <Route path="/login" component={SigninScreen}></Route>
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
          <Route path="/map" component={SearchScreen}></Route>
          <Route path="/faq" component={FaqV1} />
          <Route path="/contact" component={ContactScreen} />
          <Route path="/team" component={TeamScreen} />
          <Route path="/blog" component={BlogScreen} />
          <Route path="/forgot" component={ForgotPassWordScreen} />
          <Route
            path="/team-details/:id"
            component={DetailSellerScreen}
          ></Route>
          <Route
            path="/shop-left-sidebar"
            component={ShopSideBarScreen}
            exact
          ></Route>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
