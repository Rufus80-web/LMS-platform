import {} from "react";
import { TableRow, TableCell, TableBody as BodyTable } from "@mui/material";
import { CustomTableBodyProps } from "../../../../static/types";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";

type DataArray = {
  data: CustomTableBodyProps[];
  url: string;
};

const TableBody = ({ data, url }: DataArray) => {
  const { themeMode } = useTheme();
  return (
    <BodyTable>
      {data &&
        data.map((item: CustomTableBodyProps) => (
          <TableRow
            style={{
              backgroundColor: themeMode === "light" ? "#a19f9f3b" : "#141b2d",
            }}
          >
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.id}
            </TableCell>
            <TableCell style={{ textDecoration: "underline" }}>
              <Link
                to={{ pathname: url }}
                className="text-sky-600 cursor-pointer"
              >
                {item.name}
              </Link>
            </TableCell>
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.email}
            </TableCell>
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.address}
            </TableCell>
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.course[0]}
            </TableCell>
            <TableCell
              style={{ color: themeMode === "light" ? "#000" : "#f5f5f5" }}
            >
              {item.date}
            </TableCell>
          </TableRow>
        ))}
    </BodyTable>
  );
};

export default TableBody;
