import React, { useState } from "react";
import { useUserStore } from "../stores/useUserStore.js";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { IoCameraOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";

const ProfilePage = () => {
  const { user, updateProfile } = useUserStore();
  const [selectImg, setSelectImg] = useState<string | null>(null);
  const { logout } = useUserStore();
  const handleLogout = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  const handleImgaeUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Img = reader.result as string;
      setSelectImg(base64Img);
      try {
        await updateProfile({ profilePic: base64Img });
        toast.success("Profile Update Succesfully");
      } catch (error) {
        toast.error(error.message);
      }
    };
  };
  return (
    <div className="min-h-screen ">
      <div className="flex justify-end m-3 items-center">
        <h3 className="text-gray-200">
          <Link to={"/"}>Home</Link>
        </h3>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-200 text-base font-medium ml-8"
          style={{ minWidth: "120px" }}
        >
          <CiLogout size={24} />
          <span>Logout</span>
        </button>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md">
          <h3 className="text-gray-200 mb-5 text-xl text-center">Profile</h3>
          <div className="flex flex-col justify-center items-center">
            <img
              src={selectImg || user.profilePic || "/avatar.png"}
              alt="Profile image"
              className="text-center border-cyan-400 text-white size-26 rounded-full border-2 object-cover"
            />
            <label htmlFor="avatar-upload">
              <IoCameraOutline className="w-5 h-5 text-white text-base-200 m-3 cursor-pointer" />
              <input
                className="hidden"
                id="avatar-upload"
                accept="image/*"
                type="file"
                onChange={handleImgaeUpload}
              />
            </label>
          </div>
          <div className="mb-6">
            <div className="flex gap-1.5">
              <CiUser className="text-gray-200" size={20}/>
            <label htmlFor="userName" className="block text-white mb-1.5">
              UserName
            </label>
            </div>
            <input
              type="text"
              readOnly
              className="w-full px-2 py-3 text-gray-200 border border-cyan-400 rounded-xl"
              value={user ? user.userName : ""}
            />
          </div>
          <div className="mb-6">
            <div className="flex gap-1.5">
              <MdOutlineMailOutline size={20} className="text-gray-200"/>
              <label htmlFor="Email" className="block text-gray-200 mb-1.5">
              Email
            </label>
            </div>
            <input
              type="text"
              readOnly
              className="w-full  px-2 py-3 text-gray-200 border border-cyan-400 rounded-xl"
              value={user ? user.email : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
