import { ChangeEvent, FormEvent, useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { useTheme } from "../../context/ThemeContext";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import Input from "./components/Input";
import { Button } from "@mui/material";
import FormSelect from "./components/FormSelect";

type SidebarType = () => void;

const CreateAnnouncement = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
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

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
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
          <DashHeader
            title="New Announcement"
            message="Create a new Announcement"
          />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}

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
            <section className="absolute right-3 bottom-60">
              <Button variant="contained" className="uppercase">
                Create
              </Button>
            </section>
          </form>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default CreateAnnouncement;
