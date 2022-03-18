import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listGrounds } from "../actions/groundActions";
import Ground from "../components/Ground";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function GroundScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const groundList = useSelector((state) => state.groundList);
  const { loading, error, grounds } = groundList;

  useEffect(() => {
    dispatch(listGrounds());
  }, [dispatch]);
  const handlePostGround = () => {
    history.push("/postGround");
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div class="featured" id="featured">
            <h1 class="heading">
              <span>Bất Động Sản</span> Đặc Trưng
            </h1>
          </div>
          <button onClick={handlePostGround}>Đăng tin</button>
          <div className="row center">
            <div className="row">
              <div className="col-4">Phân Loại Tìm Kiếm</div>
              <div className="col-8">
                {grounds.map((ground) => (
                  <Ground key={ground._id} ground={ground}></Ground>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
