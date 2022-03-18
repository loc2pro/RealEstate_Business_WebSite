import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from "react-router-dom";
import { listProductss } from "../actions/productActions";
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
          <h3>{products.length} Kết Quả:</h3>
        )}
        <div>
          <span style={{ fontSize: "25px", color: "red" }}>
            Tìm kiếm theo:
          </span>
          <select
            style={{
              height: "40px",
              width: "300px",
              fontSize: "25px",
              float: "right",
            }}
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Mới nhất</option>
            <option value="lowest">Giá: Thấp tới cao</option>
            <option value="highest">Giá: Cao tới thấp</option>
            {/* <option value="toprated">Avg. Customer Reviews</option> */}
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-2">
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
          <h1 style={{ color: "red" }}>Danh Mục</h1>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul style={{ fontSize: "25px", marginLeft: "20px" }}>
                <li>
                  <Link
                    className={"all" === type ? "active" : ""}
                    to={getFilterUrl({ type: "all" })}
                  >
                    Tất Cả
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === type ? "active" : ""}
                      to={getFilterUrl({ type: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h1 style={{ color: "red" }}>Sắp Xếp theo giá</h1>
            <ul style={{ fontSize: "25px", marginLeft: "20px" }}>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-10">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>Không tìm thấy sản phẩm</MessageBox>
              )}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
