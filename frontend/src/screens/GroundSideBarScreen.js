import { Button, Input, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useHistory, useParams } from "react-router-dom";
import { listProductss } from "../actions/productActions";
import SearchBox from "../components/SearchBox";
import SearchProduct from "../components/SearchProduct";
import { prices } from "../utils";
import NotFind from "../components/Layout/NotFind";
import SearchGroundList from "../components/SearchGroundList";
import Menu from "../components/global-components/Menu";
import Page_header from "../components/global-components/page-header";
import ShopSideBar from "../components/ShopSideBar";
import { listGroundss } from "../actions/groundActions";
import Ground from "../components/Ground";
import SearchGroundBox from "../components/SearchGroundBox";
import SearchGround from "../components/SearchGround";

function GroundSideBarScreen(props) {
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
    status = "all",
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
        status: status !== "all" ? status : "",
        type: type !== "all" ? type : "",
        min,
        max,
        order,
      })
    );
  }, [
    type,
    dispatch,
    max,
    min,
    name,
    order,
    pageNumber,
    city,
    district,
    ward,
    status,
  ]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterType = filter.type || type;
    const filterStatus = filter.status || status;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    return `/searchground/type/${filterType}/status/${filterStatus}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
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
                              getFilterUrl({ status: e.target.value })
                            );
                          }}
                        >
                          <option value="all">Thể loại</option>
                          <option value="Bán">Bán</option>
                          <option value="Cho Thuê">Cho thuê</option>
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
                              getFilterUrl({ order: e.target.value })
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
                              <SearchGroundBox
                                history={history}
                              ></SearchGroundBox>
                            )}
                          ></Route>
                        </div>
                        {/* ltn__product-item */}
                        {grounds?.map((ground) => (
                          <SearchGround
                            key={ground._id}
                            ground={ground}
                          ></SearchGround>
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
                              <SearchGroundBox
                                history={history}
                              ></SearchGroundBox>
                            )}
                          ></Route>
                        </div>
                        {/* ltn__product-item */}

                        {grounds?.map((ground) => (
                          <SearchGroundList ground={ground} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {grounds?.length === 0 && <NotFind />}
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
                    <small> Kết quả: {grounds?.length} </small>
                    <div>
                      <h6>
                        Tìm kiếm: {type} / {status}
                      </h6>
                    </div>
                  </label>
                  {/* Advance Information widget */}
                  <div className="widget ltn__menu-widget">
                    <h4 className="ltn__widget-title">Loại sản phẩm</h4>
                    <ul>
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
                      {categories?.map((c) => (
                        <Link
                          className={c === type ? "active" : ""}
                          to={getFilterUrl({ type: c })}
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
                          to={getFilterUrl({ min: p.min, max: p.max })}
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

export default GroundSideBarScreen;
