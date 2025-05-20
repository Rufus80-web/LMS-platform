import React, { ChangeEvent, FormEvent, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Button } from "@mui/material";

import profile from "../../assets/images/profile-1.jpg";
import Input from "./components/Input";

type SidebarType = () => void;

const AdminProfile: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    address1: "",
    password: "",
    newPassword: "",
    confirm_new_password: ""
  });
  const [_uploadedFile, _setUploadedFile] = useState<Array<File>>([])

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target 
    if (typeof files !== null){
      
    } 
  }

  return (
    <SidebarContext.Provider
      value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
    >
      <div className="w-screen min-h-screen flex">
        <AdminSidebar />

        <div
          className={`w-screen min-h-screen pb-[2em] select-none ${
            isOpen ? "pl-15 pr-3" : "pl-12 pr-3"
          } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />
          <DashHeader title="User Profile" message="Profile details" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-3">
            <section className="w-full h-50 flex flex-col gap-1 justify-center items-center pb-2">
              <h2 className={`text-2xl ${themeMode === "dark" && 'text-slate-50'}`}>Profile Picture</h2>
              <div className="w-30 h-30 rounded-full">
                <img
                  src={profile}
                  alt="profile-picture"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div>
                <input
                  className="hidden"
                  type="file"
                  name="uploadedFile"
                  id="profile"
                  onChange={handleFileChange}
                />
                <button className="w-30 h-8 bg-slate-300 hover:cursor-pointer">
                  <label
                    htmlFor="profile"
                    className="cursor-pointer hover:text-white"
                  >
                    Choose a File
                  </label>
                </button>
              </div>
            </section>

            <section>
              <form onSubmit={handleSubmit} className="w-full h-[65vh] p-0">
                <section className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    placeholder="First Name"
                    onChange={OnChange}
                    style="small-input"
                  />
                  <Input
                    type="text"
                    name="lname"
                    value={formData.lname}
                    placeholder="Last Name"
                    onChange={OnChange}
                    style="small-input"
                  />
                </section>
                <section className="pt-6 flex flex-col gap-6">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email "
                    onChange={OnChange}
                    style="long-input"
                  />
                  <Input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    placeholder="Contact Number"
                    onChange={OnChange}
                    style="long-input"
                  />
                  <Input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    placeholder="Address 1"
                    onChange={OnChange}
                    style="long-input"
                  />
                </section>
                <section className="flex gap-2 mt-6">
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter Current Password"
                    onChange={OnChange}
                    style="small-input"
                  />
                  <Input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    placeholder="Enter your new Password"
                    onChange={OnChange}
                    style="small-input"
                  />
                </section>
                <section className="flex gap-2 mt-6">
                  <Input
                    type="password"
                    name="confirm_new_password"
                    value={formData.confirm_new_password}
                    placeholder="Confirm New Password"
                    onChange={OnChange}
                    style="long-input"
                  />
                </section>
              </form>
            </section>

            <section className="mt-4 flex gap-4">
              <Button
                variant="contained"
              >
                Submit
              </Button>
            </section>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default AdminProfile;
