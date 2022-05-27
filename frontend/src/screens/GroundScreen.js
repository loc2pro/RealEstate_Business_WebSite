import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useHistory, useParams } from "react-router-dom";
import { listGroundss } from "../actions/groundActions";
import Ground from "../components/Ground";
import NotFind from "../components/Layout/NotFind";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SearchBox from "../components/SearchBox";
import SearchGroundBox from "../components/SearchGroundBox";
import axios from "axios";
import { Select, Input, Row, message, Button } from "antd";
import { prices } from "../utils";
const { Option } = Select;

export default function GroundScreen(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const listGround = useSelector((state) => state.listGround);
  const { loading, error, grounds, page, pages } = listGround;

  const groundCategoryList = useSelector((state) => state.groundCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = groundCategoryList;
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  // const [address, setAddress] = useState("");
  function GetCitys() {
    axios
      .get("https://provinces.open-api.vn/api/")
      .then((res) => {
        setCitys(res.data);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  function GetDistricts(code) {
    axios
      .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((res) => {
        setDistricts(res.data.districts);
        setCity(res.data.name);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  function GetWards(code) {
    axios
      .get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then((res) => {
        setWards(res.data.wards);
        setDistrict(res.data.name);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  useEffect(() => {
    GetCitys();
  }, []);
  const {
    name = "all",
    type = "all",
    min = 0,
    max = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();

  useEffect(() => {
    dispatch(
      listGroundss({
        city: city,
        district: district,
        ward: ward,
        pageNumber,
        name: name !== "all" ? name : "",
        type: type !== "all" ? type : "",
        min,
        max,
        order,
      })
    );
  }, [type, dispatch, max, min, name, order, pageNumber, city, district, ward]);

  
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterType = filter.type || type;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    return `/searchground/type/${filterType}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  const handleResetAddress = () => {
    setCity("");
    setDistrict("");
    setWard("");
  };
  return (
    <div>
      <div className="row" style={{ marginTop: "10rem" }}>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div style={{ width: "100%" }}>
            <h1
              class="heading"
              style={{ fontSize: "3rem", paddingBottom: "1rem" }}
            >
              <span>Bất Động Sản</span> Nhà Ở/ Chung Cư
            </h1>
            <div>
              <div className="row top" style={{ width: "100%" }}>
                <div
                  className="col-2"
                  style={{
                    backgroundColor: "#eee6ff",
                    height: "1000px",
                    overflowY: "scroll",
                  }}
                >
                  <div className="row" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <div className="container">
                        <h2
                          style={{
                            color: "red",
                            borderBottom: "2px solid black",
                            textAlign: "center",
                          }}
                        >
                          Danh Mục
                        </h2>
                        {loadingCategories ? (
                          <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                          <MessageBox variant="danger">
                            {errorCategories}
                          </MessageBox>
                        ) : (
                          <ul style={{ fontSize: "25px", marginLeft: "20px" }}>
                            <Link
                              className={"all" === type ? "active" : ""}
                              to={getFilterUrl({ type: "all" })}
                            >
                              <li>
                                <span>
                                  <i class="fas fa-border-all"></i>
                                </span>
                                Tất Cả
                              </li>
                            </Link>
                            {categories.map((c) => (
                              <Link
                                className={c === type ? "active" : ""}
                                to={getFilterUrl({ type: c })}
                              >
                                <li key={c}>
                                  <span>
                                    <i class="fas fa-angle-double-right"></i>
                                  </span>

                                  {c}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "4rem" }}>
                    <div className="container" style={{ width: "100%" }}>
                      <h2
                        style={{
                          color: "red",
                          borderBottom: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Tìm kiếm theo giá
                      </h2>
                      <ul style={{ fontSize: "25px", marginLeft: "20px" }}>
                        {prices.map((p) => (
                          <Link
                            to={getFilterUrl({ min: p.min, max: p.max })}
                            className={
                              `${p.min}-${p.max}` === `${min}-${max}`
                                ? "active"
                                : ""
                            }
                          >
                            <li key={p.name}>
                              <span>
                                <i class="fas fa-angle-double-right"></i>
                              </span>
                              {p.name}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "4rem" }}>
                    <div className="container" style={{ width: "100%" }}>
                      <h2
                        style={{
                          color: "red",
                          borderBottom: "2px solid black",
                          textAlign: "center",
                        }}
                      >
                        Tìm kiếm theo địa chỉ
                      </h2>
                      <ul style={{ fontSize: "25px", marginLeft: "20px" }}>
                        <Row
                          style={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="primary"
                            block
                            onClick={(e) => handleResetAddress()}
                          >
                            Tất cả
                          </Button>
                          <span style={{ fontSize: "15px", marginTop: "2rem" }}>
                            --- Chọn tỉnh/ thành phố ---
                          </span>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Chọn tỉnh/ thành phố"
                            value={city}
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                              optionA.label
                                .toLowerCase()
                                .localeCompare(optionB.label.toLowerCase())
                            }
                            options={
                              citys &&
                              citys.map((value) => {
                                return {
                                  key: value.name,
                                  label: value.name,
                                  value: value.code,
                                };
                              })
                            }
                            onChange={(value) => {
                              GetDistricts(value);
                            }}
                          />
                          <span style={{ fontSize: "15px", marginTop: "2rem" }}>
                            --- Chọn quận/ huyện ---
                          </span>

                          <Select
                            showSearch
                            style={{
                              width: 240,
                            }}
                            placeholder="Chọn quận/ huyện"
                            value={district}
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                              optionA.label
                                .toLowerCase()
                                .localeCompare(optionB.label.toLowerCase())
                            }
                            options={
                              districts &&
                              districts.map((value) => {
                                return {
                                  key: value.name,
                                  label: value.name,
                                  value: value.code,
                                };
                              })
                            }
                            onChange={(value) => GetWards(value)}
                          />
                          <span style={{ fontSize: "15px", marginTop: "2rem" }}>
                            --- Chọn phường/ xã ---
                          </span>
                          <Select
                            showSearch
                            style={{
                              width: 240,
                            }}
                            placeholder="Chọn phường/ xã"
                            value={ward}
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                              optionA.label
                                .toLowerCase()
                                .localeCompare(optionB.label.toLowerCase())
                            }
                            options={
                              wards &&
                              wards.map((value) => {
                                return {
                                  key: value.name,
                                  label: value.name,
                                  value: value.name,
                                };
                              })
                            }
                            onChange={(value) => setWard(value)}
                          />
                          <Input
                            size="large"
                            style={{
                              width: 240,
                              marginTop: "2rem ",
                            }}
                            placeholder="Địa chỉ nhà nhận được"
                            value={`${ward ? ward + " ," : ""}${
                              district ? district + " ," : ""
                            }${city}`}
                          />
                        </Row>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="col-10"
                  style={{
                    overflowY: "scroll",
                    height: "1000px",
                    backgroundColor: "#F8F8FF",
                  }}
                >
                  {loading ? (
                    <LoadingBox></LoadingBox>
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <>
                      <div
                        className="row"
                        style={{
                          width: "100%",
                          backgroundColor: "#2a2f35",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                          height: "60px",
                        }}
                      >
                        <div className="col-1" style={{ padding: "1rem" }}>
                          <span style={{ color: "white" }}>
                            Kết Quả: {grounds.length}
                          </span>
                        </div>
                        <div className="col-7">
                          <Route
                            render={({ history }) => (
                              <SearchGroundBox
                                history={history}
                              ></SearchGroundBox>
                            )}
                          ></Route>
                        </div>
                        <div className="col-4">
                          <span style={{ fontSize: "20px", color: "red" }}>
                            Tìm theo:
                          </span>
                          <select
                            style={{
                              height: "30px",
                              width: "220px",
                              fontSize: "20px",
                              marginRight: "2rem",
                              border: "solid 1px gray",
                              margin: "2rem",
                            }}
                            value={order}
                            onChange={(e) => {
                              props.history.push(
                                getFilterUrl({ order: e.target.value })
                              );
                            }}
                          >
                            <option value="newest">Mới nhất</option>
                            <option value="lowest">Giá: Thấp tới cao</option>
                            <option value="highest">Giá: Cao tới thấp</option>
                          </select>
                        </div>
                      </div>
                      <div className="row center">
                        {grounds.map((ground) => (
                          <Ground key={ground._id} product={ground}></Ground>
                        ))}
                      </div>
                      <div className="row center pagination">
                        {[...Array(pages).keys()].map((x) => (
                          <Link
                            className={x + 1 === page ? "active" : ""}
                            key={x + 1}
                            to={getFilterUrl({ page: x + 1 })}
                          >
                            {x + 1}
                          </Link>
                        ))}
                      </div>
                      {grounds.length === 0 && <NotFind />}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
