import React from "react";
import Menu from "../components/global-components/Menu";
import Contact from "../components/Contact";
import PageHeader from "../components/global-components/page-header";
import ContactForm from "../components/section-components/contact-form";
import Map from "../components/section-components/map";

function ContactScreen() {
  return (
    <div>
      <Menu />
      <PageHeader headertitle="Thông Tin Liên Hệ" subheader="Liên Hệ" />
      <Contact />
      <ContactForm />
      <Map />
    </div>
  );
}

export default ContactScreen;
