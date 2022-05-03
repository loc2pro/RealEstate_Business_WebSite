import React from "react";
import urlImages from "../../api/url";

export default function Employee(props) {
  const sellers = props;
  console.log(sellers, "sellers");
  return (
    <div>
      <section class="agents" id="employee">
        <h1 class="heading">
          Đội Ngủ <span>Nhân Viên</span>{" "}
        </h1>
        <div class="box-container">
          {sellers &&
            sellers?.sellers?.map((item) => (
              <div class="box">
                <a href="#" class="fas fa-envelope"></a>
                <a href="#" class="fas fa-phone"></a>
                <img src={`${urlImages}${item.seller.logo}`} alt={item.name} />
                <h3>{item.name}</h3>
                <div class="share">
                  <a href="#" class="fab fa-facebook-f"></a>
                  <a href="#" class="fab fa-twitter"></a>
                  <a href="#" class="fab fa-instagram"></a>
                  <a href="#" class="fab fa-linkedin"></a>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
