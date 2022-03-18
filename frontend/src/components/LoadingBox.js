import React from "react";
import styled from "@emotion/styled";
import { Spin } from "antd";
export default function LoadingBox() {
  return (
    <Loading>
      <Spin tip="Loading..." size="large" />
    </Loading>
  );
}
const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
