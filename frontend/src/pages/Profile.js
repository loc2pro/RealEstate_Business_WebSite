import { UserOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Card, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import urlImages from "../api/url";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const { Meta } = Card;

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
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
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Cập nhật thông tin thành công
              </MessageBox>
            )}
            <div>
              <Row style={{ marginTop: "50px" }}>
                <Col
                  span={8}
                  style={{ textAlign: "center", marginTop: "50px" }}
                >
                  {user.isSeller ? (
                    // user.seller.logo
                    // src={`${urlImages}${product.image[0]}`}
                    <Avatar
                      size={500}
                      icon={<img src={`${urlImages}${user.seller.logo}`} />}
                    />
                  ) : (
                    <Avatar size={500} icon={<UserOutlined />} />
                  )}
                  <h1
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: "30px",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    {name}
                  </h1>
                </Col>
                <Col span={16}>
                  <Form
                    enctype="multipart/form-data"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div class="form-group" style={{ width: "80%" }}>
                      <h3 class="title_sticky">Tên người dùng</h3>
                      <Form>
                        <Input
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          size="large"
                          style={{
                            width: "100%",
                            fontSize: "30px",
                            fontWeight: "bold",
                          }}
                        />
                      </Form>
                    </div>
                    <div class="form-group" style={{ width: "80%" }}>
                      <h3 class="title_sticky">Email</h3>
                      <Form>
                        <Input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          size="large"
                          style={{
                            width: "100%",
                            fontSize: "30px",
                            fontWeight: "bold",
                          }}
                        />
                      </Form>
                    </div>
                    <div class="form-group" style={{ width: "80%" }}>
                      <h3 class="title_sticky">Số điện thoại</h3>
                      <Form>
                        <Input
                          type="number"
                          name="phone"
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          size="large"
                          placeholder="09xxxxxxxx"
                          style={{
                            width: "100%",
                            fontSize: "30px",
                            fontWeight: "bold",
                          }}
                        />
                      </Form>
                    </div>
                    <div class="form-group" style={{ width: "80%" }}>
                      <h3 class="title_sticky">Địa chỉ</h3>
                      <Form>
                        <Input
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                          size="large"
                          placeholder="Địa chỉ"
                          style={{
                            width: "100%",
                            fontSize: "30px",
                            fontWeight: "bold",
                          }}
                        />
                      </Form>
                    </div>
                    <div class="form-group" style={{ width: "80%" }}>
                      <h3 class="title_sticky">Mật khẩu</h3>
                      <Form>
                        <Input
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          size="large"
                          placeholder="********"
                          style={{
                            width: "100%",
                            fontSize: "30px",
                            fontWeight: "bold",
                          }}
                        />
                      </Form>
                    </div>
                    <div class="form-group" style={{ width: "80%" }}>
                      <h3 class="title_sticky">Nhập lại mật khẩu</h3>
                      <Form>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          size="large"
                          placeholder="*********"
                          style={{
                            width: "100%",
                            fontSize: "30px",
                            fontWeight: "bold",
                          }}
                        />
                      </Form>
                    </div>
                  </Form>{" "}
                </Col>
              </Row>
            </div>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <button
                className="primary"
                type="submit"
                style={{ width: "200px", fontWeight: "bold", fontSize: "20px" }}
              >
                Cập nhật
              </button>
            </Row>
          </>
        )}
      </form>
    </div>
  );
}
