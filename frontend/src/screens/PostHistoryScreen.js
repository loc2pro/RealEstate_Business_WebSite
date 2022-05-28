import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPost, listPostGrounds } from "../actions/postActions";
import PostHistory from "../components/PostHistory";
import { Tabs, Radio } from "antd";
import PostHistoryGround from "../components/PostHistoryGround";
import Menu from "../components/global-components/Menu";
import Page_header from "../components/global-components/page-header";
const { TabPane } = Tabs;

function PostHistoryScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const listPosts = useSelector((state) => state.listPosts);
  const { loading, products, error } = listPosts;
  const listPostGround = useSelector((state) => state.listPostGround);
  const {
    loading: loadingGround,
    grounds,
    error: errorGround,
  } = listPostGround;
  useEffect(() => {
    dispatch(listPost(userInfo?._id));
  }, [userInfo?._id, dispatch]);
  useEffect(() => {
    dispatch(listPostGrounds(userInfo?._id));
  }, [userInfo?._id, dispatch]);

  return (
    <div>
      <Menu />
      <Page_header headertitle="Lịch sử gữi bài" />
      <div className="container">
        <h3
          class="title_sticky"
          id="jumpto_0"
          style={{
            fontWeight: "bold",
            fontSize: "30px",
            color: "red",
            marginLeft: "2rem",
          }}
        >
          Danh sách bài đăng
        </h3>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="Large"
          style={{ fontWeight: "bold", fontSize: "60px" }}
        >
          <TabPane tab=" Nhà Ở/ Chung Cư" key="1">
            <PostHistory products={products} loading={loading} error={error} />
          </TabPane>
          <TabPane tab=" Đất" key="2">
            <PostHistoryGround
              grounds={grounds}
              loading={loadingGround}
              error={errorGround}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default PostHistoryScreen;
