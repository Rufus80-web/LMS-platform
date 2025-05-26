import { ChangeEvent, FormEvent, useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { useTheme } from "../../context/ThemeContext";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import Navbar from "../Teachers/components/navbar/Navbar";
import DashHeader from "../Teachers/components/DashHeader";
import Input from "./components/Input";
import { Button } from "@mui/material";
import FormSelect from "./components/FormSelect";
import { TeacherFormData } from "../../static/types";

import { addTeacherRequest } from "../../api/admin.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import IsLoading from "./components/IsLoading";

type SidebarType = () => void;

const CreateTeacher = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TeacherFormData>({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    address: "",
    roles: '',
    gender: "",
    password: "",
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

  // This function send user-data to the server to perform post request i.e Function to add a new Teacher to the DB
  const addNewTeacher = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const configs = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      // Send request to server
      const response = await addTeacherRequest(configs);

      // Jsonify the server response
      const { error, message } = await response.json();

      if (!error) {
        toast.success(message);

        // Clear the Form Input after successfull registration
        cleanTheForm();

        // Then Redirect
        route("/admin/manage.teachers");
      } else {
        // Set Loader
        setIsLoading(true);
        // Display error message
        setTimeout(() => {
          setIsLoading(false)
          toast.error(message);
        }, 1200)

        // clearTimeout(timer)
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // Clean the form
  const cleanTheForm = (): void => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      contact: "",
      address: "",
      roles: '',
      gender: "",
    });
  };

  // Route to path
  const route = useNavigate();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  // Handle toggle sidebar functionality (open/close)
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };

  // Return UI Component
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
          <DashHeader title="New Teacher" message="Create a new Teacher" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}

          {/* Loader component rendered conditionaly  */}

          {isLoading && <IsLoading />}

          <form onSubmit={addNewTeacher} className="w-full h-[65vh] p-0">
            <section className="flex gap-2 mt-2">
              <Input
                type="text"
                name="firstname"
                value={formData.firstname}
                placeholder="First Name"
                onChange={OnChange}
                disable={false}
                style="small-input"
              />
              <Input
                type="text"
                name="lastname"
                value={formData.lastname}
                placeholder="Last Name"
                onChange={OnChange}
                disable={false}
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
                disable={false}
                style="long-input"
              />
              <Input
                type="text"
                name="contact"
                value={formData.contact}
                placeholder="Contact Number"
                onChange={OnChange}
                disable={false}
                style="long-input"
              />
              <Input
                type="text"
                name="address"
                value={formData.address}
                placeholder="Address 1"
                onChange={OnChange}
                disable={false}
                style="long-input"
              />
            </section>
            <section className="pt-6 flex gap-6">
              <FormSelect
                name="gender"
                value={formData.gender}
                placeholder="Gender"
                onChange={OnChange}
                style="small-input"
                options={["Male", "Female"]}
              />
              <FormSelect
                name="roles"
                value={formData.roles as string}
                placeholder="User Role"
                onChange={OnChange}
                style="small-input"
                options={["User", "Teacher", "Administrator"]}
              />
              <Input
                type="password"
                name="password"
                value={formData.password as string}
                placeholder="User Password"
                onChange={OnChange}
                disable={false}
                style="long-input"
              />
            </section>

            <section className="absolute right-3 bottom-21">
              <Button type="submit" variant="contained" className="uppercase">
                Submit
              </Button>
            </section>
          </form>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default CreateTeacher;
