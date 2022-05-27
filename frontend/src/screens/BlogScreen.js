import React from "react";
import Blog from "../components/Blog";
import Menu from "../components/global-components/Menu";
import PageHeader from "../components/global-components/page-header";
function BlogScreen() {
  return (
    <div>
      <Menu />
      <PageHeader headertitle="Blog" subheader="Blog" />

      <Blog />
    </div>
  );
}

export default BlogScreen;
