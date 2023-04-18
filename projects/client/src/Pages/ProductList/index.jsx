import React from "react";
import Page from "../../Components/Page";
import ProductSection from "./ProductSection";

const ProductList = () => {
  return (
    <Page isFooter={false} navTitle="Product List">
      <ProductSection />
    </Page>
  );
};

export default ProductList;
