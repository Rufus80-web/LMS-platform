import { TableBody, TableRow, TableCell, Button } from "@mui/material";
import { TableBodyProps } from "../../../../static/types";
import { useTheme } from "../../../../context/ThemeContext";

const _TableBody = ({ tableRows, page, rowPerPage }: TableBodyProps) => {
  let firstIndex: number = page * rowPerPage;
  let lastIndex: number = page * rowPerPage + rowPerPage;
  const sortedRows = tableRows?.slice(firstIndex, lastIndex);
  const {themeMode} = useTheme()
  let color = themeMode === 'light' ? 'black' : 'white'
  return (
    <TableBody>
      {sortedRows?.map((row, index) => (
        <TableRow key={index} className={`${themeMode === 'light' ? 'bg-[#f2f0f0] ' : 'bg-sidebar-dark'}`}>
          <TableCell>
            <input type="checkbox" className="w-4 h-4 rounded-3xl" />
          </TableCell>
          <TableCell style={{color: color}}>{row.id}</TableCell>
          <TableCell style={{color: themeMode === 'light' ? 'black' : 'teal'}}>{row.name}</TableCell>
          <TableCell style={{color: color}}>{row.age}</TableCell>
          <TableCell style={{color: color}}>{row.phoneNumber}</TableCell>
          <TableCell style={{color: color}}>{row.email}</TableCell>
          <TableCell>
            <Button variant="contained" style={{backgroundColor: 'teal'}}>admim</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default _TableBody;
