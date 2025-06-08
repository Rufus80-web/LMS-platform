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
      {data.length > 0
        ? data.map((item: CustomTableBodyProps, i: number) => (
            <TableRow
              key={i}
              style={{
                backgroundColor:
                  themeMode === "light" ? "transparent" : "#141b2d",
              }}
            >
              <TableCell
                style={{
                  color: themeMode === "light" ? "#00000083" : "#adabab78",
                }}
              >
                {item.id?.slice(0, 8)}
                <span title={item.id}>...</span>
              </TableCell>
              <TableCell style={{ textDecoration: "underline" }}>
                <Link
                  to={{ pathname: `${url}/${item.id}` }}
                  className="text-sky-600 cursor-pointer"
                >
                  {item.firstname}
                </Link>
              </TableCell>
              <TableCell
                style={{
                  color: themeMode === "light" ? "#00000083" : "#adabab78",
                }}
              >
                {item.email}
              </TableCell>
              <TableCell
                style={{
                  color: themeMode === "light" ? "#00000083" : "#adabab78",
                }}
              >
                {item.address}
              </TableCell>
              <TableCell
                style={{
                  color: themeMode === "light" ? "#00000083" : "#adabab78",
                }}
              >
                {item.createdAt}
              </TableCell>
            </TableRow>
          ))
        : null}
    </BodyTable>
  );
};

export default TableBody;
