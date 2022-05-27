import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Menu from "../components/global-components/Menu";
import Page_header from "../components/global-components/page-header";
import Post from "../components/Post";
import PostGround from "../components/PostGround";

const { TabPane } = Tabs;
export default function (props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login?redirect=post");
    }
  }, [userInfo, history]);
  return (
    <div>
      <Menu />
      <Page_header headertitle=" Bán Nhà Đất " />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 align-self-center">
            <div className="slide-item-car-dealer-form">
              <div className="ltn__car-dealer-form-tab">
                <div className="ltn__tab-menu  text-uppercase">
                  <div className="nav">
                    <a
                      className="active show"
                      data-bs-toggle="tab"
                      href="#ltn__form_tab_1_1"
                    >
                      <i className="fas fa-home" />
                      Nhà/ Chung cư
                    </a>
                    <a data-bs-toggle="tab" href="#ltn__form_tab_1_2" className>
                      <i className="fas fa-home" />
                      Đất
                    </a>
                  </div>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane fade active show"
                    id="ltn__form_tab_1_1"
                  >
                    <div className="car-dealer-form-inner">
                      <Post />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="ltn__form_tab_1_2">
                    <div className="car-dealer-form-inner">
                      <PostGround />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
