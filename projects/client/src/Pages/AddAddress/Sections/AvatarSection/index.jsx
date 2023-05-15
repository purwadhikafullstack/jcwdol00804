import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { useSelector } from "react-redux";

const AvatarSection = () => {
  const { profile_img, name, email } = useSelector((state) => {
    return {
      profile_img: state.userReducer.profile_img,
      name: state.userReducer.name,
      email: state.userReducer.email,
    };
  });
  return (
    <div className="flex flex-col m-auto">
      <div className="flex flex-col justify-center items-center mt-4">
        <Avatar
          className="w-[150px] h-[150px] bg-slate-300"
          borderRadius="20%"
          src={profile_img && `http://localhost:8000/${profile_img}`}
        />
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-base">{email}</div>
      </div>
    </div>
  );
};

export default AvatarSection;
