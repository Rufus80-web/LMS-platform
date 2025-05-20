import React, { useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import IconButton from "./components/IconButton";
import { Print } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type SidebarType = () => void;

const UserRoleList: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const route = useNavigate()

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
            title="Grant / Denied"
            message="Role Management Detail List"
          />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only log data  */}
          <div className={`w-full h-max mt-3 rounded-lg border-[#85838336] ${themeMode === 'dark' ? 'text-[#f6f6f67e]' : 'text-black'}`}>
            <div className="w-full p-2 h-max flex justify-between ">
              <IconButton icon={<Print />} name="Print" url="" />
            </div>
            <div className="flex flex-col gap-3 text-md pl-2 pt-4">
              <div className="flex flex-col gap-1.5">
                <span>Name:</span>
                <span>Teacher</span>
              </div>
              <hr className="mt-2 border-[#85838336] border-solid border-1" />
              <div className="flex flex-col gap-1.5">
                <span>Is Superuser:</span>
                <span>No</span>
              </div>
              <hr className="mt-2 border-[#85838336] border-solid border-1" />
            </div>

            <section className="mt-4 flex gap-4">
              <Button
                variant="contained"
                style={{ backgroundColor: "#dada11d7" }}
                onClick={() => route("/admin/users-role/edit")}
              >
                Edit
              </Button>
              <Button variant="contained" disabled style={{ backgroundColor: "#4543" }}>
                Delete
              </Button>
            </section>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default UserRoleList;
