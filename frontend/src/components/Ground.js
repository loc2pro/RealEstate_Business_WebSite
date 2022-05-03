import React from "react";
import url from "../api/url";
export default function Ground(props) {
  const { ground } = props;

  return (
    <div>
      {ground?.browse && ground?.countInStock > 0 && (
        <div style={{ width: "98%" }}>
          <figure className="all">
            <div class="box-container">
              <div class="box" key={ground._id}>
                <div class="image-container">
                  <img src={`${url}${ground.image[0]}`} alt={ground.name} />
                </div>
                <figcaption>
                  <h2>
                    Bất Động Sản <span style={{ color: "blue" }}>Phát Lộc</span>
                  </h2>
                  <p
                    style={{
                      color: "red",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    {ground.name}
                  </p>
                  <p
                    style={{
                      color: "red",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    <i class="fas fa-map-marker-alt"></i> {ground.address},{" "}
                    {ground.ward}, {ground.district}, {ground.city}
                  </p>
                  <p
                    style={{
                      color: "red",
                      fontSize: "30px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                  >
                    Giá:{" "}
                    {ground.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <a href={`/groundDetails/${ground._id}`}></a>
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
      )}
    </div>
  );
}
