import React from "react";

export default function Search() {
  return (
    <div>
      <section class="home" id="home">
        <form action="">
          <h3>Tìm Ngôi Nhà Hoàn Hảo Của Bạn</h3>

          <div class="buttons-container">
            <a href="/service" class="btn">
              Nhà ở/ Chung cơ
            </a>
            <a href="/ground" class="btn">
              Đất nền
            </a>
          </div>
          <a href="#featured" className="btn">
            Tìm kiếm
          </a>
        </form>
      </section>
    </div>
  );
}
