import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import ArrowNav from "./components/table/ArrowNav";
import TableHeading from "./components/table/TableHeading";
import TableHeader from "./components/table/TableHeader";
import TableRow from "./components/table/TableRow";
import TableBody from "./components/table/TableBody";

type tableRowType = {
  td1: string;
  td2: string;
  td3: string;
  td4: string;
};

const TableRows: tableRowType[] = [
  {
    td1: "11:45",
    td2: "37-674",
    td3: "UML",
    td4: "Lecture",
  },
  {
    td1: "13:08",
    td2: "25-716",
    td3: "Data Science",
    td4: "Tutorial",
  },
  {
    td1: "08:00",
    td2: "17-456",
    td3: "J2EE Programming",
    td4: "Lecture",
  },
];

const TimeTable: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-[#f6f6f9]">
      {/* sidebar section  */}
      <Sidebar />

      {/* Deside the sidebar  */}
      <div className="w-[82vw] min-h-screen absolute right-0 flex flex-col">
        {/* Navbar section  */}
        <Navbar />

        {/* Time's table content  */}
        <div className="absolute bottom-0 w-[82vw] h-full flex flex-col justify-center items-center gap-3 pt-20 pl-2">
          <div className="flex items-center justify-center gap-40">
            <ArrowNav name="backward" icon="fas fa-arrow-left" />
            <TableHeading header="Today's Timetable" />
            <ArrowNav name="foward" icon="fas fa-arrow-right" />
          </div>

          {/* timetable  */}
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-[55vw] table-auto">
              <TableHeader th1="Time" th2="Room No." th3="Course" />
              {/* On fetch API will return an array and we will change the prop value  */}
              <TableBody
                data={TableRows}
                render={(data, index) => <TableRow item={data} key={index} />}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
