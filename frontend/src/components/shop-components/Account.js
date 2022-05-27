import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/userActions";
import { Col, Form, Input, Row, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import { detailsUser, updateUserProfile } from "../../actions/userActions";

function Account() {
  const dispatch = useDispatch();

  let publicUrl = process.env.PUBLIC_URL + "/";
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Sai mật khẩu");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          phone,
          address,
          password,
        })
      );
    }
  };

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="liton__wishlist-area pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* PRODUCT TAB AREA START */}
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="ltn__tab-menu-list mb-50">
                      <div className="nav">
                        <a
                          className="active show"
                          data-bs-toggle="tab"
                          href="#ltn_tab_1_1"
                        >
                          Trang chính <i className="fas fa-home" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_2">
                          Hồ sơ <i className="fas fa-user" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_4">
                          Hồ sơ chi tiết <i className="fas fa-user" />
                        </a>
                        <a href="/login" onClick={signoutHandler}>
                          Đăng Xuất <i className="fas fa-sign-out-alt" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="ltn_tab_1_1"
                      >
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            Xin chào <strong>{userInfo?.name}</strong>
                          </p>
                          <p>
                            Từ trang tổng quan tài khoản của mình, bạn có thể
                            xem
                            <span> thông tin</span>
                            <span> cũng như chỉnh sửa mật khẩu .</span>
                          </p>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_2">
                        <div className="ltn__myaccount-tab-content-inner">
                          {/* comment-area */}
                          <div className="ltn__comment-area mb-50">
                            <div className="ltn-author-introducing clearfix">
                              <div className="author-img">
                                <Avatar size={200} icon={<UserOutlined />} />
                              </div>
                              <div className="author-info">
                                <h6>Hồ sơ</h6>
                                <h2>{userInfo?.name}</h2>
                                <div className="footer-address">
                                  <ul>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-placeholder" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>{userInfo?.address}</p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-call" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>
                                          <a href="tel:+0123-456789">
                                            {userInfo?.phone}
                                          </a>
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-mail" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>
                                          <a href="mailto:example@example.com">
                                            {userInfo?.email}
                                          </a>
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_4">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="ltn__form-box">
                            <form onSubmit={submitHandler}>
                              <row>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && (
                                  <MessageBox variant="danger">
                                    {errorUpdate}
                                  </MessageBox>
                                )}
                                {successUpdate && (
                                  <MessageBox variant="success">
                                    Cập nhật thông tin thành công
                                  </MessageBox>
                                )}
                              </row>
                              <legend
                                style={{ marginBottom: "2rem", color: "red" }}
                              >
                                THAY ĐỔI THÔNG TIN
                              </legend>
                              <div className="row mb-50">
                                <div className="col-md-6">
                                  <label>Tên:</label>
                                  <Input
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label>Email:</label>
                                  <Input
                                    readOnly
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label>Số điện thoại:</label>
                                  <Input
                                    type="number"
                                    name="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    placeholder="09xxxxxxxx"
                                    style={{
                                      fontWeight: "bold",
                                      height: "65px",
                                    }}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label>Địa chỉ</label>
                                  <Input
                                    name="address"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    placeholder="Địa chỉ"
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                  />
                                </div>
                              </div>
                              <fieldset>
                                <legend
                                  style={{ marginBottom: "2rem", color: "red" }}
                                >
                                  THAY ĐỔI MẬT KHẨU
                                </legend>
                                <div className="row">
                                  <div className="col-md-12">
                                    <label>
                                      Mật khẩu mới: (Để trống không thay đổi):
                                    </label>
                                    <Input
                                      type="password"
                                      name="password"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      style={{
                                        fontWeight: "bold",
                                      }}
                                    />
                                    <label>Nhập lại mật khẩu:</label>
                                    <Input
                                      type="password"
                                      name="confirmPassword"
                                      value={confirmPassword}
                                      onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                      }
                                      style={{
                                        fontWeight: "bold",
                                      }}
                                    />
                                  </div>
                                </div>
                              </fieldset>
                              <div className="btn-wrapper">
                                <button
                                  type="submit"
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                >
                                  Lưu thay đổi
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PRODUCT TAB AREA END */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
