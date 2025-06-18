import { FC } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

type HeaderListProps = {
  headers: string[];
};

const HeaderTable: FC<HeaderListProps> = ({ headers }) => {
  return (
    <TableHead>
      <TableRow style={{ backgroundColor: "dodgerblue" }}>
        {headers.map((head, i) => (
          <TableCell
            style={{
              color: "whitesmoke",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            key={i}
          >
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderTable;
