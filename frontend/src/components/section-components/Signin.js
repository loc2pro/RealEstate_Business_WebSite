import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { forgotPassword, signin } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
const { Option } = Select;
const { TextArea } = Input;
const { Search } = Input;
function Signin(props) {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const history = useHistory();

  const passForgot = useSelector((state) => state.passForgot);
  const {
    loading: loadingForgot,
    error: errorForgot,
    forgot,
    success,
  } = passForgot;
  const dispatch = useDispatch();
  const onFinish = (e) => {
    dispatch(signin(email, password)).then((data) => {
      if (data.success) {
        if (data.data.isAdmin) {
          history.push("/admin/dashboard");
        }
        if (data.data.isSeller) {
          history.push("/admin/dashboard");
        } else {
          history.push("/");
        }
      }
    });
  };

  const forgotPass = (e) => {
    dispatch(forgotPassword(e.email));
  };

  return (
    <div>
      <div className="ltn__login-area pb-65">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area text-center">
                <h1 className="section-title">
                  Đăng Nhập <br />
                  Đến Tài Khoản Của Bạn
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="account-login-inner">
                <Form
                  className="ltn__form-box contact-form-box"
                  onFinish={onFinish}
                >
                  {loading && <LoadingBox></LoadingBox>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Định dạng email không hợp lệ",
                      },
                      {
                        required: true,
                        message: "Email không được bỏ trống",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password không được để trống",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder=" Nhập Mật Khẩu"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <div className="btn-wrapper mt-0">
                    <button className="theme-btn-1 btn btn-block" type="submit">
                      ĐĂNG NHẬP
                    </button>
                  </div>
                  <div className="go-to-btn mt-20">
                    <a
                      href="#"
                      title="Forgot Password?"
                      data-bs-toggle="modal"
                      data-bs-target="#ltn_forget_password_modal"
                    >
                      <small>Quên mật khẩu?</small>
                    </a>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="account-create text-center pt-50">
                <h4>CHƯA CÓ TÀI KHOẢN?</h4>
                <p>Bạn có thể đăng ký nhanh bằng cách click vào ô đăng ký</p>
                <div className="btn-wrapper go-top">
                  <Link to="/register" className="theme-btn-1 btn black-btn">
                    ĐĂNG KÝ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__modal-area ltn__add-to-cart-modal-area----">
        <div
          className="modal fade"
          id="ltn_forget_password_modal"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-12">
                        <div className="modal-product-info text-center">
                          <h4>QUÊN MẬT KHẨU?</h4>
                          <p className="added-cart">Nhập email của bạn.</p>
                          {errorForgot && (
                            <MessageBox variant="danger">
                              {errorForgot}
                            </MessageBox>
                          )}
                          {success && (
                            <MessageBox variant="success">
                              Vui Lòng Kiểm Tra Email Của Bạn !!!
                            </MessageBox>
                          )}
                          <Form
                            action="#"
                            className="ltn__form-box"
                            onFinish={forgotPass}
                          >
                            <Form.Item
                              name="email"
                              rules={[
                                {
                                  type: "email",
                                  message: "Định dạng email không hợp lệ",
                                },
                                {
                                  required: true,
                                  message: "Email không được bỏ trống",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Nhập email"
                                // onChange={(e) => setEmail(e.target.value)}
                              />
                            </Form.Item>
                            <div className="btn-wrapper mt-0">
                              <button
                                className="theme-btn-1 btn btn-full-width-2"
                                type="submit"
                              >
                                Ok
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>
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

export default Signin;
