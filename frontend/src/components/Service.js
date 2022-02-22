import React from "react";

export default function Service(props) {
  const { product } = props;

  return (
    <div>
      <figure className="all">
        <div class="box-container">
          <div class="box" key={product._id}>
            <div class="image-container">
              <img src={product.image} alt={product.name} />
            </div>
            <figcaption>
              <h2>
                Bất Động Sản <span>Phát Lộc</span>
              </h2>
              <p>{product.name}</p>
              <a href={`/product/${product._id}`}></a>
            </figcaption>
          </div>
        </div>
      </figure>
    </div>
  );
}
