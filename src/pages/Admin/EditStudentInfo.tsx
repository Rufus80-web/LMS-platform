import React, { ChangeEvent, FormEvent, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Button } from "@mui/material";

import img from "../../assets/images/profile-4.jpg";
import Input from "./components/Input";

type SidebarType = () => void;

const EditStudentInfo: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

    const [formData, setFormData] = useState({
      fname: "",
      lname: "",
      email: "",
      contact: "",
      address1: "",
      address2: "",
    });
  
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
          <DashHeader title="John Mark" message="Edit John info" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-3">
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
              <Input
                type="text"
                name="address2"
                value={formData.address2}
                placeholder="Address 2"
                onChange={OnChange}
                style="long-input"
              />
            </section>
            <section className="absolute right-3 bottom-15">
              <Button variant="contained" className="uppercase">
                Save
              </Button>
            </section>
          </form>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default EditStudentInfo;
