import React from "react";
import Page from "../../Components/Page";
import FormSection from "./FormSection";
import LogoSection from "./LogoSection";

const ForgotPassword = () => {
  return (
    <Page isNavbar={false} isFooter={false}>
      <div>
        <LogoSection />
        <FormSection />
      </div>
    </Page>
  );
};

export default ForgotPassword;
