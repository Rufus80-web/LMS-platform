import React, { useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import {Button} from '@mui/material'

import img from "../../assets/images/profile-4.jpg";

type SidebarType = () => void;

const DisplayCourseInfo: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

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
          <DashHeader title="Course's Data" message="Course Information" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-6">
            <section className="grid grid-cols-3 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Course Name:</span>
                <span>PHP - Laravel</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Course Code:</span>
                <span>Fabile</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Attachment:</span>
                <div className="w-15 h-15 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src={img}
                    alt=""
                  />
                </div>
              </div>
            </section>
            <hr className="mt-5 border-[#85838336] border-solid border-1" />
            <section className="grid grid-cols-2 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Course Instructor:</span>
                <span>Mr Ndonglap Jesky</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Course Duration:</span>
                <span>30 hrs</span>
              </div>
            </section>
            <hr className="mt-3 border-[#85838336] border-solid border-1" />
            <section className="mt-4 flex gap-4">
              <Button variant="contained" style={{backgroundColor:'#dada11d7'}}>Edit</Button>
              <Button variant="contained" style={{backgroundColor:'red'}}>Delete</Button>
            </section>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default DisplayCourseInfo;
