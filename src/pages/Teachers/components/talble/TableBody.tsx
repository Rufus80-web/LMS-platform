import { TableBody, TableRow, TableCell } from "@mui/material";
import { TableBodyProps } from "../../../../static/types";
import { useTheme } from "../../../../context/ThemeContext";
import { Link } from "react-router-dom";
import { Lock, LockOpen } from "@mui/icons-material";

const _TableBody = ({ tableRows, page, rowPerPage }: TableBodyProps) => {
  let firstIndex: number = page * rowPerPage;
  let lastIndex: number = page * rowPerPage + rowPerPage;
  const sortedRows = tableRows?.slice(firstIndex, lastIndex);
  const { themeMode } = useTheme();
  let color = themeMode === "light" ? "black" : "white";
  return (
    <TableBody>
      {sortedRows?.map((row, index) => (
        <TableRow
          key={index}
          className={`${
            themeMode === "light" ? "bg-[#f2f0f0] " : "bg-sidebar-dark"
          }`}
        >
          <TableCell>
            <input type="checkbox" className="w-4 h-4 rounded-3xl" />
          </TableCell>
          <TableCell style={{ color: color }}>{++index}</TableCell>
          <TableCell
            style={{ color: themeMode === "light" ? "black" : "teal" }}
          >
            <Link
              to={`/teacher/display-student/${row.userId._id}`}
              className="text-dark-bg underline hover:text-teal-500"
              title={`See more details for ${row.userId["firstname"]}`}
            >
              {row.userId.firstname} {row.userId.lastname}
            </Link>
          </TableCell>
          <TableCell style={{ color: color }} title={row.matricule}>{row.matricule?.slice(0, 10)}</TableCell>
          <TableCell style={{ color: color }}>{row.userId.contact}</TableCell>
          <TableCell style={{ color: color }}>
            <Link
              to={""}
              className="text-blue-600 hover:underline"
              title={`Send mail to ${row.userId["firstname"]}`}
            >
              {row.email}
            </Link>
          </TableCell>
          <TableCell style={{ color: color }}>
            {row.isBlock === 0 ? <Lock /> : <LockOpen />}
          </TableCell>
          <TableCell style={{ color: color }}>{row.userId.gender}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default _TableBody;
