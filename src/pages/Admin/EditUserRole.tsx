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


type SidebarType = () => void;

const EditUserRole = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const [formData, setFormData] = useState({
    role: "",
    isSuperUser: "",
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
          <DashHeader title="Role" message="User role edit" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}

          <form onSubmit={handleSubmit} className="w-full h-[65vh] p-0">
            <section className="flex flex-col gap-2 mt-2">
              <Input
                type="text"
                name="role"
                value={formData.role}
                placeholder="User Role"
                onChange={OnChange}
                style="long-input"
              />
              <Input
                type="text"
                name="isSuperUser"
                value={formData.isSuperUser}
                placeholder="Is user a super user? No"
                onChange={OnChange}
                style="long-input"
              />
            </section>
            
            <section className="absolute right-3 top-65">
              <Button variant="contained" className="uppercase">
                Save
              </Button>
            </section>
          </form>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default EditUserRole;
