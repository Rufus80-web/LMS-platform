import { Lock, LockOpen } from "@mui/icons-material";
import React from "react";

type DataProps = {
  data: any[];
};

const EventTabble: React.FC<DataProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto p-4 w-full">
      <table className="w-full bg-white border-2 border-gray-800 shadow-lg rounded-lg overflow-hidden"></table>
      <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <tr>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Title
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Course
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Date
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Time
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Instructor
          </th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((item, i) => (
              <tr key={i} className={`${ i % 2 === 0 ? 'bg-gray-50': 'bg-white'}`}>
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">{item.course}</td>
                <td className="py-3 px-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {item.createdAt.split("T")[1].slice(0, -8)}
                </td>
                <td className="py-3 px-4">
                  {item?.teacherId?.firstname + " " + item?.teacherId?.lastname}
                </td>
                <td
                  className={`py-3 px-4 ${
                    item?.examId?.isLocked === 1
                      ? "text-red-800"
                      : "text-green-800"
                  }`}
                >
                  {item?.examId?.isLocked ? <Lock /> : <LockOpen />}
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </div>
  );
};

export default EventTabble;
