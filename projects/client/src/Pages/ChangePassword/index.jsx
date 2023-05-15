import React from "react";
import Page from "../../Components/Page";
import AvatarSection from "./Sections/AvatarSection";
import FormSection from "./Sections/FormSection";
import BackButton from "../../Components/BackButton"

const ChangePassword = () => {
    return (
        <Page isNavbar={false} isFooter={false}>
            <div className="absolute left-50 cursor-pointer z-20">
                <BackButton />
            </div>
            <div className="text-center text-xl py-5 font-bold z-10 relative">
                Change Password
            </div>
            <AvatarSection />
            <FormSection />
        </Page >
    )
}

export default ChangePassword;