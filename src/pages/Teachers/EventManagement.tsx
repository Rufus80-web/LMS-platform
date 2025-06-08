import { FC, useEffect, useState } from "react";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import { useTheme } from "../../context/ThemeContext";
import { Table, Paper } from "@mui/material";
import EventTableHeader from "./components/EventTableHeader";
import EventTableBody from "./components/EventTableBody";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import { getEventCreatedByTeacherReducer } from "../../Redux/Slices/teacherSlice";
import { motion } from "framer-motion";

type SidebarType = () => void;

const EventManagement: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.events);
  // console.log(events)
  const { isOpen } = useTeacherSidebarContext();
  const { themeMode } = useTheme();

  useEffect(() => {
    dispatch(getEventCreatedByTeacherReducer());
  }, []);

  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <motion.div
          initial={{ opacity: 0, x: "90%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "50%" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Sidebar />
        </motion.div>
        <div
          className={`w-screen min-h-screen ${
            isOpen ? "pl-3 pr-3" : "pl-12 pr-3"
          } pb-[2em] ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />

          <div className="pl-1">
            <DashHeader
              title="Manage Announcements"
              message="Announcement Records"
            />
            <div
              className={`mt-8 pr-3`}
              style={{ color: themeMode === "light" ? "black" : "#d4d0d08c" }}
            >
              
                <motion.div
                  initial={{ opacity: 0, x: "90%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Table component={Paper}>
                    <EventTableHeader />
                    <EventTableBody events={events} url="/teacher/get-event" />
                  </Table>
                </motion.div>
              {/* </AnimatePresence> */}
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default EventManagement;
