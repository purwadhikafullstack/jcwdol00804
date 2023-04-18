import React from "react";
import { Avatar } from "@chakra-ui/avatar";

const AvatarSection = () => {
    return (
        <div className="flex flex-col m-auto">
            <div className="flex flex-col justify-center items-center mt-10">
                <Avatar className="w-[150px] h-[150px] rounded-full bg-white"
                    src='https://bit.ly/dan-abramov' />
                <div className="text-lg font-semibold">
                    Username
                </div>
                <div className="text-base">
                    Email
                </div>
            </div>
        </div>
    )
}

export default AvatarSection;