import { ReactNode } from "react";
import { TableRow, TableCell, TableBody as BodyTable } from "@mui/material";
import { Announcement } from "../../../../static/Interface";
import { Link } from "react-router-dom";

type AnnouncementTable = {
  data: Announcement[];
  url: string;
};

const AnnouncementTableBody = ({ data, url }: AnnouncementTable) => {
  return (
    <BodyTable>
      {data &&
        data.map((item: Announcement) => {
          let createdAt: string = item.sendOn as string;
          const format = new Date(createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          let id: string = item.announId as string
          return (
            <TableRow>
              <TableCell>{id.slice(0, 10) + "..."}</TableCell>
              <TableCell style={{ textDecoration: "underline" }}>
                <Link
                  to={{ pathname: url + `/${item.announId}` }}
                  className="text-sky-600 cursor-pointer"
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell title={item.content}>
                {item.content.slice(0, 40) + "..."}
              </TableCell>
              <TableCell>{item.receivers}</TableCell>
              <TableCell>{item.sender}</TableCell>
              <TableCell>{format}</TableCell>
            </TableRow>
          );
        })}
    </BodyTable>
  );
};

export default AnnouncementTableBody;
