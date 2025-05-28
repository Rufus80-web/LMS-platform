import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTeacherSidebarContext } from "../../context/sidebarContext";
import { SidebarContext } from "../../context/sidebarContext";
import { AdminSidebar } from "./components/AdminSidebar";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import { Button } from "@mui/material";

import Input from "./components/Input";
import { Adminprofile } from "../../static/Interface";
import { adminProfileUpdate, getUser } from "../../api/admin.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type SidebarType = () => void;

const AdminProfile: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const defaultProfile = "http://localhost:8000/static/images/user.webp";
  const [formData, setFormData] = useState<Adminprofile>({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    profile: "",
    newPassword: "",
    confirm_new_password: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate()

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

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      console.log("File Selected: ", files[0]);
    }
  };

  // Handle profile update
  const updateAdminProfile = async () => {
    const formdata = new FormData();
    const storage = localStorage.getItem("user-data");
    if (storage) {
      const parseData = JSON.parse(storage)["user"];
      const userId = parseData["_id"]; // send mongoDB _id to server and not our usual uuiv4() id,s

      formdata.append("firstname", formData.firstname);
      formdata.append("lastname", formData.lastname);
      formdata.append("email", formData.email);
      formdata.append("contact", formData.contact);
      formdata.append("address", formData.address);

      if (uploadedFile) {
        formdata.append("profilePic", uploadedFile);
      }
      console.log(formdata)
      const token = localStorage.getItem("token") || null;
      const configs = {
        method: "PUT",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await adminProfileUpdate(userId, configs);
        const result = await response.json();

        const { status, message, userProfile } = result;

        if (status === "error") {
          toast.error(message);
        } else {
          toast.success(message)
          setFormData({
            firstname: userProfile.firstname,
            lastname: userProfile.lastname,
            email: userProfile.email,
            contact: userProfile.contact,
            address: userProfile.address,
            profile: userProfile.profile,
          });
        }
      } catch (error: any) {
        console.error("Upload Failed: " + error);
        throw new Error(error.message);
      }
    } else {
      console.error("Could not get userId from local storage");
    }
  };

  // Get user data and set user profile information
  useEffect(() => {
    const getAccountInfo = async () => {
      const storage = localStorage.getItem("user-data");
      if (storage) {
        const parseData = JSON.parse(storage)["user"];
        const userId = parseData["id"];

        try {
          const response = await getUser(userId);
          const { status, message, user, error } = response.data;

          console.log(response.data)

          if(error === 'error'){
            Swal.fire('Ooups!!', message, 'info')
            navigate('/auths/login')
            return
          }

          if (status === "error") {
            throw new Error(message);
          } else {
            setFormData({
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              contact: user.contact,
              address: user.address,
              profile: user.profile,
            });
          }
        } catch (error: any) {
          console.error(error.message);
          throw new Error(error);
        }
      } else {
        throw new Error("localStorage is empty");
      }
    };
    getAccountInfo();
  }, []);

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
          <Navbar />
          <DashHeader title="User Profile" message="Profile details" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}
          <div className="w-full h-max mt-6 flex flex-col gap-3">
            <section className="w-full h-50 flex flex-col gap-1 justify-center items-center pb-2">
              <h2
                className={`text-2xl ${
                  themeMode === "dark" && "text-slate-50"
                }`}
              >
                Profile Picture
              </h2>
              <div className="w-30 h-30 rounded-full">
                <img
                  src={
                    formData.profile === null
                      ? defaultProfile
                      : formData.profile
                  }
                  alt="profile-picture"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div>
                <input
                  className="hidden"
                  type="file"
                  name="uploadedFile"
                  id="profile"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button className="w-30 h-8 bg-slate-300 hover:cursor-pointer">
                  <label
                    htmlFor="profile"
                    className="cursor-pointer hover:text-white"
                  >
                    Choose a File
                  </label>
                </button>
                &nbsp;
                {uploadedFile && uploadedFile.name}
              </div>
            </section>

            <section>
              <form onSubmit={handleSubmit} className="w-full h-[65vh] p-0">
                <section className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    placeholder="First Name"
                    onChange={OnChange}
                    disable={disable}
                    style="small-input"
                  />
                  <Input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    placeholder="Last Name"
                    onChange={OnChange}
                    disable={disable}
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
                    disable={disable}
                    style="long-input"
                  />
                  <Input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    placeholder="Contact Number"
                    onChange={OnChange}
                    disable={disable}
                    style="long-input"
                  />
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Address "
                    onChange={OnChange}
                    disable={disable}
                    style="long-input"
                  />
                </section>
                <section className="flex gap-2 mt-6">
                  <Input
                    type="password"
                    name="password"
                    value={formData.password as string}
                    placeholder="Enter Current Password"
                    onChange={OnChange}
                    disable={disable}
                    style="small-input"
                  />
                  <Input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword as string}
                    placeholder="Enter your new Password"
                    onChange={OnChange}
                    disable={disable}
                    style="small-input"
                  />
                </section>
                <section className="flex gap-2 mt-6">
                  <Input
                    type="password"
                    name="confirm_new_password"
                    value={formData.confirm_new_password as string}
                    placeholder="Confirm New Password"
                    onChange={OnChange}
                    disable={disable}
                    style="long-input"
                  />
                </section>
              </form>
            </section>

            <section className="mt-4 flex gap-4">
              <Button
                variant="contained"
                disabled={!disable}
                onClick={() => setDisable((prev) => !prev)}
              >
                Edit
              </Button>
              <Button
                style={{ backgroundColor: "green" }}
                variant="contained"
                disabled={disable}
                onClick={updateAdminProfile}
              >
                Save
              </Button>
            </section>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default AdminProfile;
