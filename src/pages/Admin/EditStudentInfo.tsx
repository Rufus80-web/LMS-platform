import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Alert, Button } from "@mui/material";

import Input from "./components/Input";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../api/admin.api";
import FormSelect from "./components/FormSelect";
import toast from "react-hot-toast";

type SidebarType = () => void;

const EditStudentInfo: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [btnName, setBtnName] = useState("Update");
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
  });

  const OnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  // Get userId from the route
  const { sid } = useParams();

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setBtnName("Save");

    console.log("Form inputs are enabled");

    if (!isEditing) {
      try {
        const response = await updateUser(sid as string, formData);
        const {
          data: { status, message, userData },
        } = response;

        if (status === "error") {
          toast.error("Oops! " + message);
          throw new Error(message);
        } else {
          toast.success(message);
          // Get updated user record
          const { firstname, lastname, email, contact, address, gender } =
            userData;

          // Set updated record on the UI
          setFormData({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact,
            address: address,
            gender: gender,
          });

          // Disable back form inputs
          setIsEditing(true);

          // Reset submit button name
          setBtnName("Update");
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  // Get user record
  useEffect(() => {
    const getUserData = async () => {
      if (typeof sid === "undefined") {
        throw new Error("User ID is null");
      } else {
        try {
          const { data } = await getUser(sid);
          const { status, message } = data;
          if (status === "error") {
            throw new Error(message);
          }
          const { firstname, lastname, email, contact, address, gender } =
            data?.user;
          setFormData({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact,
            address: address,
            gender: gender,
          });
        } catch (error: any) {
          throw new Error(error);
        }
      }
    };

    getUserData();
  }, []);


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
          <DashHeader title="John Mark" message="Edit John info" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-3">
            <form onSubmit={handleProfileUpdate} className="w-full h-[65vh] p-0">
              <section className="flex gap-2 mt-2">
                <Input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  placeholder="First Name"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
                <Input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  placeholder="Last Name"
                  onChange={OnChange}
                  disable={isEditing}
                  style="small-input"
                />
              </section>
              <section className="pt-6 flex flex-col gap-6">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email "
                  onChange={OnChange}
                  disable={isEditing}
                  style="long-input"
                />
                <Input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  placeholder="Contact Number"
                  onChange={OnChange}
                  disable={isEditing}
                  style="long-input"
                />
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  placeholder="User address"
                  onChange={OnChange}
                  disable={isEditing}
                  style="long-input"
                />
                <FormSelect
                  name="gender"
                  value={formData.gender}
                  placeholder="Select a gender"
                  onChange={OnChange}
                  style="long-input"
                  options={["Male", "Female"]}
                />
              </section>
              <section className="absolute right-3 bottom-15 flex justify-center items-center gap-2">
                {!isEditing && (
                  <Alert>You can now modify the profile's information</Alert>
                )}
                <Button
                  onClick={handleProfileUpdate}
                  variant="contained"
                  type="submit"
                  className="uppercase"
                >
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

export default EditStudentInfo;
