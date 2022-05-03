import React from "react";
import { Result, Button } from "antd";
function NotFind() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi. không có sản phẩm cần tìm"
      extra={
        <Button type="danger" href="/">
          Trang Chủ
        </Button>
      }
      style={{marginTop:"10rem"}}
    />
  );
}

export default NotFind;
