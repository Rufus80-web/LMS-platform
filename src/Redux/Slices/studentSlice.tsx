import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { examScheduleInfoApi, studentAttendaceApi, studentInstructorApi } from "../../api/student.api";
import { getUserObjectId } from "./teacherSlice";
import { UseDispatch } from "react-redux";

type initStateProps = {
  attendances: string[];
  examInfo: any[],
  instructors: {firstname: string, lastname: string, profile: string}[]
};

type ReduxDispatch = ReturnType<UseDispatch>

const initialState: initStateProps = {
  attendances: [],
  examInfo: [],
  instructors: []
};

export const getStudentAttendanceReducer = createAsyncThunk(
  "attendance/get",
  async (__, thunkApi) => {
    try {
      const userId: string | null = getUserObjectId();
      const req = await studentAttendaceApi(userId as string);
      const { data, status, message } = req.data

      if(status === 'OK'){
        thunkApi.dispatch(setAttendance(data))
      } else {
        console.error(message)
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
);

// Reducer function to retrieve all the sheduled exams of students of the same class
export const getScheduledExamReducer = () => {
  return async function scheduledExamThunk(dispatch: ReduxDispatch, _getState: any) {
    try {
      const uid: string | null | undefined = getUserObjectId() as string
      const response = await examScheduleInfoApi(uid)
      const { sheduledExams, status, message } = response.data  

      if(status === 'error') throw new Error(message)
      
      dispatch(setScheduledexams(sheduledExams))
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e)
    }
  }
}

// reducer function to get all the instructors of a student
export const getInstructorReducer = createAsyncThunk('instructors/get', async (__, thunkApi) => {
  try {
    const studId = getUserObjectId()
     const response = await studentInstructorApi(studId as string)
     const result = response.data

     if(result.status === 'error'){
      thunkApi.rejectWithValue(result.message)
     }

     thunkApi.dispatch(setInstructors(result.data))
  } catch (e: any) {
    console.error(e.message)
  }
})

const studentSlice = createSlice({
  name: "student/slice",
  initialState,
  reducers: {
    setAttendance: (state, action) => {
      state.attendances = action.payload;
    },
    setScheduledexams: (state, action) => {
      state.examInfo = action.payload;
    },
    setInstructors: (state, action) => {
      state.instructors = action.payload;
    },
  },
});

export const { setAttendance, setScheduledexams, setInstructors } = studentSlice.actions;
export default studentSlice.reducer;

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
