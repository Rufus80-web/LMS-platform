import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button } from "@mui/material";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../context/sidebarContext";
import DashHeader from "./components/DashHeader";
import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./TSidebar";
import Input from "./components/Input";
import { useTheme } from "../../context/ThemeContext";


type SidebarType = () => void;

const NewAdmission: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    console.log("state: " + isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
  };
  const { isOpen } = useTeacherSidebarContext();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  })
  const {themeMode} = useTheme()

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((data) => {
        return {
            ...data,
            [name]: value
        }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <div className="w-screen min-h-screen flex select-none">
      <SidebarContext.Provider
        value={{ isOpen: isOpenSidebar, shouldOpen: handleSidebarWidth }}
      >
        <Sidebar />
        <div
          className={`w-screen min-h-screen ${
            isOpen ? "pl-14 pr-3" : "pl-12 pr-3"
          } pb-[2em] ${themeMode === 'dark' ? 'bg-content-dark' : 'bg-white'}`}
        >
          <Navbar />

          <div className="pl-3">
            <DashHeader
              title="CREATE USER"
              message="Create a new user profile"
            />
            <div className={`mt-8 pr-3`}>
                <form onSubmit={handleSubmit} className="w-full h-[65vh] p-0">
                    <section className="flex gap-2">
                        <Input type="text" name="fname" value={formData.fname} placeholder="First Name" onChange={OnChange} style="small-input" />
                        <Input type="text" name="lname" value={formData.lname} placeholder="Last Name" onChange={OnChange} style="small-input" />
                    </section>
                    <section className="pt-6 flex flex-col gap-6">
                        <Input type="email" name="email" value={formData.email} placeholder="Email " onChange={OnChange} style="long-input" />
                        <Input type="text" name="contact" value={formData.contact} placeholder="Contact Number" onChange={OnChange} style="long-input" />
                        <Input type="text" name="address1" value={formData.address1} placeholder="Address 1" onChange={OnChange} style="long-input" />
                        <Input type="text" name="address2" value={formData.address2} placeholder="Address 2" onChange={OnChange} style="long-input" />
                    </section>
                    <section className="absolute right-6 bottom-17">
                      <Button variant="contained" className="uppercase">Create new user</Button>
                    </section>
                </form>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default NewAdmission;
