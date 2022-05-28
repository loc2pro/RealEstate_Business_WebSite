import { Button, Input, message, Select, Slider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from "react-router-dom";
import { listProductss } from "../actions/productActions";
import Menu from "../components/global-components/Menu";
import Page_header from "../components/global-components/page-header";
import NotFind from "../components/Layout/NotFind";
import SearchBox from "../components/SearchBox";
import SearchProduct from "../components/SearchProduct";
import SearchProductList from "../components/SearchProductList";
import { prices } from "../utils";

function ShopSideBarScreen(props) {
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

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
    status = "all",
    direction = "all",
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
        status: status !== "all" ? status : "",
        direction: direction !== "all" ? direction : "",
        min,
        max,
        order,
      })
    );
  }, [
    dispatch,
    type,
    max,
    min,
    name,
    order,
    pageNumber,
    city,
    district,
    ward,
    status,
    direction,
  ]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterType = filter.type || type;
    const filterStatus = filter.status || status;
    const filterDirection = filter.direction || direction;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    return `/search/type/${filterType}/status/${filterStatus}/name/${filterName}/direction/${filterDirection}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  const handleResetAddress = () => {
    setCity("");
    setDistrict("");
    setWard("");
  };

  return (
    <div>
      <Menu />
      <Page_header headertitle="Nhà Đất Bán" />
      <div>
        <div className="ltn__product-area ltn__product-gutter">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 order-lg-2 mb-100">
                <div className="ltn__shop-options">
                  <ul className="justify-content-start">
                    <li>
                      <div className="ltn__grid-list-tab-menu ">
                        <div className="nav">
                          <a
                            className="active show"
                            data-bs-toggle="tab"
                            href="#liton_product_grid"
                          >
                            <i className="fas fa-th-large" />
                          </a>
                          <a data-bs-toggle="tab" href="#liton_product_list">
                            <i className="fas fa-list" />
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="short-by text-center">
                        <select
                          className="nice-select"
                          value={status}
                          onChange={(e) => {
                            props.history.push(
                              getFilterUrl({
                                status: e.target.value,

                                page: 1,
                              })
                            );
                          }}
                        >
                          <option value="all">Thể loại</option>
                          <option value="Bán">Bán</option>
                          <option value="Cho thuê">Cho thuê</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <div className="short-by text-center">
                        <select
                          className="nice-select"
                          value={direction}
                          onChange={(e) => {
                            props.history.push(
                              getFilterUrl({
                                direction: e.target.value,
                                page: 1,
                              })
                            );
                          }}
                        >
                          <option value="all">Hướng</option>
                          <option value="Đông">Đông</option>
                          <option value="Tây">Tây</option>
                          <option value="Nam">Nam </option>
                          <option value="Bắc">Bắc </option>
                          <option value="Đông Bắc">Đông Bắc </option>
                          <option value="Đông Nam">Đông Nam </option>
                          <option value="Tây Nam ">Tây Nam </option>
                          <option value="Tây Bắc">Tây Bắc </option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <div className="short-by text-center">
                        <select
                          className="nice-select"
                          value={order}
                          onChange={(e) => {
                            props.history.push(
                              getFilterUrl({ order: e.target.value, page: 1 })
                            );
                          }}
                        >
                          <option value="newest">Mới nhất</option>
                          <option value="lowest">Giá: Thấp tới cao</option>
                          <option value="highest">Giá: Cao tới thấp</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  {/* grid */}
                  <div
                    className="tab-pane fade active show"
                    id="liton_product_grid"
                  >
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                      <div className="row">
                        <div className="col-lg-12">
                          {/* Search Widget */}
                          <Route
                            render={({ history }) => (
                              <SearchBox history={history}></SearchBox>
                            )}
                          ></Route>
                        </div>
                        {/* ltn__product-item */}
                        {products?.map((product) => (
                          <SearchProduct
                            key={product._id}
                            product={product}
                          ></SearchProduct>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* List */}
                  <div className="tab-pane fade" id="liton_product_list">
                    <div className="ltn__product-tab-content-inner ltn__product-list-view">
                      <div className="row">
                        <div className="col-lg-12">
                          {/* Search Widget */}
                          <Route
                            render={({ history }) => (
                              <SearchBox history={history}></SearchBox>
                            )}
                          ></Route>
                        </div>
                        {/* ltn__product-item */}

                        {products?.map((product) => (
                          <SearchProductList product={product} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {products?.length === 0 && <NotFind />}
                </div>
                <div className="ltn__pagination-area text-center">
                  <div className="ltn__pagination">
                    <ul>
                      {[...Array(pages).keys()].map((x) => (
                        <li>
                          <Link
                            className={x + 1 === page ? "active" : ""}
                            key={x + 1}
                            to={getFilterUrl({ page: x + 1 })}
                          >
                            {x + 1}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* sidebar */}
              <div className="col-lg-4  mb-100">
                <aside className="sidebar ltn__shop-sidebar">
                  <h3 className="mb-10">Tìm Kiếm Nâng Cao</h3>
                  <label className="mb-30">
                    <h7> Kết quả: {products?.length} </h7>
                    <br />
                    <div>
                      <h6>
                        Tìm kiếm: {type} / {status} / {direction}
                      </h6>
                    </div>
                  </label>
                  {/* Advance Information widget */}
                  <div className="widget ltn__menu-widget">
                    <h4 className="ltn__widget-title">Loại sản phẩm</h4>
                    <ul>
                      <Link
                        className={"all" === type ? "active" : ""}
                        to={getFilterUrl({ type: "all", page: 1 })}
                      >
                        <li>
                          <label className="checkbox-item">
                            <span
                              style={{ float: "left", marginRight: "2rem" }}
                            >
                              <i class="fas fa-angle-double-right"></i>
                            </span>
                            Tất Cả
                          </label>
                        </li>
                      </Link>
                      {categories?.map((c) => (
                        <Link
                          className={c === type ? "active" : ""}
                          to={getFilterUrl({ type: c, page: 1 })}
                        >
                          <li key={c}>
                            <label className="checkbox-item">
                              <span
                                style={{ float: "left", marginRight: "2rem" }}
                              >
                                <i class="fas fa-angle-double-right"></i>
                              </span>
                              {c}
                            </label>
                          </li>
                        </Link>
                      ))}
                    </ul>
                    <hr />
                    <h4 className="ltn__widget-title">Giá</h4>
                    <ul>
                      {prices?.map((p) => (
                        <Link
                          to={getFilterUrl({ min: p.min, max: p.max, page: 1 })}
                          className={
                            `${p.min}-${p.max}` === `${min}-${max}`
                              ? "active"
                              : ""
                          }
                        >
                          <li key={p}>
                            <label className="checkbox-item">
                              <span
                                style={{ float: "left", marginRight: "2rem" }}
                              >
                                <i class="fas fa-angle-double-right"></i>
                              </span>
                              {p.name}
                            </label>
                          </li>
                        </Link>
                      ))}
                    </ul>
                    <hr />
                    <div className="ltn__faq-inner ltn__faq-inner-2">
                      <div id="accordion_2">
                        <div className="card" style={{ background: "white" }}>
                          <h6
                            className="collapsed ltn__card-title"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq-item-2-1"
                            aria-expanded="false"
                          >
                            Mở Rộng
                          </h6>
                          <div
                            id="faq-item-2-1"
                            className="collapse"
                            data-bs-parent="#accordion_2"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <Button
                                    type="primary"
                                    block
                                    onClick={(e) => handleResetAddress()}
                                  >
                                    Tất cả
                                  </Button>
                                  <h6 style={{ marginTop: "1rem" }}>
                                    <i class="fas fa-angle-double-right"></i>{" "}
                                    Chọn tỉnh/ thành phố
                                  </h6>
                                  <Select
                                    showSearch
                                    style={{
                                      width: "100%",
                                    }}
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
                                        .localeCompare(
                                          optionB.label.toLowerCase()
                                        )
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
                                  <h6 style={{ marginTop: "1rem" }}>
                                    <i class="fas fa-angle-double-right"></i>{" "}
                                    Chọn quận/ huyện
                                  </h6>
                                  <Select
                                    showSearch
                                    style={{
                                      width: "100%",
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
                                        .localeCompare(
                                          optionB.label.toLowerCase()
                                        )
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
                                  <h6 style={{ marginTop: "1rem" }}>
                                    <i class="fas fa-angle-double-right"></i>{" "}
                                    Chọn phường/ xã{" "}
                                  </h6>
                                  <Select
                                    showSearch
                                    style={{
                                      width: "100%",
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
                                        .localeCompare(
                                          optionB.label.toLowerCase()
                                        )
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
                                      width: "100%",
                                      marginTop: "1rem ",
                                    }}
                                    placeholder="Địa chỉ nhà nhận được"
                                    value={`${ward ? ward + " ," : ""}${
                                      district ? district + " ," : ""
                                    }${city}`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopSideBarScreen;
