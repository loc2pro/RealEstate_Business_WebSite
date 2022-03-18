import "antd/dist/antd.css";
import $ from "jquery";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { listProductCategories } from "./actions/productActions";
//import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Map from "./components/Map";
import Post from "./components/Post";
import PostGround from "./components/PostGround";
import CartScreen from "./screens/CartScreen";
import GroundScreen from "./screens/GroundScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderSreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderSreen from "./screens/PlaceOrderSreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SearchScreen from "./screens/SearchScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import SupportScreen from "./screens/SupportScreen";
function App() {
  // const cart = useSelector((state) => state.cart);
  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const { cartItems } = cart;
  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;
  const dispatch = useDispatch();
  // const signoutHandler = () => {
  //   dispatch(signout());
  // };
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  //  const productCategoryList = useSelector((state) => state.productCategoryList);
  // const {
  //   loading: loadingCategories,
  //   error: errorCategories,
  //   categories,
  // } = productCategoryList;

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
          <Route path="/postGround" component={PostGround}></Route>
          <Route path="/post" component={Post}></Route>
          <Route path="/map" component={Map}></Route>
          <Route path="/ground" component={GroundScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderSreen}></Route>
          <Route path="/order/:id" component={OrderSreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/profile" component={ProfileScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
