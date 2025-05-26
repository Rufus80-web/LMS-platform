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
import { TeacherFormData } from "../../static/types";
import { deleteUser, getUser } from "../../api/admin.api";
import { toast } from "react-toastify";
import CustomCard from "./components/CustomCard";

type SidebarType = () => void;

const DisplayTeacherInfo: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const navigate = useNavigate();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  // Get user (teacher) ID
  const { userID } = useParams();
  // Create teacher object to collect personal informations from the store
  const [teacherObj, setTeacherObj] = useState<TeacherFormData>({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    gender: "",
    roles: "",
    address: "",
  });
  const [cardTransition, setCardTransition] = useState(false);

  // Fetch teacher information from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUser(userID);
        console.log("test: ", data);
        if (data.status == "error") {
          throw new Error(data.message);
        } else {
          const { firstname, lastname, email, address, contact, gender, role } =
            data?.user;
          setTeacherObj({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact,
            gender: gender,
            roles: role,
            address: address,
          });
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchData();
  }, []);

  // Display card container to confirm or cancel deletion
  const setCardContainer = () => setCardTransition(true);
  const unmountCardContainer = () => setCardTransition(false);

  // Delete teacher action
  const deleteUserRequest = async () => {
    if (!userID) {
      console.log("ID parameter is required");
      return;
    }

    try {
      const response = await deleteUser(userID as string);
      const { status, message } = response.data;

      if (status === "error") {
        toast.error(message);
        throw new Error(message);
      } else {
        unmountCardContainer();
        toast.success(message);
        // Redirect to teachers page
        setTimeout(() => navigate("/admin/manage.teachers"), 2000);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Returning UI Component
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
            name={teacherObj?.firstname}
            state={cardTransition}
            func1={deleteUserRequest}
            func2={unmountCardContainer}
          />

          <Navbar />
          <DashHeader title="Teacher's Data" message="Account Information" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Displaying teacher data  */}
          <div
            className={`w-full h-max mt-6 flex flex-col gap-3 ${
              themeMode === "dark" ? "text-[#f6f6f67e]" : "text-black"
            }`}
          >
            <section className="grid grid-cols-3 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>First Name:</span>
                <span>{teacherObj?.firstname}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Last Name:</span>
                <span>{teacherObj?.lastname}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                {/* <span>Photo:</span> */}
                <div className="w-15 h-15 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src={img}
                    alt=""
                  />
                </div>
              </div>
            </section>
            <hr className="mt-3 border-[#85838336] border-solid border-1" />
            <section className="grid grid-cols-3 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Email:</span>
                <span>{teacherObj?.email}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Address:</span>
                <span>{teacherObj?.address}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Courses:</span>
                <span>[UML, Merisse, GIS]</span>
              </div>
            </section>
            <hr className="mt-3 border-[#85838336] border-solid border-1" />
            <section className="grid grid-cols-3 items-center">
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Gender:</span>
                <span>{teacherObj?.gender}</span>
              </div>
              <div className="flex flex-col gap-3 w-60 h-15">
                <span>Role:</span>
                <span>
                 {teacherObj?.roles}
                </span>
              </div>
            </section>
            <hr className="mt-3 border-[#85838336] border-solid border-1" />
            <section className="mt-4 flex gap-4">
              <Button
                variant="contained"
                style={{ backgroundColor: "#dada11d7" }}
                onClick={() =>
                  navigate(
                    `/admin/edit/teacher/${encodeURIComponent(
                      userID as string
                    )}`
                  )
                }
              >
                Edit
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: cardTransition ? "grey" : "gray" }}
                onClick={setCardContainer}
                disabled={cardTransition}
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

export default DisplayTeacherInfo;
