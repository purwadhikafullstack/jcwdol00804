import React from "react";
import Page from "../../Components/Page";
import AvatarSection from "./Sections/AvatarSection";
import SettingSection from "./Sections/SettingSection";

const ProfileSetting = () => {
    return (
        <Page isNavbar={true} isFooter={false} navTitle={"Profile Settings"}>
            <AvatarSection />
            <SettingSection />
        </Page>
    )
}

export default ProfileSetting;