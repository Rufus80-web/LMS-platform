import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authReducer from "./Slices/AuthSlice"
import  studentsReducer  from './Slices/adminSlice';
import  fetchTeachersReducer from './Slices/adminSlice';
import teacherReducer from './Slices/adminSlice';
import courseReducer from './Slices/adminSlice';
import announcementReducer from './Slices/adminSlice';
import usersReducer from './Slices/adminSlice';
import logReducer from './Slices/adminSlice';

// Teacher reducers
import fetchTeacherCourseReducer from './Slices/teacherSlice';
import getStudentCreatedByTeacherReducer  from './Slices/teacherSlice';
import getEventCreatedByTeacherReducer from './Slices/teacherSlice';
import getExamReducer  from './Slices/teacherSlice';

// students reducers
import getStudentAttendanceReducer from './Slices/studentSlice';
import getScheduledExamReducer from './Slices/studentSlice';
import getInstructorReducer  from './Slices/studentSlice';
import studentSubmissionReducer from './Slices/studentSlice'


const ReduxStore = configureStore({
   reducer: {
     auth: authReducer,
     teachers: fetchTeachersReducer,
     students: studentsReducer,
     teacherData: teacherReducer,
     courseArray: courseReducer,
     announArray: announcementReducer,
     userArray: usersReducer,
     logs: logReducer,
     course: fetchTeacherCourseReducer,
     _studentsOfTeacher: getStudentCreatedByTeacherReducer,
     events: getEventCreatedByTeacherReducer,
     exams: getExamReducer,
     attendance: getStudentAttendanceReducer,
     studentExamInfo: getScheduledExamReducer,
     instructor: getInstructorReducer,
     studentSubmission: studentSubmissionReducer
   }
})


export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch;

//Typed hooks
export const  useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default ReduxStore;

