import { TableBody, TableCell, TableRow } from "@mui/material";
import {} from "react";
import { Link } from "react-router-dom";

type HeaderBodyProps = {
  data: any[];
};

const HeaderBody = ({ data }: HeaderBodyProps) => {
  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{row["examId"]["examTitle"]}</TableCell>
          <TableCell>{row["examId"]["course"]}</TableCell>
          <TableCell>{row["score"]}</TableCell>
          <TableCell>{row["createdAt"]}</TableCell>
          <TableCell>
            <Link to={`/student/exam/details/${row['examId']['_id']}`} className="hover:underline text-blue-400">
              More details
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default HeaderBody;
