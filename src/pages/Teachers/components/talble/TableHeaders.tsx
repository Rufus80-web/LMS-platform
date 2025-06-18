import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import { useTheme } from "../../../../context/ThemeContext";

type TableHeadProps = {
  orderBy: string;
  order: "asc" | "desc";
  handleSort: (property: string) => void;
};

const _TableHeaders = ({ orderBy, order, handleSort }: TableHeadProps) => {
  const { themeMode } = useTheme();
  let color = themeMode === 'light' ? 'black' : 'white'
  return (
    <TableHead>
      <TableRow
        className={`${
          themeMode === "light" ? "bg-indigo-300" : "bg-indigo-600 text-white"
        }`}
      >
        <TableCell>
          <input type="checkbox" className="w-4 h-4 rounded-3xl" />
        </TableCell>
        <TableCell style={{ color: color }}>
          ID
        </TableCell>
        <TableCell style={{ color: color }}>
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={() => handleSort("name")}
          >
            Name
          </TableSortLabel>
        </TableCell>
        {/* <TableCell style={{ color: color }}>
          <TableSortLabel
            active={orderBy === "age"}
            direction={orderBy === "age" ? order : "asc"}
            onClick={() => handleSort("age")}
          >
            martricule
          </TableSortLabel>
        </TableCell> */}
        <TableCell style={{ color: color }}>
          <TableSortLabel
            active={orderBy === "phoneNumber"}
            direction={orderBy === "phoneNumber" ? order : "asc"}
            onClick={() => handleSort("phoneNumber")}
          >
            Phone Number
          </TableSortLabel>
        </TableCell>
        <TableCell style={{ color: color }}>
          <TableSortLabel
            active={orderBy === "email"}
            direction={orderBy === "email" ? order : "asc"}
            onClick={() => handleSort("email")}
          >
            Email
          </TableSortLabel>
        </TableCell>
        <TableCell style={{ color: color }}>
          State
        </TableCell>
        <TableCell style={{ color: color }}>
          Gender
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default _TableHeaders;
