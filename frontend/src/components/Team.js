import React from "react";
import { Link } from "react-router-dom";
import urlImages from "../api/url";

function Team(props) {
  const { sellers } = props;
  console.log(sellers, "test");
  return (
    <div className="ltn__team-area pt-110--- pb-90">
      <div className="container">
        <div className="row justify-content-center go-top">
          {sellers?.map((seller) => (
            <div className="col-lg-4 col-sm-6">
              <div className="ltn__team-item ltn__team-item-3---">
                <div className="team-img">
                  <img
                    src={`${urlImages}${seller?.seller?.logo}`}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="team-info">
                  <h4>
                    <Link to={`/team-details/${seller._id}`}>
                      {seller?.name}
                    </Link>
                  </h4>
                  <h6 className="ltn__secondary-color">Nhân viên</h6>
                  <div className="ltn__social-media">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
