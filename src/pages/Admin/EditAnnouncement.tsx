import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Alert, Button } from "@mui/material";
import FormSelect from "./components/FormSelect";
import Input from "./components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { Announcement } from "../../static/Interface";
import { getAnnouncement, updateAnnouncement } from "../../api/admin.api";
import toast from "react-hot-toast";

type SidebarType = () => void;

const EditAnnouncement: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  const route = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement>({
    title: "",
    content: "",
    receivers: "",
    sendOn: "",
    sender: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [btnName, setBtnName] = useState("Update");

  const { announId } = useParams();

  const OnChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnnouncement((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const handleAnnouncementUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setBtnName("Save");

    if (!isEditing) {
      try {
        const response = await updateAnnouncement(
          announId as string,
          announcement
        );
        const {
          data: { status, message, updatedAnnoucement },
        } = response;

        if (status === "error") {
          toast.error("Oops! " + message);
          // throw new Error(message);
        } else {
          toast.success(message);
          const { title, content, sender } = updatedAnnoucement;
          // const format: string = new Date(sendOn).toDateString();
          setAnnouncement({
            title: title,
            content: content,
            // receivers: receivers,
            // sendOn: format,
            sender: sender,
          });

          // Disable back form inputs
          setIsEditing(true);

          // Reset submit button name
          setBtnName("Update");
          route("/admin/announcement");
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const formatDate = (date: string): string => {
    const originalDate: Date = new Date(date);
    const formatted: string = originalDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
    return formatted;
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
          const { title, content, sendOn, sender, receivers } = announcement;

          setAnnouncement({
            title: title,
            content: content,
            sendOn: formatDate(sendOn),
            sender: sender,
            receivers: receivers
          });
        }
      } catch (error: any) {
        console.error(error);
      }
    };

    getAnnouncementDetail();
  }, []);

  // UI component
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
            <form
              onSubmit={handleAnnouncementUpdate}
              className="w-full h-[65vh] p-0"
            >
              <section className="flex gap-2 mt-2">
                <Input
                  type="text"
                  name="title"
                  value={announcement.title}
                  placeholder="Announcement Title"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
                <Input
                  type="text"
                  name="content"
                  value={announcement.content}
                  placeholder="Announcement Description"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
              </section>
              <section className="pt-6 flex flex-col gap-6">
                <Input
                  type="date"
                  name="sendOn"
                  value={announcement.sendOn as string}
                  placeholder="Announcement Date creation"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
                <FormSelect
                  name="receivers"
                  value={announcement.receivers as string}
                  placeholder="Send announcement to--"
                  onChange={OnChange}
                  style="long-input"
                  options={["ALL", "Teacher", "Student"]}
                />
              </section>
              <section className="absolute right-3 bottom-22 flex justify-center items-center gap-2">
                {!isEditing && <Alert>Form fields enabled</Alert>}
                <Button type="submit" variant="contained" className="uppercase">
                  <span>{btnName}</span>&nbsp;
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
