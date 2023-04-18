import React from "react";
import Page from "../../Components/Page";
import AvatarSection from "./Sections/AvatarSection";
import FormSection from "./Sections/FormSection";

const ChangePassword = () => {
    return (
        <Page isNavbar={true} isFooter={false}>
            <AvatarSection />
            <FormSection />
        </Page>
    )
}

export default ChangePassword;