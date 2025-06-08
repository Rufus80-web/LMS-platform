import axios from "axios";
import { GradedExercise } from "../static/Interface";

const baseURL = 'http://localhost:8000/api/teacher'
const globalURL = 'http://localhost:8000/api/all'
const examURL = 'http://localhost:8000/api/exam'
const api = axios.create({
    baseURL: baseURL,
    headers: {'Authorization': `Bearer ${localStorage.getItem('token') || ''}`}
})
export const globalApi = axios.create({
    baseURL: globalURL,
    headers: {'Authorization': `Bearer ${localStorage.getItem('token') || ''}`}
})


export const fetchCourseApi = (id: string) => api.get(`${baseURL}/courses/${id}`)
export const registerStudentApi = (req: RequestInit, id: string) => fetch(`${baseURL}/register-student/${id}`, req)
export const getStudentApi = (role: string) => globalApi.get(`${globalURL}/users/${role}`) // get all students
export const studentsOfTeachersApi = (idTeacher: string) => api.get(`${baseURL}/students/${idTeacher}`)
export const createEventApi = (idTeacher: string, request_body: RequestInit) => fetch(`${baseURL}/create-event/${idTeacher}`, request_body)
export const getTeacherEventsApi = (idTeacher: string) => api.get(`${baseURL}/get-events/${idTeacher}`)
export const getEventApi = (idTeacher: string, eventId: string) => api.get(`${baseURL}/event/${idTeacher}/${eventId}`)
export const updateEventApi = (idTeacher: string, eventId: string, request_body: Object) => api.put(`${baseURL}/event/${idTeacher}/${eventId}`, request_body)
export const deleteEventApi = (idTeacher: string, eventId: string) => api.delete(`${baseURL}/event/${idTeacher}/${eventId}`)
export const __getStudentApi = (idTeacher: string, matricule: string) => api.get(`${baseURL}/student/${idTeacher}/${matricule}`) // get a single student
export const updateStudentApi = (idTeacher: string, matricule: string, request_body: Object) => api.put(`${baseURL}/student/${idTeacher}/${matricule}`, request_body)
export const deleteStudentApi = (idTeacher: string, matricule: string) => api.delete(`${baseURL}/student/${idTeacher}/${matricule}`)
export const UpdateTeacherProfileApi = (idTeacher: string, formData: RequestInit) => fetch(`${baseURL}/update-profile/${idTeacher}`, formData)
export const getTeacherDataApi = (id: string) => globalApi.get(`${globalURL}/user/${id}`)
export const uploadExamApi = (requestBody: RequestInit) => fetch(`${examURL}/upload`, requestBody)
export const getAllExamsApi = () => globalApi.get(`${examURL}/teacher-exams`)
export const getExamsApi = (examId: string) => globalApi.get(`${examURL}/${examId}`)
export const updateExamsApi = (examId: string, data: GradedExercise) => globalApi.put(`${examURL}/${examId}`, {examData: data})
export const deleteExamsApi = (examId: string) => globalApi.delete(`${examURL}/${examId}`)
