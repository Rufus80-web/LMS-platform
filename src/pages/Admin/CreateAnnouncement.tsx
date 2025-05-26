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
import { addAnnouncementRequest } from "../../api/admin.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type SidebarType = () => void;

const CreateAnnouncement = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const route = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    receivers: "",
    sendOn: "",
    sender: "",
    email: ""
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

  const handleCreateAnnouncement = async (e: FormEvent) => {
    e.preventDefault();

    const configs = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      },
      body: JSON.stringify(formData)
    }
    
    try {
      const response= await addAnnouncementRequest(configs)
      const {status, content} = await response.json()

      if(status === 'error'){
        toast.error(content)
        throw new Error(content)
      } else {
        toast.success(content)
        route('/admin/announcement')
      }
    } catch (err: any) {
      throw new Error(err.content)
    }
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

          <form onSubmit={handleCreateAnnouncement} className="w-full h-[65vh] p-0">
            <section className="flex gap-2 mt-2">
              <Input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Announcement Title"
                onChange={OnChange}
                disable={false}
                style="small-input"
              />
              <Input
                type="text"
                name="content"
                value={formData.content}
                placeholder="Announcement Description"
                onChange={OnChange}
                disable={false}
                style="small-input"
              />
            </section>
            <section className="pt-6 flex gap-6">
              <Input
                type="sendOn"
                name="sendOn"
                value={formData.sendOn}
                placeholder="Announcement Description"
                onChange={OnChange}
                disable={false}
                style="small-input"
              />
              <FormSelect
                name="receivers"
                value={formData.receivers}
                placeholder="Send announcement to--"
                onChange={OnChange}
                style="small-input"
                options={["Teachers", "Students", "ALL"]}
              />
            </section>
            <section className="pt-6 flex gap-6">
              <Input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Specify a specific email"
                onChange={OnChange}
                disable={false}
                style="long-input"
              />
            </section>
            <section className="absolute right-3 bottom-60">
              <Button type="submit" variant="contained" className="uppercase">
                Save
              </Button>
            </section>
          </form>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default CreateAnnouncement;
