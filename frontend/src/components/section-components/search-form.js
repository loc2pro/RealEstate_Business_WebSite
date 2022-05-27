import { Button, Input, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProductss } from "../../actions/productActions";
import { prices } from "../../utils";

function SearchForm(props) {
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
  ]);

  const getFilterUrl = (filter) => {
    const filterAddress = city || city;
    const filterPage = filter.page || pageNumber;
    const filterType = filter.type || type;
    const filterStatus = filter.status || status;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    console.log(filter, "type");
    return `/search/type/${filterType}/status/${filterStatus}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  const handleResetAddress = () => {
    setCity("");
    setDistrict("");
    setWard("");
  };
  return (
    <div className="ltn__car-dealer-form-area mt--65 mt-120 pb-115---">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__car-dealer-form-tab">
              <div className="ltn__tab-menu  text-uppercase text-center">
                <div className="nav">
                  <a
                    className="active show"
                    data-bs-toggle="tab"
                    href="#ltn__form_tab_1_1"
                  >
                    <i className="fas fa-home" />
                    Nhà
                  </a>
                  <a data-bs-toggle="tab" href="#ltn__form_tab_1_2">
                    <i className="fas fa-home" />
                    Đất
                  </a>
                </div>
              </div>
              <div className="tab-content bg-white box-shadow-1 position-relative pb-10">
                <div
                  className="tab-pane fade active show"
                  id="ltn__form_tab_1_1"
                >
                  <div className="car-dealer-form-inner">
                    <form action="#" className="ltn__car-dealer-form-box row">
                      <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-car---- col-lg-3 col-md-6">
                        <select className="nice-select">
                          <option>Loại sản phẩm</option>
                          {categories?.map((c) => (
                            <option value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-meter---- col-lg-3 col-md-6">
                        <select
                          className="nice-select"
                          value={status}
                          onChange={(e) => {
                            getFilterUrl({ status: e.target.value });
                          }}
                        >
                          <option value="all">Thể loại</option>
                          <option value="Bán">Bán</option>
                          <option value="Cho Thuê">Cho thuê</option>
                        </select>
                      </div>
                      <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-calendar---- col-lg-3 col-md-6">
                        <select
                          className="nice-select"
                          value={status}
                          onChange={(e) => {}}
                        >
                          {prices?.map((p) => (
                            <option>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                        <div className="btn-wrapper text-center mt-0 go-top">
                          {/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
                          <Link
                            to="/shop"
                            className="btn theme-btn-1 btn-effect-1 text-uppercase"
                          >
                            Tìm Ngay
                          </Link>
                        </div>
                      </div>
                      {/* Mở Rộng */}
                      <div className="ltn__faq-inner ltn__faq-inner-2">
                        <div id="accordion_2">
                          <div
                            className="card"
                            style={{ background: "white", width: "100%" }}
                          >
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
                    </form>
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

export default SearchForm;
