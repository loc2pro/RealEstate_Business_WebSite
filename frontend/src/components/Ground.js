import React from "react";
import url from "../api/url";
export default function Ground(props) {
  const { ground } = props;

  return (
    <div>
      <figure className="all">
        <div class="box-container">
          <div class="box" key={ground._id}>
            <div class="image-container">
              <img src={`${url}${ground.image}`} alt={ground.name} />
            </div>
            <figcaption>
              <h2>
                Bất Động Sản <span>Phát Lộc</span>
              </h2>
              <p>{ground.name}</p>
              <a href={`/ground/${ground._id}`}></a>
            </figcaption>
          </div>
        </div>
      </figure>
    </div>
  );
}
