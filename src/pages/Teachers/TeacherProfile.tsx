import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Button, duration } from "@mui/material";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import Input from "./components/Input";
import { useTheme } from "../../context/ThemeContext";
import { getUserId } from "../../Redux/Slices/teacherSlice";
import {
  getTeacherDataApi,
  UpdateTeacherProfileApi,
} from "../../api/teacher.api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PROFILE_URL, PROFILE_URL } from "../../services/server-urls";

type SidebarType = () => void;

const TeacherProfilePage: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const [isNotEditable, setIsNotEditable] = useState(true);
  const { isOpen } = useTeacherSidebarContext();
  const route = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    address: "",
    profile: "",
    roles: "",
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  //   const navigate = useNavigate();
  const { themeMode } = useTheme();

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      console.log("File Selected: ", files[0]);
    }
  };

  const cleanTheForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      address: "",
      profile: "",
      roles: "",
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    });
  };

  const EnablePasswordFields = () => {
    toast.loading("Enabling password fields in 2s", {
      duration: 2500,
      position: "top-center",
    });
    setIsNotEditable(false);
  };

  // Disabling password fields
  const DisablePasswordFields = () => {
    toast.success("Password fields disabled");
    setIsNotEditable(true);
  };

  // Decide what action to perform
  const shouldDisable = () => {
    if (isNotEditable) {
      EnablePasswordFields();
    } else {
      DisablePasswordFields();
    }
  };

  useEffect(() => {
    const getTeacherData = async () => {
      try {
        const id = getUserId();
        const {
          data: { status, message, user },
        } = await getTeacherDataApi(id);

        if (status === "error") {
          throw new Error(message);
        } else {
          setFormData(user);
        }
      } catch (error: any) {
        console.error(error);
        throw new Error(error);
      }
    };

    getTeacherData();
  }, []);

  // update profile
  const UpdateTeacherProfile = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const id = getUserId();

      
      console.log(formData)
      const formdata = new FormData();
      formdata.append("firstname", formData.firstname);
      formdata.append("lastname", formData.lastname);
      formdata.append("email", formData.email);
      formdata.append("contact", formData.contact);
      formdata.append("address", formData.address);
      
      if (uploadedFile) {
          formdata.append("profilePic", uploadedFile);
        }

      if (
        formData.currentPassword !== "" &&
        formData.newPassword !== "" &&
        formData.passwordConfirm !== ""
      ) {
        formdata.append("shouldUpdatePassword", "true");
        formdata.append("currentPassword", formData.currentPassword);
        formdata.append("newPassword", formData.newPassword);
        formdata.append("passwordConfirm", formData.passwordConfirm);
      }

      const requestbody = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formdata
      }

      const response = await UpdateTeacherProfileApi(id, requestbody);
      const { status, message, data } = await response.json();

      if (status === "error") {
        toast.error(message);
      } else {
        toast.success(message);
        setUploadedFile(null)
        setFormData(data);

        route('/teacher/profile/info')

        setTimeout(() => {
          toast.success('Your profile picture shall take changes on your next Login', {duration: 6000})
        }, 2500)
        // Refresh page and clear the form
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // UI Component
  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen ${
            isOpen ? "pl-16 pr-3" : "pl-12 pr-3"
          } pb-[2em] ${themeMode === "dark" ? "bg-content-dark" : "bg-white"}`}
        >
          <Navbar />

          <div className="pl-0">
            <DashHeader
              title="Profile Information"
              message="Update your profile information"
            />

            <hr className="mt-3 border-[#85838336] border-solid border-1" />

            <div className="mt-[2em]">
              {/* section displaying profile picture  */}

              <section className="w-full h-50 flex flex-col gap-1 justify-center items-center pb-2">
                <h2
                  className={`text-xl ${
                    themeMode === "dark" && "text-slate-50"
                  }`}
                >
                  Profile Picture
                </h2>
                <div className="w-30 h-30 rounded-full">
                  <img
                    src={
                      formData.profile === null
                        ? DEFAULT_PROFILE_URL
                        : `${PROFILE_URL}/${formData.profile}`
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

              <form className="w-[78vw] h-[52vh] border-none shadow-sm shadow-dark-varient p-4 rounded-lg">
                <section className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    placeholder="First Name"
                    onChange={OnChange}
                  />
                  <Input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    placeholder="Last Name"
                    onChange={OnChange}
                  />
                </section>
                <section className="pt-6 flex gap-6">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email "
                    onChange={OnChange}
                  />
                  <Input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    placeholder="Contact Number"
                    onChange={OnChange}
                  />
                </section>
                <section className="pt-6 flex gap-6">
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Address "
                    onChange={OnChange}
                  />
                  <Input
                    type="text"
                    name="role"
                    value={formData.roles}
                    placeholder="Role "
                    onChange={OnChange}
                    disable={true}
                  />
                </section>
                <section className="pt-6 flex gap-6">
                  <Input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    placeholder="Enter your current password "
                    onChange={OnChange}
                    disable={isNotEditable}
                  />
                  <Input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    placeholder="Enter new password"
                    onChange={OnChange}
                    disable={isNotEditable}
                  />
                  <Input
                    type="password"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    placeholder="Confirm new password"
                    onChange={OnChange}
                    disable={isNotEditable}
                  />
                </section>
                <section className="pt-2">
                  <Button
                    style={{ color: isNotEditable ? "dodgerblue" : "#f5f5f5" }}
                    onClick={shouldDisable}
                  >
                    {isNotEditable ? "Enable Password Fileds" : "Cancel"}
                  </Button>
                </section>
              </form>

              <section className="mt-4 flex gap-4">
                <Button
                  type="button"
                  onClick={UpdateTeacherProfile}
                  variant="contained"
                >
                  Edit
                </Button>
              </section>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default TeacherProfilePage;
