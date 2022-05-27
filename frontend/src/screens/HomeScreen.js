import React from "react";
import Footer from "../components/global-components/footer";
import Menu from "../components/global-components/Menu";
import ProductHome from "../components/ProductHome";
import Aboutv1 from "../components/section-components/about-v1";
import Banner from "../components/section-components/banner";
import CallToActionV1 from "../components/section-components/call-to-action-v1";
import Counter from "../components/section-components/counter-v1";
import Featuresv1 from "../components/section-components/features-v1";
import Testimonial from "../components/section-components/testimonial-v1";
export default function HomeScreen() {
  return (
    <div>
      <Menu />
      <Banner />
      <Aboutv1 />
      <Counter />
      <Featuresv1 customClass="ltn__feature-area section-bg-1 pt-120 pb-90 mb-120---" />
      <ProductHome />
      <Testimonial />
      <CallToActionV1 />
      <Footer />
    </div>
  );
}
