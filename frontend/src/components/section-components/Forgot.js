import React, { useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import {
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Upload,
  message,
  Space,
  Button,
  InputNumber,
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
const { Search } = Input;
function Forgot() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const onFinish = (e) => {
    dispatch(register(name, email, phone, address, password));
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue="+84"
        style={{
          width: 100,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Đăng Ký <br />
                Tài Khoản Của Bạn
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <Form
                action="#"
                className="ltn__form-box contact-form-box"
                onFinish={onFinish}
              >
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}

                <Form.Item
                  name="name"
                  rules={[
                    {
                      whitespace: true,
                      message: "Tên không được nhập khoảng trống",
                    },
                    {
                      required: true,
                      message: "Tên không được bỏ trống",
                    },
                  ]}
                >
                  <Input
                    placeholder=" Nhập vào tên của bạn"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
                {/* <input
                  type="text"
                  id="Name"
                  placeholder=" Nhập vào tên của bạn"
                  required
                  onChange={(e) => setName(e.target.value)}
                ></input> */}
                {/* <input
                  type="email"
                  id="email"
                  placeholder="Nhập email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input> */}
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
                {/* <input
                  type="text"
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                ></input> */}

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      whitespace: true,
                      message: "Số điện thoại không được nhập khoảng trống",
                    },
                    {
                      required: true,
                      message: "Số điện thoại không được bỏ trống",
                    },
                    {
                      max: 9,
                      message: "Số điện thoại vượt quá giới hạn",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    placeholder="Nhập số điện thoại"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>
                {/* <input
                  type="text"
                  id="address"
                  placeholder="Nhập địa chỉ"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></input> */}
                <Form.Item
                  name="address"
                  rules={[
                    {
                      whitespace: true,
                      message: "Địa chỉ không được nhập khoảng trống",
                    },
                    {
                      required: true,
                      message: "Địa chỉ không được bỏ trống",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập địa chỉ"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Item>
                {/* <input
                  type="password"
                  id="password"
                  placeholder=" Nhập mật khẩu"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input> */}
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
                {/* <input
                  type="password"
                  id="confirmPassword"
                  placeholder=" Nhập lại mật khẩu"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input> */}

                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Password không được bỏ trống",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("passwords không giống nhau")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder=" Nhập lại mật khẩu" />
                </Form.Item>
                <label className="checkbox-inline">
                  <input type="checkbox" defaultValue /> &nbsp; Bằng cách nhấp
                  vào "tạo tài khoản", tôi đồng ý với chính sách bảo mật.
                </label>
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                  >
                    TẠO TÀI KHOẢN
                  </button>
                </div>
              </Form>
              <div className="by-agree text-center">
                <div className="go-to-btn mt-50 go-top">
                  <Link to="/login">BẠN ĐÃ CÓ TÀI KHOẢN ?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
