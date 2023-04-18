import React from "react";
import Page from "../../Components/Page";
import DetailSection from "./DetailSection";
import BackButton from "../../Components/BackButton";

const ProductDetail = () => {
  return (
    <Page isNavbar={false} isFooter={false}>
      <div className="relative">
        <BackButton />
        <div className="text-center text-xl py-5 font-bold z-10 relative">
          Product Detail
        </div>
      </div>
      <DetailSection />
    </Page>
  );
};

export default ProductDetail;
