import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import isLoggedIn from "./Slices/AuthSlice"
import  studentsReducer  from './Slices/adminSlice';
import  fetchTeachersReducer from './Slices/adminSlice';
import teacherReducer from './Slices/adminSlice';
import courseReducer from './Slices/adminSlice';
import announcementReducer from './Slices/adminSlice';
import usersReducer from './Slices/adminSlice';
import logReducer from './Slices/adminSlice';


const ReduxStore = configureStore({
   reducer: {
     loginMiddleware: isLoggedIn,
     teachers: fetchTeachersReducer,
     students: studentsReducer,
     teacherData: teacherReducer,
     courseArray: courseReducer,
     announArray: announcementReducer,
     userArray: usersReducer,
     logs: logReducer
   }
})


export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch;

//Typed hooks
export const  useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default ReduxStore;