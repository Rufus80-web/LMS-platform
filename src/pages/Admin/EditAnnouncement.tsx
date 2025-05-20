import React, { ChangeEvent, FormEvent, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Button } from "@mui/material";
import FormSelect from "./components/FormSelect";
import Input from "./components/Input";

type SidebarType = () => void;




const EditAnnouncement: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

    const [formData, setFormData] = useState({
      announcement_title: "",
      announcement_description: "",
      announcement_to: "",
      announcement_send_date: "",
    });
  
    const OnChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
          <DashHeader title="Next Exam" message="Edit announcement page" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-3">
            
          <form onSubmit={handleSubmit} className="w-full h-[65vh] p-0">
            <section className="flex gap-2 mt-2">
              <Input
                type="text"
                name="announcement_title"
                value={formData.announcement_title}
                placeholder="Announcement Title"
                onChange={OnChange}
                style="small-input"
              />
              <Input
                type="text"
                name="announcement_description"
                value={formData.announcement_description}
                placeholder="Announcement Description"
                onChange={OnChange}
                style="small-input"
              />
            </section>
            <section className="pt-6 flex flex-col gap-6">
              <Input
                type="date"
                name="announcement_send_date"
                value={formData.announcement_send_date}
                placeholder="Announcement Description"
                onChange={OnChange}
                style="small-input"
              />
              <FormSelect
                name="announcement_to"
                value={formData.announcement_to}
                placeholder="Send announcement to--"
                onChange={OnChange}
                style="long-input"
              />
            </section>
            <section className="absolute right-3 bottom-53">
              <Button variant="contained" className="uppercase">
                Update
              </Button>
            </section>
          </form>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default EditAnnouncement;
