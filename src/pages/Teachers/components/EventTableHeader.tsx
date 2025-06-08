import {} from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const EventTableHeader = () => {
  return (
    <TableHead style={{backgroundColor:'#272829'}}>
      <TableRow>
        <TableCell style={{color:'white'}}>Title</TableCell>
        <TableCell style={{color:'white'}}>Exam Start Time</TableCell>
        <TableCell style={{color:'white'}}>Exam Date</TableCell>
        <TableCell style={{color:'white'}}>Duration</TableCell>
        <TableCell style={{color:'white'}}>Room</TableCell>
        <TableCell style={{color:'white'}}>Status</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EventTableHeader;
