import { JSX } from "react";
import { TableRow as TRow, TableCell } from "@mui/material";
import { useTheme } from "../../../../context/ThemeContext";

type TableRowProps<T> = {
  item: T;
};


const TableRow = <T extends {td1: string; td2: string; td3: string, td4: string}>({ item }: TableRowProps<T>): JSX.Element => {
  const { themeMode } = useTheme()
  return (
    <TRow className={` ${themeMode === 'light' ? 'bg-white' : 'bg-slate-100'}`}>
       <TableCell className="px-4 py-3 text-gray-700 text-[12px] text-left ">{item.td1}</TableCell>
       <TableCell className="px-4 py-3 text-gray-700 text-[12px] text-left ">{item.td2}</TableCell>
       <TableCell className="px-4 py-3 text-gray-700 text-[12px] text-left ">{item.td3}</TableCell>
       <TableCell className="px-4 py-3 text-gray-700 text-[12px] text-left ">{item.td4}</TableCell>
    </TRow>
  );
};

export default TableRow;
