import {} from "react";
import { TableRow, TableCell, TableBody } from "@mui/material";
import { Course } from "../../../../static/types";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";

type DataArray = {
  data: Course[];
  url: string;
};

const CourseTableBody = ({ data, url }: DataArray) => {
  const { themeMode } = useTheme();
  return (
    <TableBody>
      {data.length > 0 ?
        data.map((item: Course, i: number) => (
          <TableRow
          key={i}
            style={{
              backgroundColor: themeMode === "light" ? "#a19f9f3b" : "#141b2d",
            }}
          >
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.courseId?.slice(0, 8)}<span title={item.courseId}>...</span>
            </TableCell>
            <TableCell style={{ textDecoration: "underline" }}>
              <Link
                to={{ pathname:`${url}/${item.courseId}` }}
                className="text-sky-600 cursor-pointer"
              >
                {item.courseName}
              </Link>
            </TableCell>
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.courseCode}
            </TableCell>
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.courseInstructor}
            </TableCell>
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.courseHours}
            </TableCell>
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.createdAt}
            </TableCell>
          </TableRow>
        )) : null}
    </TableBody>
  );
};

export default CourseTableBody;
