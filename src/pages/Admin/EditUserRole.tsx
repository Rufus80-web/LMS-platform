import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/configureStrore";
import { usersReducer } from "../../Redux/Slices/adminSlice";
import { User } from "../../static/Interface";
import FormSelect from "./components/FormSelect";
import { upadteUserRolerequest } from "../../api/admin.api";
import toast from "react-hot-toast";

type SidebarType = () => void;

const EditUserRole = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();
  const { id } = useParams();
  const route = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    isSuperUser: "",
    role: ""
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

  const handleUserRoleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
       const { data: {status, message}} = await upadteUserRolerequest(id as string, formData.role)

       if(status === 'error'){
        toast.error(message)
       } else {
        toast.success(message)
        route('/admin/users.role')
       }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  };

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const dispatch = useAppDispatch()
  const {
    users: { allUsers },
  } = useAppSelector((state) => state.userArray);

  useEffect(() => {
    try {
      dispatch(usersReducer());

      if (allUsers && allUsers.length > 0) {
        const filterRole = allUsers.filter((user) => {
          if (user.id === id) {
            return user;
          }
        });
        // setFormData({
        //   name: filterRole[0]?.name,
        //   isSuperUser: filterRole[0]?.role[0] !== 'Administrator' ? "No" : "Yes",
        //   role: filterRole[0]?.role[0]
        // })
      }
    } catch (error) {
      throw new Error("User data Expired");
    }
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
          <DashHeader title="Role" message="User role edit" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only teacher data  */}

          <form onSubmit={handleUserRoleUpdate} className="w-full h-[65vh] p-0">
            <section className="flex flex-col gap-2 mt-2">
              <Input
                type="text"
                name="name"
                value={formData.name}
                placeholder="User Name"
                onChange={OnChange}
                disable={false}
                style="long-input"
              />
              <FormSelect
                name="role"
                value={formData.role}
                placeholder="Is user a super user? No"
                onChange={OnChange}
                style="long-input"
                options={['Teacher', 'Student', 'Administrator']}
              />
            </section>

            <section className="absolute right-3 top-65">
              <Button type="submit" variant="contained" className="uppercase">
                Save
              </Button>
            </section>
          </form>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default EditUserRole;
