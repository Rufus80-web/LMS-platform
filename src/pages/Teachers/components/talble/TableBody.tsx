import { TableBody, TableRow, TableCell, Button } from "@mui/material";
import { TableBodyProps } from "../../../../static/types";

const _TableBody = ({ tableRows, page, rowPerPage }: TableBodyProps) => {
  let firstIndex: number = page * rowPerPage;
  let lastIndex: number = page * rowPerPage + rowPerPage;
  const sortedRows = tableRows?.slice(firstIndex, lastIndex);
  return (
    <TableBody>
      {sortedRows?.map((row, index) => (
        <TableRow key={index}>
          <TableCell>
            <input type="checkbox" className="w-4 h-4 rounded-3xl" />
          </TableCell>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.age}</TableCell>
          <TableCell>{row.phoneNumber}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>
            <Button variant="contained" style={{backgroundColor: 'teal'}}>admim</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default _TableBody;
