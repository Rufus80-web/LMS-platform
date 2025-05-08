import {} from "react";

import { Outlet } from "react-router-dom";
import TableContextProdiver from "../context/TableActionContext";

const TeacherLayout = () => {
  return (
    <TableContextProdiver>
      <Outlet />
    </TableContextProdiver>
  );
};

export default TeacherLayout;
