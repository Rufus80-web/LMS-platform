import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import TableHeading from "./components/table/TableHeading";
import TableHeader from "./components/table/TableHeader";
import TableRow from "./components/table/TableRow";
import TableBody from "./components/table/TableBody";
import { tableRowType } from "../../static/types";
import { Table } from '@mui/material'
import { useTheme } from "../../context/ThemeContext";


const TableRows: tableRowType[] = [
  {
    td1: "13 May 2022",
    td2: "09-12 AM",
    td3: "CS200",
    td4: "38-786",
  },
  {
    td1: "22 October 2020",
    td2: "07-10 AM",
    td3: "Data Science",
    td4: "32-564",
  },
  {
    td1: "25 September 2025",
    td2: "14-16 PM",
    td3: "Flutter",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
  {
    td1: "28 September 2025",
    td2: "08-12 AM",
    td3: "CCNA 2",
    td4: "45-546",
  },
];

const Exam: React.FC = () => {
  const { themeMode } = useTheme()
  return (
    <div className={`w-screen min-h-screen ${themeMode === 'light' ? 'bg-[#f6f6f9]' : 'bg-sidebar-dark'}`}>
      {/* sidebar section  */}
      <Sidebar />

      {/* Deside the sidebar  */}
      <div className="w-[82vw] min-h-screen absolute right-0 flex flex-col">
        {/* Navbar section  */}
        <Navbar />

        {/* Time's table content  */}
        <div className="absolute bottom-0 w-[82vw] h-full flex flex-col justify-center items-center gap-3 pt-20 pl-2">
          <div className="flex items-center justify-center gap-40">
            <TableHeading header="Exam Available" />
          </div>

          {/* Exam  */}
          <div className="overflow-x-auto rounded-2xl w-[68vw] overflow-y-scroll h-[60vh]">
            <Table className="w-full table-auto">
              <TableHeader th1="Date" th2="Time" th3="Course" th4="Room No." />
              {/* On fetch API will return an array and we will change the prop value  */}
              <TableBody
                data={TableRows}
                render={(data, index) => <TableRow item={data} key={index} />}
              />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
