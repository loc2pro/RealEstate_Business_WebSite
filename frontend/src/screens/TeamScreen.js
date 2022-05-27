import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSellers } from "../actions/userActions";
import Menu from "../components/global-components/Menu";
import PageHeader from "../components/global-components/page-header";
import Team from "../components/Team";

function TeamScreen() {
  const dispatch = useDispatch();
  const listSeller = useSelector((state) => state.listSeller);
  const { loading: loadingSeller, error: errorSeller, sellers } = listSeller;
  useEffect(() => {
    dispatch(listSellers());
  }, [dispatch]);
  return (
    <div>
      <Menu />
      <PageHeader headertitle="Thông TIn Nhân Viên" subheader="Nhân viên" />
      <Team sellers={sellers} />
    </div>
  );
}

export default TeamScreen;
