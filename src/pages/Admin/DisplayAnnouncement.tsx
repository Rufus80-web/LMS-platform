import React, { useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Button } from "@mui/material";

import img from "../../assets/images/profile-3.jpg";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteAnnouncementRequest,
  getAnnouncement,
} from "../../api/admin.api";
import { Announcement } from "../../static/Interface";
import CustomCard from "./components/CustomCard";
import toast from "react-hot-toast";

type SidebarType = () => void;

const DisplayAnnouncementInfo: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const route = useNavigate();
  const [cardTransition, setCardTransition] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement>({
    title: "",
    content: "",
    receivers: "",
    sendOn: "",
    sender: "",
  });
  const { announId } = useParams();
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    const getAnnouncementDetail = async () => {
      try {
        const {
          data: { announcement, status, message },
        } = await getAnnouncement(announId as string);
        if (status === "error") {
          throw new Error(message);
        } else {
          console.log(message);
          const { title, content, sendOn, receivers, sender } = announcement;
          setAnnouncement({
            title: title,
            content: content,
            receivers: receivers,
            sendOn: sendOn,
            sender: sender,
          });
        }
      } catch (error: any) {
        console.error(error);
      }
    };

    getAnnouncementDetail();
  }, []);

  // Display card container to confirm or cancel deletion
  const setCardContainer = () => setCardTransition(true);
  const unmountCardContainer = () => setCardTransition(false);

  // Delete teacher action
  const handleCourseDelete = async () => {
    try {
      const response = await deleteAnnouncementRequest(announId as string);
      const { status, message } = response.data;

      if (status === "error") {
        toast.error(message);
        throw new Error(message);
      } else {
        unmountCardContainer();
        toast.success(message);
        // Redirect to teachers page
        setTimeout(() => route("/admin/annoucement"), 2000);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Return component UI
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
          <CustomCard
            name={announcement.title}
            state={cardTransition}
            func1={handleCourseDelete}
            func2={unmountCardContainer}
          />
          <Navbar />
          <DashHeader
            title="Announcement Data"
            message="Announcement details"
          />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div
            className={`w-full h-max mt-6 flex flex-col gap-3 ${
              themeMode === "dark" ? "text-[#f6f6f67e]" : "text-black"
            }`}
          >
            <section className="grid grid-cols-3 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Title:</span>
                <span>{announcement.title}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Attachement:</span>
                <div className="w-15 h-15 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src={img}
                    alt=""
                  />
                </div>
              </div>
            </section>
            <hr className="mt-10 border-[#85838336] border-solid border-1" />
            <section className="">
              <div className="flex justify-center items-center gap-3 w-full h-15">
                <span>Description:</span>
                <div className="w-full h-[12vh] p-2 mt-2">
                  {announcement.content}
                </div>
              </div>
            </section>
            <hr className="mt-3 border-[#85838336] border-solid border-1" />
            <section className="grid grid-cols-3 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Created By:</span>
                <span>{announcement.sender}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Date:</span>
                <span>{announcement.sendOn}</span>
              </div>
            </section>
            <hr className="mt-3 border-[#85838336] border-solid border-1" />
            <section className="mt-4 flex gap-4">
              <Button
                variant="contained"
                style={{ backgroundColor: "#dada11d7" }}
                onClick={() => route("/admin/edit/announcement/" + announId)}
              >
                Edit
              </Button>
              <Button
                disabled={cardTransition}
                variant="contained"
                style={{ backgroundColor: cardTransition ? "grey" : "gray" }}
                onClick={setCardContainer}
              >
                Delete
              </Button>
            </section>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default DisplayAnnouncementInfo;
