import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { useTheme } from "../../context/ThemeContext";
// import loader from '../../assets/images/lg (2).gif'
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import Input from "./components/Input";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../api/admin.api";
import { toast } from "react-toastify";
import { FormData } from "../../static/types";
import { Alert } from "@mui/material";

type SidebarType = () => void;

const EditTeacherInfo = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [btnName, setBtnName] = useState("Update");
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
  });

  // Get userId from the route
  const { id } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      if (typeof id === "undefined") {
        throw new Error("User ID is null");
      } else {
        try {
          const { data } = await getUser(id);
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

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setBtnName("Save");

    console.log("Form inputs are enabled");

    if (!isEditing) {
      // toast.success("You can now modify the profile's information");

      try {
        const response = await updateUser(id as string, formData);
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

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  // Rendering UI
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
            title={formData.firstname}
            message={`Edit ${formData.firstname} info`}
          />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}

          <form className="w-full h-[65vh] p-0">
            <section className="flex gap-2 mt-2">
              <Input
                type="text"
                name="firstname"
                value={formData.firstname}
                disable={isEditing}
                placeholder="First Name"
                onChange={OnChange}
                style="small-input"
              />
              <Input
                type="text"
                name="lastname"
                value={formData.lastname}
                disable={isEditing}
                placeholder="Last Name"
                onChange={OnChange}
                style="small-input"
              />
            </section>
            <section className="pt-6 flex flex-col gap-6">
              <Input
                type="email"
                name="email"
                value={formData.email}
                disable={isEditing}
                placeholder="Email "
                onChange={OnChange}
                style="long-input"
              />
              <Input
                type="text"
                name="contact"
                value={formData.contact}
                disable={isEditing}
                placeholder="Contact Number"
                onChange={OnChange}
                style="long-input"
              />
              <Input
                type="text"
                name="address"
                value={formData.address}
                disable={isEditing}
                placeholder="Address 1"
                onChange={OnChange}
                style="long-input"
              />
              <Input
                type="text"
                name="gender"
                value={formData.gender}
                disable={isEditing}
                placeholder="Address 2"
                onChange={OnChange}
                style="long-input"
              />
            </section>

            <section className="absolute right-3 bottom-22 flex justify-center items-center gap-2">
              {!isEditing && (
                <Alert>You can now modify the profile's information</Alert>
              )}
              <Button
                onClick={handleProfileUpdate}
                variant="contained"
                className="uppercase"
              >
                <span>{btnName}</span>&nbsp;
              </Button>
            </section>
          </form>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default EditTeacherInfo;
