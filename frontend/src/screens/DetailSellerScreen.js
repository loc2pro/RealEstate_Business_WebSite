import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailSeller } from "../actions/userActions";
import DetailSeller from "../components/DetailSeller";
import Footer from "../components/global-components/footer";
import Menu from "../components/global-components/Menu";
import Page_header from "../components/global-components/page-header";
// sellerDetails
function DetailSellerScreen(props) {
  const dispatch = useDispatch();
  const sellerId = props.match.params.id;
  const sellerDetails = useSelector((state) => state.sellerDetails);
  const { loading, error, user } = sellerDetails;

  useEffect(() => {
    dispatch(detailSeller(sellerId));
    console.log(sellerId);
  }, [dispatch, sellerId]);
  return (
    <div>
      <Menu />
      <Page_header headertitle="Thông tin nhân viên" />
      <DetailSeller seller={user} />
      <Footer />
    </div>
  );
}

export default DetailSellerScreen;
