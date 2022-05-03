import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from "react-router-dom";
import { listProductss } from "../actions/productActions";
import NotFind from "../components/Layout/NotFind";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SearchBox from "../components/SearchBox";
import SearchProduct from "../components/SearchProduct";
import { prices } from "../utils";

export default function SearchScreen(props) {
  const {
    name = "all",
    type = "all",
    min = 0,
    max = 0,
    order = "newest",
    pageNumber = 1,
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
        pageNumber,
        name: name !== "all" ? name : "",
        type: type !== "all" ? type : "",
        min,
        max,
        order,
      })
    );
  }, [type, dispatch, max, min, name, order, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterType = filter.type || type;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/type/${filterType}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
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
                            Kết Quả: {products.length}
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
