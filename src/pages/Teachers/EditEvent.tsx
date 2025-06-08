import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Alert, Button } from "@mui/material";
import Input from "./components/Input";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserId, getUserObjectId } from "../../Redux/Slices/teacherSlice";
import { getEventApi, updateEventApi } from "../../api/teacher.api";
import { Sidebar } from "./TSidebar";

type SidebarType = () => void;

const EditEvent: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  const route = useNavigate();
  const [events, setEvent] = useState({
    title: "",
    description: "",
    datetime: ""
  });
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [btnName, setBtnName] = useState("Update");

  const { eventID } = useParams();

  const OnChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent({
      ...events,
      [name]: value,
    });
  };

  // Function to update an event
  const updateEvent = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setBtnName("Save");

    if (!isEditing) {
      try {
        const teacherId = getUserObjectId();
        const request_body = {
          title: events.title,
          description: events.description,
        };
        const response = await updateEventApi(
          teacherId,
          eventID as string,
          request_body
        );

        const {
          data: { status, message, event },
        } = response;

        if (status === "error") {
          toast.error("Oops! " + message);
          // throw new Error(message);
        } else {
          toast.success(message);

          route("/teacher/event-management");

          setEvent({
            title: event.title,
            description: event.description,
            datetime: event.datetime
          });
          // Disable back form inputs
          setIsEditing(true);

          // Reset submit button name
          setBtnName("Update");
        }
      } catch (error: any) {
        console.log(error.message);
        throw new Error(error);
      }
    }
  };

  useEffect(() => {
    const getEventData = async () => {
      try {
        const teacherId = getUserObjectId();
        const response = await getEventApi(teacherId, eventID as string);
        const { event, status, message } = response.data;

        if (status === "error") {
          throw new Error(message);
        } else {
          setEvent(event);
        }
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
      }
    };
    getEventData();
  }, []);

  // UI component
  return (
    <SidebarContext.Provider
      value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
    >
      <div className="w-screen min-h-screen flex">
        <Sidebar />

        <div
          className={`w-screen min-h-screen pb-[2em] select-none ${
            isOpen ? "pl-15 pr-3" : "pl-3 pr-3"
          } ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />
          <DashHeader title="Edit Announcement" message="Edit Announcement details" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-3">
            <form onSubmit={updateEvent} className="w-[78vw] h-[30vh] p-4">
              <section className="flex gap-2 mt-2">
                <Input
                  type="text"
                  name="title"
                  value={events.title}
                  placeholder="Announcement Title"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
                <Input
                  type="text"
                  name="description"
                  value={events.description}
                  placeholder="Announcement Description"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
              </section>
              <section className="pt-6 flex gap-6">
                <Input
                  type="datetime-local"
                  name="datetime"
                  value={events.datetime}
                  placeholder="Enter start date and time"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
              </section>
              <section className="absolute right-10 bottom-75 flex justify-center items-center gap-2">
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

export default EditEvent;
