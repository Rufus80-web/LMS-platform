import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminSliceInitState } from "../../static/types";
import { User } from '../../static/Interface'
import { getStudents, getUser, getTeachers, getCourses, fetchAnnouncements, getUsers, getLogsRequest } from "../../api/admin.api";

// Slice initial state
const initialState: AdminSliceInitState = {
  users: {
    teachers: [],
    students: [],
    allUsers: [],
    teacherData: {},
    courses: [],
    announcementList: [],
    logs: []
  },
  isLoading: false,
};

// Thunk Async functions
export const studentsReducer = createAsyncThunk(
  "get/students",
  async (_, thunkApi) => {
    try {
      const { data } = await getStudents();
      console.log(data.data);
      const { message, status } = data;
      if (status === "error") {
        throw new Error(message);
      } else {
        thunkApi.dispatch(setStudents(data.data));
      }
    } catch (error: any) {
      thunkApi.rejectWithValue(error.message);
      throw new Error("Error: " + error);
    }
  }
);

export const fetchTeachersReducer = createAsyncThunk(
  "teachers-thunk",
  async (__, thunkApi) => {
    try {
      const { data } = await getTeachers();
      const { message, status } = data;

      if (status === "error") {
        throw new Error("Failed to fetch data: " + message);
      }
      const result = data.data;
      thunkApi.dispatch(setTeachers(result));
    } catch (error: any) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const teacherReducer = createAsyncThunk(
  "get/users",
  async (id: string, thunkApi) => {
    try {
      const {
        data: { user, status, message },
      } = await getUser(id);
      if (status === "error") {
        throw new Error(message);
      } else {
        thunkApi.dispatch(setTeacherData(user));
        // console.log('Data Fetched successfully')
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }
);

export const courseReducer = createAsyncThunk(
  "get/courses",
  async (__, thunkApi) => {
    try {
      const {
        data: { courses, status, message },
      } = await getCourses();
      if (status === "error") {
        throw new Error(message);
      } else {
        thunkApi.dispatch(setCourses(courses));
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }
);

export const announcementReducer = createAsyncThunk(
  "get/announcement",
  async (__, thunkApi) => {
    try {
      const {
        data: { data, status, message },
      } = await fetchAnnouncements();
      if (status === "error") {
        throw new Error(message);
      } else {
        thunkApi.dispatch(setAnnouncementList(data));
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }
);

export const usersReducer = createAsyncThunk(
  "get/courses",
  async (__, thunkApi) => {
    try {
      const {
        data: { data, status, message },
      } = await getUsers();
      if (status === "error") {
        throw new Error(message);
      } else {
        const users: User[] = []
        for(const user of data){
          let userObj: User = {id: '', name: '', email: '', isActive: false, roles: ''}
           userObj.id = user['id']
           userObj.name = user['firstname']
           userObj.email = user['email']
           userObj.isActive = user['isActive']
           userObj.roles = user['roles']

           users.unshift(userObj)
        }
        thunkApi.dispatch(setUsers(users));
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }
);

export const logReducer = createAsyncThunk(
  "get/logs",
  async (__, thunkApi) => {
    try {
      const {
        data: { logs, status, message },
      } = await getLogsRequest();
      if (status === "error") {
        throw new Error(message);
      } else {
        thunkApi.dispatch(setLogs(logs));
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }
);



const AdminSlice = createSlice({
  name: "slice-admin",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.users.students = action.payload;
    },
    setTeachers: (state, action) => {
      state.users.teachers = action.payload;
    },
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    stopLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setTeacherData: (state, { payload }) => {
      state.users.teacherData = payload;
    },
    setCourses: (state, { payload }) => {
      state.users.courses = payload;
    },
    setAnnouncementList: (state, action) => {
     state.users.announcementList = action.payload
    },
    setUsers: (state, action) => {
     state.users.allUsers = action.payload
    },
    setLogs: (state, action) => {
     state.users.logs = action.payload
    },
  },
  extraReducers(_builder) {},
});

export const {
  setStudents,
  setTeachers,
  setLoader,
  stopLoader,
  setTeacherData,
  setCourses,
  setAnnouncementList,
  setUsers,
  setLogs
} = AdminSlice.actions;
export default AdminSlice.reducer;
