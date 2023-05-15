import React from "react";
import Page from "../../Components/Page";
import AddressSection from "./AddressSection";
import AvatarSection from "./AvatarSection";
import BackButton from "../../Components/BackButton";

const MyAddress = () => {
    return (
        <Page isNavbar={false} isFooter={false}>
            <div className="absolute left-50 cursor-pointer z-20">
                <BackButton />
            </div>
            <div className="text-center text-xl py-5 font-bold z-10 relative">
                My Address
            </div>
            <AvatarSection />
            <AddressSection />
        </Page>
    )
}

export default MyAddress;