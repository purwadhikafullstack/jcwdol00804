import React from "react";
import Page from "../../Components/Page";
import AddressSection from "./AddressSection";
import AvatarSection from "./AvatarSection";

const MyAddress = () => {
    return (
        <Page isNavbar={true} isFooter={false}>
            <AvatarSection />
            <AddressSection />
        </Page>
    )
}

export default MyAddress;