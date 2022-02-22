import React from "react";

export default function Search() {
  return (
    <div>
      <section class="home" id="home">
        <form action="">
          <h3>Tìm Ngôi Nhà Hoàn Hảo Của Bạn</h3>

          <div class="buttons-container">
            <a href="#" class="btn">
              Cho Thuê
            </a>
            <a href="#" class="btn">
              Để Bán
            </a>
          </div>

          <div class="inputBox">
            <input type="search" name="" placeholder="Nhà" id="" />
            <input type="search" name="" placeholder="Thành Phố" id="" />
            <select name="" id="">
              <option value="" disabled hidden selected>
                Giá Thấp Nhất
              </option>
              <option value="$5000">$5000</option>
              <option value="$10000">$10000</option>
              <option value="$15000">$15000</option>
              <option value="$20000">$20000</option>
              <option value="$25000">$25000</option>
            </select>
            <select name="" id="">
              <option value="" disabled hidden selected>
                Giá Cao Nhất
              </option>
              <option value="$30000">$30000</option>
              <option value="$35000">$35000</option>
              <option value="$40000">$40000</option>
              <option value="$45000">$45000</option>
              <option value="$50000">$50000</option>
            </select>
            <select name="" id="">
              <option value="" disabled hidden selected>
               Tình Trạng Tài Sản
              </option>
              <option value="Ready To Move">Ready To Move</option>
              <option value="under construction">under construction</option>
              <option value="furnished">furnished</option>
              <option value="semi-furnished">semi-furnished</option>
              <option value="unfurnished">unfurnished</option>
            </select>
            <select name="" id="">
              <option value="" disabled hidden selected>
                Loại Tài Sản
              </option>
              <option value="flat">flat</option>
              <option value="house">house</option>
              <option value="shop">shop</option>
              <option value="warehouse">warehouse</option>
              <option value="land">land</option>
            </select>
          </div>

          <input type="submit" value="Tìm Kiếm" class="btn" />
        </form>
      </section>
    </div>
  );
}
