import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCourseApi,
  getAllExamsApi,
  getTeacherEventsApi,
  studentsOfTeachersApi,
} from "../../api/teacher.api";
import { useDispatch } from "react-redux";
import { ExamProps } from "../../static/Interface";
import { Event } from "../../static/types";

type Dispatch = ReturnType<typeof useDispatch>;

type teacherSliceInitProps = {
  course: [];
  studentOfTeacherData: [];
  events: Event[];
  exams: ExamProps[];
};

const initialState: teacherSliceInitProps = {
  course: [],
  studentOfTeacherData: [],
  events: [],
  exams: [],
};

// Reducer function to fetch from server all the courses a teacher teachers/has on the platform
export const fetchTeacherCourseReducer = createAsyncThunk(
  "teacher/courses",
  async (__, thunkApi) => {
    try {
      const id = getUserId();
      const {
        data: { status, message, data },
      } = await fetchCourseApi(id);
      if (status === "error") {
        throw new Error(message);
      } else {
        const { courses } = data;
        thunkApi.dispatch(setCourses(courses));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// reducer function to retrieve from server students created by a teacher
export const getStudentCreatedByTeacherReducer = () => {
  return async function getStudentCreatedByTeacherThunk(dispatch: Dispatch) {
    try {
      const teacherId = getUserObjectId();
      const response = await studentsOfTeachersApi(teacherId);
      const { students, message, status } = response.data;

      if (status === "error") {
        throw new Error(message);
      }

      dispatch(setStudentsOfTeacher(students));
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };
};

// reducer function to get events created by a teacher
export const getEventCreatedByTeacherReducer = createAsyncThunk(
  "get/events",
  async (__, thunkApi) => {
    try {
      const teacherId = getUserObjectId();
      if (teacherId !== null) {
        const response = await getTeacherEventsApi(teacherId);
        const { status, message, events } = response.data;

        if (status === "error") {
          throw new Error(message);
        }
        thunkApi.dispatch(setEvents(events));
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
);

// reducer function to get exams
export const getExamReducer = createAsyncThunk(
  "exams/get",
  async (__, thunkApi) => {
    try {
      const response = await getAllExamsApi();
      const { status, message, exams } = response.data;

      if (status == "error") {
        thunkApi.rejectWithValue(message);
        console.error(message);
      } else {
        thunkApi.dispatch(setExams(exams));
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
);

// Teacher slice
const teacherSlice = createSlice({
  name: "teacher/clice",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.course = action.payload;
    },
    setStudentsOfTeacher: (state, action) => {
      state.studentOfTeacherData = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setExams: (state, action) => {
      state.exams = action.payload;
    },
  },
});

export const { setCourses, setStudentsOfTeacher, setEvents, setExams } =
  teacherSlice.actions;
export default teacherSlice.reducer;

// Retrieves userId from localstorage
export const getUserId = () => {
  const storage = localStorage.getItem("user-data");
  if (storage) {
    const parsedata = JSON.parse(storage)["user"];
    return parsedata["id"];
  } else {
    return false;
  }
};

export const getUserObjectId = () => {
  const storage = localStorage.getItem("user-data");
  if (storage) {
    const parsedata = JSON.parse(storage)["user"];
    return parsedata["_id"];
  } else {
    return false;
  }
};
