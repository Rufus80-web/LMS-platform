import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg } from "@fullcalendar/core";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  fetchTeacherCourseReducer,
  getEventCreatedByTeacherReducer,
  getExamReducer,
  getUserId,
  getUserObjectId,
} from "../../../Redux/Slices/teacherSlice";
import { createEventApi, globalApi } from "../../../api/teacher.api";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../Redux/configureStrore";


const CalendarPlanner: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [title, setTitle] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [examDateTime, setExamDateTime] = useState("");
  const [course, setCourse] = useState("  ");
  const [examId, setExamId] = useState("  ");

  const [rooms, setRooms] = useState([]);
  const dispatch = useAppDispatch();

  // courses from redix store
  const { course: courses } = useAppSelector((state) => state.course);
  // exams from redux store
  const { exams } = useAppSelector((state) => state.exams);
  // get exams info scheduled by teacher
  const { events:ScheduledEvents } = useAppSelector((state) => state.events)


  // get the current Date
  const now = new Date().toISOString().slice(0, 16);

  // Clear form fields
  const clearDialogInput = (): void => {
    setTitle("");
    setDescription("");
    setExamDateTime("");
    setRoom("");
    setCourse("");
  };

  // close Dialog containet
  const closeDialogContainer = () => {
    setOpen(false);
    clearDialogInput();
  };

  // Set Event Container Dialog
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo);
    clearDialogInput();
    setOpen(true);
  };

  /*Remobe planned event if confirmed
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`Delete event '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }; */

  // Add new event on the calendar
  // const AddCreatedEventOnCalendar = () => {
  //   if (selectedDate) {
  //     const calendarApi = selectedDate.view.calendar;
  //     calendarApi.unselect();
  //     calendarApi.addEvent({
  //       id: String(new Date().getTime()),
  //       title,
  //       start: selectedDate.startStr,
  //       end: selectedDate.endStr,
  //       allDay: selectedDate.allDay,
  //     });
  //     // setOpen(false);
  //   }
  // };

  // Add new event on the calendar and store in the database
  const handleEventScheduling = async () => {
    try {
      // get teacherId from localstrorage
      const teacherId = getUserObjectId();

      // set request headers
      const request_headers = {
        "Content-Type": "application/json",
        charset: "utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      // Prepare request body
      const request_body = {
        method: "POST",
        headers: request_headers,
        body: JSON.stringify({
          title: title,
          description: description,
          examDateTime: examDateTime,
          room: room,
          course: course,
          examId: examId,
        }),
      };

      // send request to server
      const response = await createEventApi(teacherId, request_body);
      const data = await response.json();

      // Inter-preat the server-response
      if (data.status === "error") {
        toast.error(data.message);
        return;
      } else {
        toast.success(data.message, { duration: 5000 });
        // AddCreatedEventOnCalendar();
        closeDialogContainer();
        // setOpen(false);
        console.log("Event created successfully");
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error.mesage);
    }
  };

  // Get teacher's courses
  useEffect(() => {
    dispatch(fetchTeacherCourseReducer());
  }, []);

  // Get students class rooms
  useEffect(() => {
    const fetchClassRooms = async () => {
      globalApi
        .get("/rooms")
        .then((rooms) => {
          let myRooms = rooms.data;
          if (!myRooms) {
            console.log("No Rooms found");
          }
          myRooms = myRooms.data.map((room: any) => room.class_name);
          setRooms(myRooms);
        })
        .catch((err: any) => console.log(err));
    };

    fetchClassRooms();
  }, []);

  // get exams created by this*teacher
  useEffect(() => {
    dispatch(getExamReducer());
  }, []);

  // get exams scheduled by teacher
  useEffect(() => {
    dispatch(getEventCreatedByTeacherReducer())
    
  }, [])

  const MapEventOnCalendar = () => {
    const events = []
    
    for(const event of ScheduledEvents){
      const obj = {title: '', start: '', end: '', allDays: ''}
      obj.title = event.title
      obj.start =  event.datetime?.split('T')[0] as string
      events.push(obj)
    }

    return events ? events : []
  }


  /*********************************************************************UI UI UI UI UI UI UI UI UI UI************************************* */

  // Return Exam Planner component UI
  return (
    <Box sx={{ p: 2 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={MapEventOnCalendar()}
        select={handleDateSelect}
        // eventClick={handleEventClick}
        height="auto"
      />
      <Dialog
        open={open}
        onClose={() => {
          clearDialogInput();
          setOpen(false);
        }}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        slotProps={{
          paper: {
            sx: {
              maxHeight: "90vh",
            },
          },
        }}
      >
        <DialogTitle>Schedule an Exam</DialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={5}>
              <Grid>
                <TextField
                  label="Exam title"
                  name="title"
                  type="text"
                  value={title}
                  style={{ width: "18vw" }}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid>
                <FormControl fullWidth>
                  <InputLabel>Select a class</InputLabel>
                  <Select
                    name="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    label="Class Room"
                    style={{ width: "18vw" }}
                  >
                    {rooms.map((room, k) => (
                      <MenuItem value={room} key={k}>
                        {room}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl fullWidth>
                  <InputLabel>Available Courses</InputLabel>
                  <Select
                    name="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    label="Course"
                    style={{ width: "18vw" }}
                  >
                    {courses.map((course, j) => (
                      <MenuItem value={course} key={j}>
                        {course}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <TextField
                  label="Description"
                  name="description"
                  type="text"
                  style={{ width: "18vw" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid>
                <TextField
                  label="Exam Date and Time"
                  name="examDateTime"
                  value={examDateTime}
                  type="datetime-local"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { min: now },
                  }}
                  onChange={(e) =>
                    setExamDateTime(
                      selectedDate?.startStr +
                        "T" +
                        e.target.value.split("T")[1]
                    )
                  }
                  style={{ width: "18vw" }}
                />
              </Grid>
              <Grid>
                <FormControl fullWidth>
                  <InputLabel>Select an Exam</InputLabel>
                  <Select
                    name="examId"
                    value={examId}
                    onChange={(e) => {
                      const { value } = e.target;
                      setExamId(value);
                    }}
                    label="Exam"
                    style={{ width: "18vw" }}
                  >
                    {exams.map((exam, index) => (
                      <MenuItem value={exam._id} key={index}>
                        {exam.examTitle}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <DialogActions>
                <Button
                  variant="contained"
                  type="button"
                  onClick={handleEventScheduling}
                >
                  Shedule Exam
                </Button>
              </DialogActions>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default CalendarPlanner;

// selectedDate?.startStr + "T" + e.target.value.split("T")[1]
/**
 *
 */
