import {} from "react";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import { Event } from "../../../static/types";
import { Link } from "react-router-dom";

import { useTheme } from "../../../context/ThemeContext";

type TableBodyData = {
  events: Event[];
  url: string
};

// const isEventDate = (eventDate: string, eventTime: string, id: string): boolean => {
//   const currentDate = new Date().toISOString().split('T')[0]
//   const currentTime = new Date().toISOString().split('T')[1].slice(0, 5).split(':').map((item) => parseInt(item))

//   let timeEvent = eventTime.split(':').map((item) => parseInt(item))


//   const isEventDate: boolean = currentDate === eventDate
//   const isEventTime: boolean = currentTime[0] === timeEvent[0] 
//   console.log(isEventDate, isEventTime)
//   // const hasPassEventDate: boolean = 
//   if(isEventDate && isEventTime){
//     return true
//   }
//   return false
// }

const EventTableBody = ({ events, url }: TableBodyData) => {
  const { themeMode } = useTheme();
  return (
    <TableBody>
      {events.map((item, i) => (
        <TableRow
          key={i}
          style={{
            backgroundColor: themeMode === "light" ? "transparent" : "#141b2d",
          }}
        >
          <TableCell
            style={{
              color: themeMode === "light" ? "#00000083" : "#adabab78",
            }}
          >
            <Link to={{pathname: `${url}/${item._id}`}} className="text-[11px] text-blue-500 underline">
              {item.title}
            </Link>
          </TableCell>
          <TableCell
            style={{
              color: themeMode === "light" ? "#00000083" : "#adabab78",
            }}
          >
            {item.datetime?.split("T")[1]}
          </TableCell>
          <TableCell
            style={{
              color: themeMode === "light" ? "#00000083" : "#adabab78",
            }}
          >
            {item.datetime?.split("T")[0]}
          </TableCell>
          <TableCell
            style={{
              color: themeMode === "light" ? "#00000083" : "#adabab78",
            }}
          >
            {item.examId.durationMinutes}
          </TableCell>
          <TableCell
            style={{
              color: themeMode === "light" ? "#00000083" : "#adabab78",
            }}
          >
            {item.room}
          </TableCell>
          <TableCell
            style={{
              color: themeMode === "light" ? "#00000083" : "#adabab78",
            }}
          >
            {item.hasPassed? (
              <Button style={{ backgroundColor: "green" }} variant="contained">
                Today
              </Button>
            ) : (
              <Button variant="contained">Upcomming</Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default EventTableBody;
