import React, { useEffect, useState } from "react";

import { useTheme } from "../../../context/ThemeContext";
import {
  SidebarContext,
  useTeacherSidebarContext,
} from "../../../context/sidebarContext";
import { AdminSidebar } from "../components/AdminSidebar";
import Navbar from "../../Teachers/components/navbar/Navbar";
import DashHeader from "../../Teachers/components/DashHeader";
import IconButton from "../components/IconButton";
import { Print } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux/configureStrore";
import { usersReducer } from "../../../Redux/Slices/adminSlice";
import { User } from "../../../static/Interface";

type SidebarType = () => void;

const Users: React.FC = () => {
  const { themeMode } = useTheme();
  const { isOpen } = useTeacherSidebarContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebarWidth = (): ReturnType<SidebarType> => {
    setIsOpenSidebar((prev) => !prev);
  };
  const dispatch = useAppDispatch();

  const {
    users: { allUsers },
  } = useAppSelector((state: any) => state.userArray);

  const goto = ({role, id}: {role: string, id: string}): string => {
    let url: string = "";
    if (role === "Teacher") {
      url = `/admin/edit/teacher/${id}`;
    } else if (role === "Student") {
      url = `/admin/edit/student/${id}`;
    }
    return url;
  };

  // Current page of the table
  const [currentPage, setCurrentPage] = useState<number>(1);
  //Number of items to be rendered per page
  const renderPerPage: number = 7;
  // calculating indices for slicing the data array
  const lastIndex: number = currentPage * renderPerPage;
  const firstIndex: number = lastIndex - renderPerPage;
  // Calculate the total number of pages
  const totalPages = Math.ceil(allUsers?.length / renderPerPage);
  // Finally slice the data into blocks partitions
  const slicedData = allUsers && allUsers.slice(firstIndex, lastIndex);

  // Function to move to the next page
  const nextPage = () => {
    setCurrentPage(currentPage === slicedData.length ? 1 : currentPage + 1);
  };

  // Function to move to the previous page
  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  useEffect(() => {
    dispatch(usersReducer());
  }, []);

  // Return UI
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
          <DashHeader title="Users" message="user's details" />

          <hr className="mt-3 border-[#85838336] border-solid border-1" />

          {/* Table displaying only log data  */}
          <div className="w-full h-max mt-3 rounded-lg border-[#85838336]">
            <div className="w-full p-2 h-max flex justify-between ">
              <IconButton icon={<Print />} name="Print" url="" />
            </div>

            <Table component={Paper} className="w-full p-3 mt-4">
              <TableHead style={{ backgroundColor: "#272829" }}>
                <TableRow>
                  <TableCell style={{ color: "whitesmoke" }}>#</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>Name</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>Email</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>Active</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedData.length > 0
                  ? slicedData.map((item: User) => (
                      <TableRow
                        style={{
                          backgroundColor:
                            themeMode === "light" ? "#a19f9f3b" : "#141b2d",
                        }}
                      >
                        <TableCell
                          key={item.id}
                          style={{
                            color: themeMode === "light" ? "#000" : "#f5f5f5",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {item.id.slice(0, 8) + "..."}
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeMode === "light" ? "#000" : "#f5f5f5",
                            fontSize: "14px",
                          }}
                        >
                          <Link
                            to={{pathname: goto({role: item.role[0], id: item.id})}}
                            className="text-sky-600 cursor-pointer underline"
                          >
                            {item.name}
                          </Link>
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeMode === "light" ? "#000" : "#f5f5f5",
                            fontSize: "14px",
                          }}
                        >
                          {item.email}
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeMode === "light" ? "#000" : "#f5f5f5",
                            fontSize: "14px",
                          }}
                        >
                          {item.isActive}
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeMode === "light" ? "#000" : "#f5f5f5",
                            fontSize: "14px",
                          }}
                        >
                          {item.role}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
            <div className="mt-6 border-none flex justify-start gap-3 items-center pb-1">
              <button
                className="w-8 h-8 bg-sky-400 text-white cursor-pointer"
                onClick={prevPage}
              >
                <ChevronLeft />
              </button>
              <span className={`${themeMode === "dark" && "text-slate-50"}`}>
                &nbsp; {currentPage} of {totalPages} &nbsp;
              </span>
              <button
                className="w-8 h-8 bg-green-400 cursor-pointer text-white"
                onClick={nextPage}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Users;
