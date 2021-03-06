import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from "react-router-dom";
import { listProductss } from "../actions/productActions";
import NotFind from "../components/Layout/NotFind";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SearchBox from "../components/SearchBox";
import SearchProduct from "../components/SearchProduct";
import { prices } from "../utils";
import axios from "axios";
import { Select, Input, Row, message, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function SearchScreen(props) {
  console.log(props.history,"adad");
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
    City = "all",
    District = "all",
    Ward = "all",
  } = useParams();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  const { loading, error, products, page, pages } = list;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listProductss({
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
    const filterAddress = city || city;
    const filterPage = filter.page || pageNumber;
    const filterType = filter.type || type;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    console.log(filterAddress);

    return `/search/type/${filterType}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
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
              <span>B???t ?????ng S???n</span> Nh?? ???/ Chung C??
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
                          Danh M???c
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
                                T???t C???
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
                        T??m ki???m theo gi??
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
                        T??m ki???m theo ?????a ch???
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
                            T???t c???
                          </Button>
                          <span style={{ fontSize: "15px", marginTop: "2rem" }}>
                            --- Ch???n t???nh/ th??nh ph??? ---
                          </span>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Ch???n t???nh/ th??nh ph???"
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
                            --- Ch???n qu???n/ huy???n ---
                          </span>

                          <Select
                            showSearch
                            style={{
                              width: 240,
                            }}
                            placeholder="Ch???n qu???n/ huy???n"
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
                            --- Ch???n ph?????ng/ x?? ---
                          </span>
                          <Select
                            showSearch
                            style={{
                              width: 240,
                            }}
                            placeholder="Ch???n ph?????ng/ x??"
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
                            placeholder="?????a ch??? nh?? nh???n ???????c"
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
                            K???t Qu???: {products.length}
                          </span>
                        </div>
                        <div className="col-7">
                          <Route
                            render={({ history }) => (
                              <SearchBox history={history}></SearchBox>
                            )}
                          ></Route>
                        </div>
                        <div className="col-4">
                          <span style={{ fontSize: "20px", color: "red" }}>
                            T??m theo:
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
                            <option value="newest">M???i nh???t</option>
                            <option value="lowest">Gi??: Th???p t???i cao</option>
                            <option value="highest">Gi??: Cao t???i th???p</option>
                          </select>
                        </div>
                      </div>
                      <div className="row center">
                        {products.map((product) => (
                          <SearchProduct
                            key={product._id}
                            product={product}
                          ></SearchProduct>
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
                      {products.length === 0 && <NotFind />}
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
